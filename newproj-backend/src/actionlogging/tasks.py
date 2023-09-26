from celery import shared_task
from celery.utils.log import get_task_logger

from utils.tasks import ResilientTaskNotOnCommit

logger = get_task_logger(__name__)


@shared_task(bind=True, base=ResilientTaskNotOnCommit)
def db_persist_actionlogging_items(self):
    """
    :param self: Celery task
    :return:
    """
    from actionlogging.cache_helper import ActionLoggingCacheHelper
    # Barrier that prevents the method from being executed if it is disabled in configuration.
    action_logging_cache = ActionLoggingCacheHelper()
    action_logging_cache.persist_items_to_db()
