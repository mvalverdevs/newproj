import datetime
import json
import logging

from django.conf import settings
from django_redis import get_redis_connection

logger = logging.getLogger(__name__)

# Use raw redis access for RPUSH / LRANGE / LTRIM methods (not available on Django cache framework)
redis_connection = get_redis_connection("default")
actionlogging_key_cache = settings.ACTIONLOGGING_KEY_CACHE + "_redislist"

class ActionLoggingCacheHelper:
    def __init__(self):
        # Connection handler
        self.con = redis_connection

        # Actionlogging key cache
        self.key = actionlogging_key_cache

    def add_item(self, item):
        """
        Adds an item to actionlogging redis queue
        :param item: item to be added
        :return: None
        """
        item = json.dumps(item)
        if self.con:
            self.con.rpush(self.key, item)

    def persist_items_to_db(self):
        """
        Writes to database all items from redis queue and then removes those items from redis queue
        :return: int  item count
        """
        from actionlogging.models import LoggedAction
        logger.info(f"actionlogging start db saving")

        # Fetch at most settings.ACTIONLOGGING_FLUSH_CHUNK_SIZE actionlogging items from redis
        items = self.con.lrange(self.key, 0, settings.ACTIONLOGGING_FLUSH_CHUNK_SIZE - 1)
        item_count = len(items)

        # Clear fetched item slice from list
        self.con.ltrim(self.key, item_count, -1)

        logger.info(f"{item_count} actionlogging items fetched and deleted from redis")

        for item in items:
            item = json.loads(item)
            # in case of Entity get, we group by month, log_id, dependency_group
            logs = None
            now = datetime.datetime.today()
            month = datetime.date(now.year, now.month, 1)
            if item["system"] in ('Entity', 'PlaceEntity', 'EventEntity') and item["log_id"] is not None\
                    and item["action"] == 'GET':
                logs = LoggedAction.objects.filter(
                    system=item["system"],
                    log_id=item["log_id"],
                    action='GET',
                    # dependency_group=item["dependency_group"] if "dependency_group" in item else None,
                    creation_datetime__gt=month
                )
            if item["system"] in ('Entity', 'PlaceEntity', 'EventEntity') \
                and "search_expanded_classification" in item and item["search_expanded_classification"] is not None:

                logs = LoggedAction.objects.filter(
                    system=item["system"],
                    search_expanded_classifications=item["search_expanded_classification"],
                    action='GET',
                    # dependency_group=item["dependency_group"] if "dependency_group" in item else None,
                    creation_datetime__gt=month
                )
            if logs and logs.exists():
                obj = logs.first()
                obj.counter += 1
                obj.save()
            else:
                LoggedAction.objects.create(**item)

        # Clear fetched item slice from list
        logger.info(f"{item_count} actionlogging items saved to database")

        return item_count
