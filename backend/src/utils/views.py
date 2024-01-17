from django.contrib.auth.mixins import PermissionRequiredMixin
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import mixins, viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.permissions import DjangoModelPermissions


class ModelViewSet(
    viewsets.GenericViewSet,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    mixins.DestroyModelMixin,
    PermissionRequiredMixin
):
    authentication_classes = (TokenAuthentication, )
    permission_classes = (DjangoModelPermissions, )
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    # filterset_class = ClassName
    # search_fields = (field, )
    # ordering = (field, )
