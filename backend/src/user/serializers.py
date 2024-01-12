import re

from django.contrib.auth.hashers import make_password
from django.contrib.auth.password_validation import validate_password
from django.middleware import csrf
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers
from user import models as user_models
from utils.serializers import DynamicModelSerializer

from drf_spectacular.utils import extend_schema_field


class UserSerializer(DynamicModelSerializer):
    has_login_blocked = serializers.BooleanField()

    class Meta:
        model = user_models.User
        fields = (
            'id',
            'username',
            'email',
            'first_name',
            'last_name',
            'role',
            'phone',
            'is_active',
            'deactivation_datetime',
            'login_attempts',
            'last_bad_login_attempt_datetime',
            'has_login_blocked',
        )
        read_only_fields = (
            'id',
            'username',
            'date_joined',
            'deactivation_datetime',
            'login_attempts', # TODO: Administrator only can update login attempts
            'last_bad_login_attempt_datetime',
            'has_login_blocked',
        )

class UserCreationSerializer(serializers.ModelSerializer):
    class Meta:
        model = user_models.User
        fields = '__all__'
        read_only_fields = (
            'username',
            'date_joined',
            'groups',
            'user_permissions',
            'last_login',
            'is_superuser',
            'deactivation_datetime',
            'login_attempts',
            'last_bad_login_attempt_datetime',
        )


class UserLoginSerializer(serializers.ModelSerializer):
    csrftoken = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = user_models.User
        fields = (
            'username',
            'password',
            'csrftoken'
        )

    @extend_schema_field(field=serializers.IntegerField)
    def get_csrftoken(self, data):
        request = self.context["request"]
        csrftoken = csrf.get_token(request)
        return csrftoken


class EmailSerializer(serializers.Serializer):
    """
    Validate the contact email
    """
    email = serializers.EmailField()


class ResetPasswordSerializer(serializers.Serializer):
    """
    Validate the contact email
    """
    token = serializers.CharField()
    new_password1 = serializers.CharField()
    new_password2 = serializers.CharField()

    class Meta(object):
        model = user_models.User
        fields = ('token', 'new_password1', 'new_password2')
        read_only_fields = ('new_password1', 'new_password2')

    def validate(self, data):
        """
        Validate if both passwords match
        """
        password = data.get('new_password1')
        password2 = data.get('new_password2')

        if password and password2:
            validate_password(password)
            if password != password2:
                raise serializers.ValidationError("Passwords do not match")
            else:
                data['password'] = make_password(password)
        return data


class PermissionSerializer(serializers.Serializer):
    """
	Serialize pydrfpermissions
	"""
    url = serializers.CharField()
    action = serializers.CharField()

