import os
from django.utils.translation import gettext as _
from rest_framework import serializers


class SizeValidator(object):

    def __init__(self, max_size=25600):
        self.max_size = 1024 * max_size

    def __call__(self, value):
        if value.size > self.max_size:
            raise serializers.ValidationError(
                _('Size too large, the file have {} and only is allowed {}'.format(
                    self.human_readable_size(value.size), self.human_readable_size(self.max_size))
                  )
            )

    @staticmethod
    def human_readable_size(num, suffix='B'):
        for unit in ['', 'Ki', 'Mi', 'Gi', 'Ti', 'Pi', 'Ei', 'Zi']:
            if abs(num) < 1024.0:
                return "%3.1f%s%s" % (num, unit, suffix)
            num /= 1024.0
        return "%.1f%s%s" % (num, 'Yi', suffix)


class ExtensionValidator(object):

    def __init__(self, allowed_extension=("doc", "pdf", "jpg", "png", "gif")):
        self.allowed_extension = allowed_extension

    def __call__(self, value):
        ext = self.get_extension(value.name)
        if ext.lower() not in self.allowed_extension:
            raise serializers.ValidationError(
                _('File extension do not allowed, the file have {} '
                  'extension and only is allowed {}'.format(ext, ", ".join(self.allowed_extension)))
            )

    @staticmethod
    def get_extension(filename):
        return os.path.splitext(filename)[1].replace(".", "")

