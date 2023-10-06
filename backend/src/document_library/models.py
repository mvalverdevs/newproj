import os
from uuid import uuid4

from django.contrib.contenttypes.fields import GenericRelation
from django.db import models
from django.db.models import (PROTECT, SET_NULL, BooleanField, CharField,
                              DateTimeField, FileField, ForeignKey, TextField)
from django.utils.translation import gettext as _
from model_utils.models import TimeStampedModel
# from translation.models import Translatable, TranslationTask
from unidecode import unidecode

LICENSE0 = "sense-llicencia"
LICENSE1 = "copyright"
LICENSE2 = "copyleft"
LICENSE3 = "cc-by"
LICENSE4 = "cc-by-nc"
LICENSE5 = "by-nc-sa"
LICENSE6 = "by-nc-nd"
LICENSE7 = "by-sa"
LICENSE8 = "by-nd"
LICENSE9 = "publica"

CH_TYPE_LICENSE = (
    (LICENSE0, _("Sense llicència")),
    (LICENSE1, _("Copyright")),
    (LICENSE2, _("Copyleft")),
    (LICENSE3, _("Reconeixement")),
    (LICENSE4, _("Reconeixement – NoComercial")),
    (LICENSE5, _("Reconeixement - NoComercial - CompartirIgual")),
    (LICENSE6, _("Reconeixement - NoComercial - SenseObraDerivada")),
    (LICENSE7, _("Reconeixement - CompartirIgual")),
    (LICENSE8, _("Reconeixement - SenseObraDerivada")),
    (LICENSE9, _("Publica")),
)


DOCUMENTS_BASEDIR = 'uploaded_documents'


def set_filename(instance, filename):
    """
    Set filename from name of the instance
    :param instance: Model  An instance of the model where the FileField is defined.
    :param filename: str   The filename that was originally given to the file.
    :return: str  New name
    """

    # NOTE: calculation of the actual name is now made in DocumentLibrary.save() method. This function
    # must exist just to not break reference from 0001_initial.py migration
    return instance.document.name

class DocumentCategory(TimeStampedModel):
    name = CharField(max_length=512, help_text=_("Category name"))
    description = CharField(max_length=512, help_text=_("Category description"), null=True, blank=True)

class DocumentLibrary(TimeStampedModel):
    name = CharField(max_length=512, help_text=_("Document name"))
    document = FileField(help_text=_("Document URL"), null=True, default=None, upload_to=set_filename, max_length=512)
    description = TextField(help_text=_("Photo description"), default="", blank=True)
    title = CharField(max_length=512, help_text=_("Title"), null=True, blank=True)
    author = CharField(max_length=512, help_text=_("Author"),null=True, blank=True)
    type_license = CharField(max_length=30, help_text=_("License type"), choices=CH_TYPE_LICENSE, default=LICENSE0, blank=True, null=True)
    expiry_date = DateTimeField(help_text=_("Date on which the deletion of the photo is scheduled"), null=True)
    visible = BooleanField(help_text=_("The file is visible on Internet"), null=False, default=True)
    category = ForeignKey(DocumentCategory,help_text=_("Document category"), null=True, blank=True, on_delete=PROTECT)

    @property
    def entity_count(self):
        return self.entities_that_have_this_document.count()

    class Meta:
        ordering = ["-created"]


    def set_translations(self, translations):
        if "title" in translations:
            self.title = translations["title"]
        if "description" in translations:
            self.description = translations["description"]
        self.save()

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        # New pictures only. Main image file updating not supported
        if not self.id:
            # UUID for main image filename and thumbnail filename
            uuid = str(uuid4())[:8]

            # Set filename from 'name' attribute and get file extension from the original filename
            filename, _ = os.path.splitext(self.name)
            _, extension = os.path.splitext(self.document.name)
            filename = unidecode(filename)
            self.document.name = f'{filename}.{uuid}{extension}'

        super().save(force_insert, force_update, using, update_fields)


    def delete(self, **kwargs):
        self.document.delete(save=False)
        super().delete()

