import datetime
from typing import Any
import uuid

from django.conf import settings
from django.contrib.auth.models import (AbstractBaseUser, PermissionsMixin)
from django.contrib.auth.validators import UnicodeUsernameValidator

from django.db import models
from django.utils import timezone
from model_utils.models import TimeStampedModel
from user.choices import USER_ROLES
from user.services import UserService
from user.constants import ROLE_USER_KEY
from user.managers import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    """ User model """
    def __init__(self, *args: Any, **kwargs: Any) -> None:
        service = UserService(self)
        super().__init__(*args, **kwargs)

    username = models.CharField(
        verbose_name=u'Username',
        unique=True,
        max_length=150,
        validators=[UnicodeUsernameValidator()],
    )

    email = models.EmailField(
        verbose_name=u'User email',
        unique=True
    )

    first_name = models.CharField(
        verbose_name=u'User first name',
        max_length=30,
        null=True
    )

    last_name = models.CharField(
        verbose_name=u'User last name',
        max_length=150,
        null=True
    )

    role = models.CharField(
        verbose_name=u'User role',
        choices=USER_ROLES,
        default=ROLE_USER_KEY
    )

    phone = models.CharField(
        verbose_name=u'User phone number',
        max_length=16,
        null=True
    )

    is_active = models.BooleanField(
        verbose_name=u'Is user active',
        default=True,
        null=True
    )

    deactivation_datetime = models.DateTimeField(
        verbose_name=u'Datetime when user was deactivated',
        null=True
    )

    date_joined = models.DateTimeField(
        verbose_name=u'User date joined',
        default=timezone.now
    )

    login_attempts = models.PositiveIntegerField(
        verbose_name=u'User login attemps',
        default=0
    )

    last_bad_login_attempt_datetime = models.DateTimeField(
        verbose_name=u'Last bad login attempt datetime',
        null=True
    )

    objects = UserManager()
    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'

    @property
    def has_login_blocked(self):
        return self.login_attempts >= settings.MAX_LOGIN_ATTEMPTS


class UserResetPassword(TimeStampedModel):
    """
    User model for account activation or password recovery
    """
    token = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    used = models.BooleanField(default=False, verbose_name="This token has been used")
    user = models.OneToOneField("User", verbose_name="The user who owns the token", on_delete=models.CASCADE)

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
