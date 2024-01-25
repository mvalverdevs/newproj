from django.contrib.auth.mixins import PermissionRequiredMixin
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import mixins, viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.permissions import DjangoModelPermissions

from drf_spectacular.utils import OpenApiParameter, extend_schema
from drf_spectacular.types import OpenApiTypes

@extend_schema(
    parameters=[
        OpenApiParameter(
            name='expand',
            description='List of nested objects',
            type=OpenApiTypes.STR,
            location=OpenApiParameter.QUERY,
        )
    ]
)
class ModelViewSet(
    viewsets.GenericViewSet,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    mixins.DestroyModelMixin,
    # PermissionRequiredMixin
):
    authentication_classes = (TokenAuthentication, )
    # permission_classes = (DjangoModelPermissions, )
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    # filterset_class = ClassName
    # search_fields = (field, )
    # ordering = (field, )
