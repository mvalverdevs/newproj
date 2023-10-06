# Common imports for views.py files
from django.contrib.auth.mixins import PermissionRequiredMixin
from django_filters.rest_framework import DjangoFilterBackend
from drf_yasg.utils import swagger_auto_schema
from rest_framework import mixins, status, viewsets
from rest_framework.authentication import (SessionAuthentication,
                                           TokenAuthentication)
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.permissions import (AllowAny, DjangoModelPermissions,
                                        IsAuthenticated)
from rest_framework.response import Response
