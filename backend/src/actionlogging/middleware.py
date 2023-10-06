from django.conf import settings
from django.utils.deprecation import MiddlewareMixin

from .models import LoggedAction


class ActionLoggingMiddleware(MiddlewareMixin):
    """
    Django Middleware with the purpose of register and tracking the user action.
    """

    last_view = None

    def process_request(self, request):

        request.request_data = request.body
        request.log = []

    def process_view(self, request, callback, callback_args, callback_kwargs):
        # Load the last view

        self.last_view = callback
        return None

    def process_response(self, request, response):
        this_url = request.build_absolute_uri()

        description = ""
        for log in request.log:
            description += log + " "

        try:
            cls = self.last_view.cls

            # Subsystem name
            system = cls.system_log if hasattr(cls, "system_log") else cls.__name__

            # Checking the view have the save_log attribute setting True and ACTIONLOGGING_SAVE_LOG.
            save_log = (
                cls.save_log
                if hasattr(cls, "save_log")
                else settings.ACTIONLOGGING_SAVE_LOG
            )

            # Get the log id (main object using in the view).
            log_id = cls.log_id if hasattr(cls, "log_id") else None
            cls.log_id = None

        except Exception as e:
            system = request.path
            cls = None
            save_log = None
            log_id = None
            description = str(e)

        # List of objects url action whose answer will be ignored
        if hasattr(self.last_view, "save_log") or save_log or cls is None:
            response_obj = response
            LoggedAction.create_from_request(
                request=request,
                system=system,
                subsystem=None,
                action=request.method,
                description=description,
                response=response_obj,
                log_id=log_id
            )

        return response


def exists_url(url, action):
    import re

    """
    Function that searches within an array of objects action,url and checks for matches
    :param array:
    :param url:
    :return:
    """
    array = settings.ACTIONLOGGING_ENABLE_URL
    try:
        for obj in array:
            if bool(re.findall(obj["url"], str(url))) and action in obj["actions"]:
                return True
        return False
    except Exception:
        return False
