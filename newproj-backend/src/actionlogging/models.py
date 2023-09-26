import json

from actionlogging.cache_helper import ActionLoggingCacheHelper
from django.conf import settings
from django.db import models
from django.utils import timezone
from rest_framework.generics import GenericAPIView
from utils.common import whoami


def get_client_ip(request):
    x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
    if x_forwarded_for:
        ip = x_forwarded_for.split(",")[0].strip()
    else:
        ip = request.META.get("REMOTE_ADDR")
    return ip


# HTTP Methods
HTTP_METHODS = (
    ("GET", "GET"),
    ("HEAD", "HEAD"),
    ("POST", "POST"),
    ("PUT", "PUT"),
    ("DELETE", "DELETE"),
)


class LoggedModelView(GenericAPIView):
    log_id = None
    save_log = True

    def perform_create(self, serializer):
        serializer.save()
        self.__class__.log_id = serializer.instance.id

    def get_object(self):
        instance = super().get_object()

        self.__class__.log_id = instance.id

        return instance

    def get_caller(self):
        class_name = self.__class__.__name__
        method_name = whoami()
        return f"{class_name}.{method_name}"


class LoggedAction(models.Model):
    class Meta:
        ordering = ["-creation_datetime", "system"]
        verbose_name = "Action log"
        verbose_name_plural = "Actions log"
        permissions = (
            ("view_all", "View registered actions"),
            ("view_all_staff", "View action registered by staff"),
        )
        indexes = [
            models.Index(fields=["creation_datetime", "system", "subsystem", "action"]),
        ]

    # Date and time indicating when the action occurred
    creation_datetime = models.DateTimeField(
        verbose_name=u"Creation datetime",
        help_text=u"Creation datetime of the operation.",
    )

    # System that has acted
    system = models.CharField(
        null=True,
        default=None,
        max_length=64,
        verbose_name=u"System",
        help_text=u"System on which the operation depends.",
    )

    # Subsystem that has acted
    subsystem = models.CharField(
        null=True,
        default=None,
        max_length=64,
        verbose_name=u"Subsystem",
        help_text=u"Subsystem on which the operation depends.",
    )

    # Identification of the affected object
    log_id = models.CharField(
        null=True,
        default=None,
        max_length=64,
        verbose_name=u"Identification",
        help_text=u"Identification of the affected object",
    )

    # Short description of the action
    action = models.CharField(
        null=True,
        default=None,
        max_length=256,
        verbose_name=u"Action",
        help_text=u"Action.",
    )

    # Long description of the action
    description = models.CharField(
        verbose_name=u"Description",
        help_text=u"Description of the action executed.",
        max_length=1024,
    )

    # URL to which the request was made
    url = models.TextField(
        verbose_name=u"Url address",
        help_text=u"URL called for the execution of the action.",
    )

    # GET parameters of the request
    http_get_parameters = models.TextField(
        null=True,
        default=None,
        verbose_name=u"GET Parameters",
        help_text=u"GET parameters received by the server.",
    )

    # POST parameters of the request
    http_post_parameters = models.TextField(
        null=True,
        default=None,
        verbose_name=u"POST Parameters",
        help_text=u"POST parameters received by the server.",
    )

    # HTTP method of the request
    http_method = models.CharField(
        max_length=32,
        default=u"get",
        choices=HTTP_METHODS,
        verbose_name=u"HTTP method",
        help_text=u"HTTP method.",
    )

    # Customer User Agent
    http_user_agent = models.CharField(
        verbose_name=u"Client user agent",
        max_length=1024,
        help_text=u"User agent that sends the browser to the server.",
    )

    # Client's IP address
    ip = models.GenericIPAddressField(
        verbose_name=u"IP adress",
        help_text=u"IP address of the client that executes this action.",
        null=True
    )

    # Executor user
    executor_user = models.IntegerField(
        null=True,
        verbose_name="User who has made the operation",
        help_text="User who has made the operation."
    )

    # Extra data
    extra = models.TextField(
        null=True, default=None, verbose_name=u"Extra data", help_text=u"Extra data"
    )

    # Indicates if the user who performs the action is "staff" of the website
    is_staff = models.BooleanField(
        default=False,
        verbose_name="Action taken by personnel of the application",
        help_text="Action taken by personnel of the application",
    )

    # Request Response
    response = models.TextField(
        null=True,
        default=None,
        verbose_name=u"Response of the action",
        help_text=u"Response of the action",
    )

    # Status code
    status_code = models.CharField(
        max_length=32,
        verbose_name=u"HTTP response status",
        help_text=u"HTTP response status",
        null=True,
        default=None,
    )

    ####################################################################
    # Creates a LoggedAction object from a request and other parameters.
    @staticmethod
    def create_from_request(
        request,
        description,
        system=None,
        subsystem=None,
        action=None,
        extra=None,
        executor_user=None,
        hide_params=None,
        hide_text=None,
        response=None,
        log_id=log_id
    ):

        """
        Creates an action log from request and other data
        :param response: Raw response.
        :param hide_text: To hide some field information for example passwords or usernames.
        :param executor_user: User.
        :param log_id: Instance id.
        :param request: call request
        :param description: description of the call
        :param system: system or package you invoked
        :param subsystem: subsystem invoked
        :param action: accion POS GET,UPDATE, etc
        :param extra: {} extra arguments to store
        :param hide_params: [], List of parameters to hide their contents, for example,
                                ["password","password1","password2"]
        """
        from actionlogging.utils import field_replace

        if hasattr(request, "user"):
            if not executor_user and request.user and request.user.is_authenticated:
                executor_user = request.user

        # If you don't pass text to replace it take the one from the settings
        if not hide_text:
            ACTIONLOGGING_TEXT_HIDE_REQUEST = settings.ACTIONLOGGING_TEXT_HIDE_REQUEST

        # Post Parameters
        if len(request.POST.dict()) != 0:
            postdata = json.dumps(request.POST.dict())
        else:
            try:
                postdata = request.body.decode("utf-8")
            except UnicodeDecodeError:
                # If request.body is an image that cannot be decoded into utf-8
                # Solution: transform to hexadecimal string
                # The reverse process is bytes.fromhex(hexadecimal_string)
                postdata = request.body.hex()

        if postdata:
            # We hide the necessary fields
            # Hides the parameters indicated in the settings
            postdata = field_replace(
                postdata, settings.ACTIONLOGGING_FIELDS_HIDE_REQUEST, hide_text
            )

            # Hides hide_params
            if hide_params is not None:
                postdata = field_replace(
                    postdata, hide_params, ACTIONLOGGING_TEXT_HIDE_REQUEST
                )

            # Hide the hide params from the extra
            if extra is not None:
                extra = field_replace(
                    extra, hide_params, ACTIONLOGGING_TEXT_HIDE_REQUEST
                )

        try:
            response_data = json.loads(response.content.decode("utf-8"))
            response_data = json.dumps(response_data)
        except Exception:
            response_data = str(response)

        # Parameters for building an action log.
        base_url = request.get_full_path().replace("/api/", "")

        new_item_actionlogging = {
            "creation_datetime": str(timezone.now()),
            "system": system,
            "subsystem": subsystem,
            "action": str(action),
            "description": description,
            "url": base_url,
            "http_get_parameters": json.dumps(request.GET.dict()),
            "http_post_parameters": postdata,
            "http_method": request.method,
            "http_user_agent": request.META.get("HTTP_USER_AGENT") or "",
            "ip": get_client_ip(request),
            "executor_user": executor_user.id if executor_user else None,
            "extra": extra,
            # "is_staff": executor_user.is_staff if executor_user else False,
            "response": '',  # response_data,
            "log_id": log_id,
            "status_code": str(response.status_code) if response is not None else None
        }
        action_logging_cache = ActionLoggingCacheHelper()
        action_logging_cache.add_item(new_item_actionlogging)
        return new_item_actionlogging

    ####################################################################
    # Creates a LoggedAction object from a set of parameters

    # @staticmethod
    # def create_without_request(
    #     description,
    #     system=None,
    #     subsystem=None,
    #     action=None,
    #     extra=None,
    #     log_id=None
    # ):
    #     """
    #     Creates an action log from a set of parameters.
    #     :param description:
    #     :param system:
    #     :param subsystem:
    #     :param action:
    #     :param extra:
    #     :return:
    #     """
    #     # Parameters for building an action log
    #     new_item_actionlogging = {
    #         "creation_datetime": str(timezone.now()),
    #         "system": system,
    #         "subsystem": subsystem,
    #         "action": action,
    #         "description": description,
    #         "extra": extra,
    #         "ip": "127.0.0.1",
    #         "log_id": log_id,
    #         "status_code": 200
    #     }
    #
    #     action_logging_cache = ActionLoggingCacheHelper()
    #     action_logging_cache.add_item(new_item_actionlogging)
    #     return new_item_actionlogging
