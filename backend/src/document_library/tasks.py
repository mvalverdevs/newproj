import datetime
import os

from celery import Celery, shared_task
from celery.utils.log import get_task_logger
from django.core.files.storage import FileSystemStorage
from django.utils import timezone
from main.celery import app
from utils.common import whoami
from utils.tasks import ResilientTask

logger = get_task_logger(__name__)


@shared_task(bind=True, base=ResilientTask)
def delete_dangling_document_files(self):
    """
    Deletes unused uploaded documents files (those standing in the directory with more than 30 minutes)
    :param self: Celery task
    :return:
    """
    from document_library.models import DOCUMENTS_BASEDIR

    directory = DOCUMENTS_BASEDIR

    if not os.path.exists(directory):
        logger.error(f"Directory '{directory}' does not exist.")
        return

    if not os.path.isdir(directory):
        logger.critical(f"Path '{directory}' is not a directory!")
        return

    storage = FileSystemStorage()
    _, files = storage.listdir(directory)
    for file in files:
        filepath = directory + '/' + file
        creation_datetime = storage.get_created_time(filepath)
        if timezone.now() - creation_datetime > datetime.timedelta(minutes=30):
            logger.info(f"deleting dangling file {filepath} created on {creation_datetime}")
            storage.delete(filepath)
