from datetime import datetime, timedelta

from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = 'Help text'

    def add_arguments(self, parser):
        parser.add_argument('-e', '--example', type=str, help='example command')

    def handle(self, *args, **kwargs):
        if kwargs['new'] is not None:
            print('Using example command...')
        print('Run command successfully')
