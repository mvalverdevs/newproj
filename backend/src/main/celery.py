import os
import re

from celery import Celery
from celery.schedules import crontab
from django.conf import settings

# Set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'main.settings.local')

app = Celery('main')

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django apps.
app.autodiscover_tasks()

app.conf.task_routes = ([
    # Specific task routing
    ('my.module.tasks.my_task', {'queue': 'non_concurrent'}),

    # Glob pattern for all tasks in some module routing
    ('other.module.tasks.*', {'queue': 'non_concurrent'}),

    # Regex based routing
    (re.compile(r'.*mail.*'),   {'queue': 'non_concurrent'}),
],)

@app.on_after_configure.connect
def setup_periodic_tasks(sender, **kwargs):

    # Calls test('hello') every 10 seconds.
    sender.add_periodic_task(60.0, debug_task, name='celerybeat debug task')
    sender.add_periodic_task(60.0, debug_mail_task, name='celerybeat mail task')

@app.task(bind=True)
def debug_task(self):
    print(f'Request debug_task: {self.request!r}')

@app.task(bind=True)
def debug_mail_task(self):
    print(f'Request mail_task: {self.request!r}')
