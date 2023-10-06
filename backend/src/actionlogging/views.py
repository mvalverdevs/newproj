import logging

from actionlogging.models import LoggedAction
from actionlogging.serializers import LoggedActionSerializer
from django.conf import settings
from django.utils.translation import gettext as _
from django_filters.rest_framework import DjangoFilterBackend
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

# Get an instance of a logger
logger = logging.getLogger(__name__)


class LoggedActionView(ListModelMixin, RetrieveModelMixin, GenericViewSet):
    """
     Actionlogging query services.
    """

    filter_backends = [SearchFilter, DjangoFilterBackend]
    queryset = LoggedAction.objects.all()
    serializer_class = LoggedActionSerializer
    ordering = ("-creation_datetime",)
    filter_fields = ('url', 'ip', 'status_code', 'executor_user', 'system', 'log_id', 'action')
    search_fields = (
        "description",
        "http_get_parameters",
        "http_post_parameters",
        "system",
        "ip"
    )

    # Only used to generate the Swagger documentation
    # this list has to have the same params than es_filter_fields
    from_created_param = openapi.Parameter(
        "from_creation_datetime",
        openapi.IN_QUERY,
        description="From created.",
        type=openapi.TYPE_STRING,
    )
    to_created_param = openapi.Parameter(
        "to_creation_datetime",
        openapi.IN_QUERY,
        description="To created.",
        type=openapi.TYPE_STRING,
    )

    url_parameter = openapi.Parameter(
        "url",
        openapi.IN_QUERY,
        description="url on wich the action is performed",
        type=openapi.TYPE_STRING,
    )
    ip_parameter = openapi.Parameter(
        "ip",
        openapi.IN_QUERY,
        description="ip that makes the request",
        type=openapi.TYPE_STRING,
    )
    status_code_parameter = openapi.Parameter(
        "status_code",
        openapi.IN_QUERY,
        description="response code",
        type=openapi.TYPE_STRING,
    )
    user_parameter = openapi.Parameter(
        "executor_user",
        openapi.IN_QUERY,
        description="user who performs the action",
        type=openapi.TYPE_STRING,
    )
    system_parameter = openapi.Parameter(
        "system",
        openapi.IN_QUERY,
        description="system to which the service belongs",
        type=openapi.TYPE_STRING,
    )
    action_parameter = openapi.Parameter(
        "action",
        openapi.IN_QUERY,
        description="action",
        type=openapi.TYPE_STRING,
    )
    log_id_parameter = openapi.Parameter(
        "log_id",
        openapi.IN_QUERY,
        description="registry identifier",
        type=openapi.TYPE_STRING,
    )

    @swagger_auto_schema(
        manual_parameters=[
            from_created_param,
            to_created_param,
            url_parameter,
            ip_parameter,
            status_code_parameter,
            user_parameter,
            action_parameter,
            system_parameter,
            log_id_parameter
        ],
    )
    def list(self, request, *args, **kwargs):
        """
        Method to list actions. The result is paginated
        """
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: LoggedActionSerializer,
            status.HTTP_404_NOT_FOUND: _("Not found"),
        },
    )
    def retrieve(self, request, *args, **kwargs):
        self.serializer_class = LoggedActionSerializer
        return super(LoggedActionView, self).retrieve(request, *args, **kwargs)

