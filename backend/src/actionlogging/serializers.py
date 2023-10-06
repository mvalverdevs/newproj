"""
Serializador para el log de acciones
"""
from rest_framework.fields import (CharField, DateTimeField,
                                   SerializerMethodField)
from rest_framework.serializers import Serializer
from utils.serializers import DynamicModelSerializer

from .models import LoggedAction


class LoggedActionSerializer(DynamicModelSerializer):
    """
    Serializador para el log de acciones
    """

    class Meta(object):
        model = LoggedAction
        fields = [
            "id",
            "creation_datetime",
            "system",
            "subsystem",
            "log_id",
            "action",
            "description",
            "url",
            "http_get_parameters",
            "http_post_parameters",
            "http_method",
            "http_user_agent",
            "ip",
            "executor_user",
            "extra",
            "is_staff",
            "response",
            "status_code"
        ]
