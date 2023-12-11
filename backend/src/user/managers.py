
from django.core.validators import validate_email
from django.contrib.auth.models import BaseUserManager
from rest_framework.exceptions import ValidationError
from user import models as user_models
from user import constants as user_constants

class UserManager(BaseUserManager):
    """ User management class """

    def create_user(self, email, **extra_fields):
        """ User creation with the given username, email and password """
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
        user.roles.add(user_models.UserRoles.objects.get(role=user_constants.ROLE_SUPERADMIN_KEY))
        return user
