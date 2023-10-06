from .base import *  # noqa

# DATABASES
# ------------------------------------------------------------------------------
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'ATOMIC_REQUESTS': True,
        'CONN_MAX_AGE':  config("DJANGO_DATABASE_CONN_MAX_AGE", cast=int, default=60),
        'NAME': config("POSTGRES_DB", default=''),
        'USER': config("POSTGRES_USER", default=''),
        'PASSWORD': config("POSTGRES_PASSWORD", default=''),
        'HOST': config("POSTGRES_HOST", default=''),
        'PORT': config("POSTGRES_PORT", default='')
    }
}

CACHES = {
    'default': {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": "redis://redis:6379/0",
    },
}