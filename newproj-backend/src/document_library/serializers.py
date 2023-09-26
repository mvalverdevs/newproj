import base64
from uuid import uuid4

import magic
from django.conf import settings
from django.core.files.base import ContentFile
from django.core.files.storage import FileSystemStorage
from document_library.validators import ExtensionValidator, SizeValidator
from drf_writable_nested import WritableNestedModelSerializer
from drf_yasg.utils import swagger_serializer_method
from rest_framework import serializers
from rest_framework.fields import SerializerMethodField
from utils.serializers import (DynamicModelSerializer,
                               FileSystemStorageReferenceFileField)

from .models import DOCUMENTS_BASEDIR, DocumentCategory, DocumentLibrary


class DocumentCategorySerializer(DynamicModelSerializer):
    class Meta:
        model = DocumentCategory
        fields = ('id','name', 'description')

class DocumentCategoryNameSerializer(DynamicModelSerializer):
    class Meta:
        model = DocumentCategory
        fields = ('id','name',)

class DocumentLibrarySerializer(DynamicModelSerializer, WritableNestedModelSerializer):
    category_data = SerializerMethodField()

    def get_category_data(self, obj):
        if obj and obj.category is not None:
            return DocumentCategoryNameSerializer(obj.category).data
        else:
            return None

    class Meta:
        model = DocumentLibrary
        fields = (
            'id',
            'name',
            'document',
            'title',
            'author',
            'type_license',
            'description',
            'expiry_date',
            'visible',
            'category',
            'category_data',
        )


class DocumentLibraryCreateSerializer(DynamicModelSerializer, WritableNestedModelSerializer):

    document = FileSystemStorageReferenceFileField(
        basedir=DOCUMENTS_BASEDIR, help_text='document reference uuid', remove_file_after=False
    )

    class Meta:
        model = DocumentLibrary
        fields = ('id', 'name', 'document','title', 'author', 'type_license', 'description', 'expiry_date', 'visible', 'category')


class DocumentLibraryUpdateSerializer(DynamicModelSerializer, WritableNestedModelSerializer):

    class Meta:
        model = DocumentLibrary
        fields = ('id', 'name', 'document', 'title', 'author', 'type_license', 'description', 'expiry_date', 'visible', 'category')


class DocumentLibraryBase64Serializer(DynamicModelSerializer, WritableNestedModelSerializer):

    document_base64 = SerializerMethodField()

    class Meta:
        model = DocumentLibrary
        fields = ('id', 'document_base64')
        extra_kwargs = {
            "document_base64": {"read_only": True},
        }

    @swagger_serializer_method(serializers.CharField(read_only=True))
    def get_document_base64(self, obj):
        try:
            data = obj.document.read()
        except IOError:
            return None

        mime = magic.from_buffer(data, mime=True)
        data64 = base64.b64encode(data).decode('ascii')
        return u'data:%s;base64,%s' % (mime, data64)


class DocumentLibraryFileUploadSerializer(serializers.Serializer):

    document = serializers.FileField(
        write_only=True,
        validators=[
            SizeValidator(max_size=settings.MAX_UPLOAD_FILE_SIZE_BYTES),
            ExtensionValidator(allowed_extension=settings.FILE_EXTENSIONS)
        ]
    )
    uuid = serializers.CharField(read_only=True)

    class Meta:
        fields = ('uuid', 'document')

    def create(self, validated_data):
        # Save document to local disk with random uuid
        uuid = str(uuid4())
        storage = FileSystemStorage()

        if 'basedir' in self.context:
            filebinpath = self.context['basedir'] + '/' + uuid + '.bin'
            filenamepath = self.context['basedir'] + '/' + uuid + '.name'
        else:
            filebinpath = uuid + '.bin'
            filenamepath = uuid + '.name'

        # Save binary data to <uuid>.bin
        storage.save(filebinpath, validated_data['document'])

        # Save original filename to <uuid>.name
        storage.save(filenamepath, ContentFile(validated_data['document'].name))

        return {'uuid': uuid}

    @staticmethod
    def update(instance, **kwargs):
        return instance


