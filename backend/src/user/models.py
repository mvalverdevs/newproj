import datetime
import json
import uuid

from django.conf import settings
from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager,
                                        Group, PermissionsMixin)
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.core.validators import validate_email
from django.db import models
from django.db.models.signals import m2m_changed
from django.dispatch import receiver
from django.utils import timezone
from model_utils.models import TimeStampedModel
from rest_framework.exceptions import ValidationError
from user import choices
from user import constants as user_constants

DEFAULT_EMAIL_DOMAIN = 'aspb.cat'


class UserRoles(models.Model):
    """ User Roles model """
    role = models.CharField(max_length=32, choices=choices.USER_ROLES, unique=True)


class UserManager(BaseUserManager):
    """ User management class """

    def create_user(self, email, **extra_fields):
        """ User creation with the given username, email and password """
        # Pop m2m fields to add them after user will be created
        roles = None
        if 'roles' in extra_fields and extra_fields['roles'] is not None and len(extra_fields['roles']) > 0:
            roles = extra_fields.pop('roles')
        else:
            raise ValidationError({'roles': ['At least one role is required']})

        if 'username' not in extra_fields:
            extra_fields['username'] = email

        email = self.normalize_email(email)
        try:
            validate_email(email)
        except:
            raise ValidationError({'email': ['Enter valid email address']})

        user = self.model(
            email=email,
            **extra_fields
        )

        if 'password' in extra_fields:
            user.set_password(extra_fields['password'])

        user.save(using=self._db)

        # Add roles to user (m2m fields)
        if roles is not None:
            for role in roles:
                user.roles.add(role)

        return user

    def create_superuser(self, username, password):
        """ Super admin user creation (Only using with manage.py createsuperuser) """
        if '@' not in username and '.' not in username:
            email = f'{username}@example.com'
        else:
            email = username

        user = self.model(
            email=email,
            username=username,
            password=password,
            company_name='superadmin'
        )
        user.set_password(password)
        user.is_superadmin = True
        user.save(using=self._db)
        user.roles.add(UserRoles.objects.get(role=user_constants.ROLE_SUPERADMIN_KEY))
        return user


class User(AbstractBaseUser, PermissionsMixin):
    """ User model """
    username = models.CharField(max_length=150,
                                unique=True,
                                validators=[UnicodeUsernameValidator()],
                                blank=True)
    password = models.CharField(max_length=128, null=True)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30, null=True)
    last_name = models.CharField(max_length=150, null=True)
    # Is there a signal that executes after 'roles' m2m changed. (check_user_groups)
    roles = models.ManyToManyField(UserRoles)
    phone = models.CharField(max_length=16, null=True)
    is_active = models.BooleanField(default=True, null=True)
    date_joined = models.DateTimeField(default=timezone.now)
    login_attempts = models.PositiveIntegerField(default=0)
    last_bad_login_attempt_datetime = models.DateTimeField(null=True)
    deactivation_datetime = models.DateTimeField(null=True)

    objects = UserManager()
    USERNAME_FIELD = "username"
    EMAIL_FIELD = "email"

    def save(self, *args, **kwargs):
        if self.id is not None:
            # Updating
            previous_user = User.objects.get(id=self.id)
            self.username = self.email

            if previous_user.is_active != self.is_active:
                # Deactivating user and updating deactivation_datetime
                if previous_user.is_active and not self.is_active:
                    self.deactivation_datetime = timezone.now()

                # Activating user and removing deactivation_datetime
                elif not previous_user.is_active and self.is_active:
                    self.deactivation_datetime = None
        else:
            # Creating
            if User.objects.filter(email=self.email).exists():
                raise ValidationError(
                    {'email': ['This email is already in use']}
                )

        return super().save(*args, **kwargs)

    @property
    def has_login_blocked(self):
        return self.login_attempts >= settings.MAX_LOGIN_ATTEMPTS


class UserResetPassword(TimeStampedModel):
    """
    User model for account activation or password recovery
    """
    token = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    used = models.BooleanField(default=False, verbose_name=("This token has been used"))
    user = models.OneToOneField("User", verbose_name=("The user who owns the token"), on_delete=models.CASCADE)

    def __unicode__(self):
        return "{0}".format(self.token)

    def is_valid(self):
        """
        Check if a token of reset session is valid
        """
        if self.used:
            self.delete()
            return False
        
        now = timezone.make_aware(datetime.datetime.today(), timezone.get_current_timezone())
        creation = self.created
        if creation is not None and (now - creation).days * 24 > settings.DURATION_RESET_TOKEN:
            UserResetPassword.objects.filter(token=self.token).delete()
            return False
        return True

    def send_reset_password_email(self):

        # context = {
        #     "reset_password_url": "http://localhost:4200/auth/reset-password/{}".format(str(self.token)), # ToDo - Change to production url
        # }

        # context = json.dumps(context)

        # send_email_celery.delay(
        #     to_emails=[self.user.email],
        #     subject=("[ASPB] - Assistència al restabliment de la contrasenya {0}").format(self.user.email),
        #     template='reset_password.html',
        #     from_email=settings.DEFAULT_FROM_EMAIL,
        #     context=context,
        #     smtp_config_name="default")

        # Temporal solution - Content of the email is displayed on terminal
        from django.core.mail import send_mail

        send_mail(
            subject="[ASPB] - Assistència al restabliment de la contrasenya",
            message="""Siga les instruccions per poder restablir la seva contrasenya:
            http://localhost:4200/auth/reset-password/{}
            """.format(str(self.token)),
            from_email="contact@aspb.com",
            recipient_list=[self.user.email],
            fail_silently=False,
        )


@receiver(m2m_changed, sender=User.roles.through)
def check_user_groups(sender, instance, action, model, **kwargs):
    """ Set a group per rol (permissions management) """
    if action in ['post_add', 'post_remove']:
        if instance.roles is not None:
            # Add new groups
            for role in instance.roles.all():
                try:
                    instance.groups.get(name=role.role)
                except:
                    group = Group.objects.get(name=role.role)
                    instance.groups.add(group)

            # Remove unnecesary groups
            for group in instance.groups.all():
                try:
                    instance.roles.get(role=group.name)
                except:
                    instance.groups.remove(group)
