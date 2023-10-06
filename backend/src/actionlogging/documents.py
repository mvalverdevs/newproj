import datetime

from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry

from .models import LoggedAction

from django.conf import settings


@registry.register_document
class LoggedActionDocument(Document):
    ip = fields.TextField()

    def prepare_ip(self, instance):
        return str(instance.ip)

    class Index:
        name = settings.ES_ACTIONLOGGIN_INDEX
        settings = {
            "number_of_shards": 3,
        }

    class Django:
        model = LoggedAction  # The model associated with this Document

        # The fields of the model you want to be indexed in Elasticsearch
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
            "executor_user",
            "extra",
            "is_staff",
            "status_code"
        ]
