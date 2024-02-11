import user.models as user_models
import user.serializers as user_serializers
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.hashers import make_password
from django.utils import timezone
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.schemas import SchemaGenerator
from drf_spectacular.utils import extend_schema
from utils.views import ModelViewSet
from rest_framework.permissions import AllowAny, IsAuthenticated, DjangoModelPermissions
from rest_framework import status
from rest_framework.response import Response
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.exceptions import APIException
from utils.serializers import EmptySerializer

class UserView(ModelViewSet):
    queryset = user_models.User.objects.all()
    serializer_class = user_serializers.UserSerializer

    def get_permissions(self):
        no_permission_views = (
            'create',
            'login',
            'logout',
            'reset_password',
            'change_password',
            'reset_confirm_password',
            'check_email',
            'check_username'
        )
        if self.action in no_permission_views:
            return (AllowAny(), )
        elif self.action in ['permissions']:
            return (IsAuthenticated(), )
        else:
            return (DjangoModelPermissions(), )

    @extend_schema(
        request=EmptySerializer,
        responses={200: user_serializers.UserSerializer}
    )
    @action(detail=False, methods=['post'])
    def logout(self, request, *args, **kwargs):
        logout(request=request)
        return Response(status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def current(self, request, *args, **kwargs):
        return Response(self.serializer_class(request.user).data)

    @extend_schema(
        request=user_serializers.CheckEmailSerializer,
        responses={200: user_serializers.CheckUserResponse}
    )
    @action(detail=False, methods=['post'])
    def check_email(self, request, *args, **kwargs):
        email = request.data.get('email', None)
        serializer = user_serializers.CheckUserResponse(data={
            'exists': self.queryset.filter(email=email).exists()
        })
        serializer.is_valid(raise_exception=True)
        return Response(status=status.HTTP_200_OK, data=serializer.data)

    @extend_schema(
        request=user_serializers.CheckUsernameSerializer,
        responses={200: user_serializers.CheckUserResponse}
    )
    @action(detail=False, methods=['post'])
    def check_username(self, request, *args, **kwargs):
        username = request.data.get('username', None)
        if username is not None:
            serializer = user_serializers.CheckUserResponse(data={
                'exists': self.queryset.filter(username=username).exists()
            })
            serializer.is_valid(raise_exception=True)
            return Response(status=status.HTTP_200_OK, data=serializer.data)

    @extend_schema(
        request=user_serializers.UserLoginSerializer,
        responses={200: user_serializers.UserLoginSerializer}
    )
    @action(detail=False, methods=['post'])
    def login(self, request, *args, **kwargs):
        """ User login view """
        email = request.data.get('email', None)
        password = request.data.get('password', None)

        user = authenticate(email=email, password=password)

        if user is None:
            # Invalid login
            saved_user = user_models.User.objects.filter(email=email).first()
            if saved_user is not None:

                if saved_user.has_login_blocked or not saved_user.is_active:
                    return Response(status=status.HTTP_400_BAD_REQUEST, data=["Login Blocked. Please contact the administrator for assistance"])

                # User exists +1 login attempt
                saved_user.login_attempts = saved_user.login_attempts + 1
                saved_user.last_bad_login_attempt_datetime = timezone.now()
                saved_user.save()

            return Response(status=status.HTTP_400_BAD_REQUEST, data=["Invalid credentials"])
        else:
            if user.has_login_blocked or not user.is_active:
                return Response(status=status.HTTP_400_BAD_REQUEST, data=["Login Blocked. Please contact the administrator for assistance"])

            # Restore login attempts when login correctly
            if user.login_attempts >= 1:
                user.login_attempts = 0
                user.save()

        return Response(status=status.HTTP_200_OK, data=user_serializers.UserLoginSerializer(instance=user).data)

    @extend_schema(
        request=user_serializers.EmailSerializer,
    )
    @action(detail=False, methods=['post'])
    def reset_password(self, request):
        """
        Reset password
        """

        # Validate email exists
        email = request.data.get('email', None)
        if not user_models.User.objects.filter(email=email).exists():
            return Response(status=status.HTTP_200_OK)
    
        # Extract the user
        user = user_models.User.objects.filter(email=request.data.get('email')).first()

        # Generate a new token for the password reset
        try:
            user_reset = user_models.UserResetPassword.objects.get(user=user, used=False)
            valid = user_reset.is_valid()
        except user_models.UserResetPassword.DoesNotExist:
            # Delete existing tokens
            user_models.UserResetPassword.objects.filter(user=user).delete()
            # Create a new one
            user_reset = user_models.UserResetPassword(user=user)
            user_reset.save()
            valid = user_reset.is_valid()

        # En caso de haberle enviado un token y que haya caducado se lo indicamos al usuario
        if not valid:
            return Response(status=status.HTTP_400_BAD_REQUEST,
                            data={"non_field_errors": [
                                "An email has already been sent to your email or it may have expired re-establish the password again"]})

        user_reset.send_reset_password_email()

        return Response(status=status.HTTP_200_OK)

    @extend_schema(
        request=user_serializers.ResetPasswordSerializer,
        responses={200: user_serializers.UserSerializer}
    )
    @action(detail=False, methods=['post'])
    def reset_confirm_password(self, request, *args, **kwargs):
        """
        Reset confirm password
        """

        # Generate the new password
        serializer = user_serializers.ResetPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        token = request.data.get("token")
        obj = None

        if token:
            try:
                obj = user_models.UserResetPassword.objects.get(token=str(token))
                valid = obj.is_valid()
            except:
                valid = False

            if valid:
                serializer = user_serializers.ResetPasswordSerializer(data=request.data)

                if serializer.is_valid(raise_exception=True):
                    password = serializer.data["new_password1"]

                    # Change password
                    obj.user.password = make_password(password)
                    obj.user.save()

                    # Login user
                    user = obj.user
                    token, created = Token.objects.get_or_create(user=user)
                    serializer = user_serializers.UserSerializer(user)
                    data = serializer.data
                    data['token'] = token.key

                    # Delete reset token
                    obj.delete()
                    return Response(status=status.HTTP_200_OK, data=data)

            else:
                raise ValidationError(
                    {'non_field_errors': ("Token invalid or already used, re-establish the password again.")})
        else:
            raise ValidationError(
                {'non_field_errors': ("Token invalid or already used, re-establish the password again.")})

    @extend_schema(responses={status.HTTP_200_OK: user_serializers.PermissionSerializer})
    @action(detail=False, methods=['get'])
    def permissions(self, request, *args, **kwargs):
        from django.core.cache import cache
        empty = '-'  # Not "None"

        #for role in request.user.roles.all():
            # cache_key = "pydrfpermissions:" + role.role
            # obj = cache.get(cache_key)
            # If exists in cache return else create in cache
            # if obj == empty:
            #    return None  # or raise DoesNotExist
            #if obj:
            #    return Response(obj)
        generator = SchemaGenerator()
        schema = generator.get_schema(request=request)

        permissions = []
        self.extract_permissions(schema.data, permissions)
            #cache.add(cache_key, permissions)
        return Response(permissions)

    def extract_permissions(self, schema, permissions_list):
        for key in schema:
            if hasattr(schema[key], 'url'):
                permissions_list.append({
                    "url": (schema[key].url).replace("{id}", ":"),
                    "action": schema[key].action
                })

            else:
                self.extract_permissions(schema[key], permissions_list)

        return user_serializers.PermissionSerializer(permissions_list, many=True).data
