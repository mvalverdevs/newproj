from decouple import config

from .base import *  # noqa

# GENERAL
# ------------------------------------------------------------------------------

# https://docs.djangoproject.com/en/dev/ref/settings/#allowed-hosts
ALLOWED_HOSTS = ['*']

# Testing config..
TEST_RUNNER = "django.test.runner.DiscoverRunner"

# Emailing config.
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
