from decouple import config

from .base import *  # noqa

# GENERAL
# ------------------------------------------------------------------------------

# https://docs.djangoproject.com/en/dev/ref/settings/#allowed-hosts
ALLOWED_HOSTS = [
    "localhost",
    "0.0.0.0",
    "127.0.0.1"
]

# Testing config..
TEST_RUNNER = "django.test.runner.DiscoverRunner"

# Emailing config.
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
