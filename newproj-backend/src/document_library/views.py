from django.conf import settings
from django.utils.translation import gettext as _
from django_filters.rest_framework import DjangoFilterBackend
from document_library.models import (DOCUMENTS_BASEDIR, DocumentCategory,
                                     DocumentLibrary)
from drf_yasg.utils import swagger_auto_schema
from rest_framework import mixins, status
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter
from rest_framework.parsers import JSONParser, MultiPartParser
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from .serializers import (DocumentCategorySerializer,
                          DocumentLibraryBase64Serializer,
                          DocumentLibraryCreateSerializer,
                          DocumentLibraryFileUploadSerializer,
                          DocumentLibrarySerializer,
                          DocumentLibraryUpdateSerializer)


class DocumentCategoryView(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    GenericViewSet
):
    """
        ViewSet for managing Document Categories CRUD + Listing
    """
    serializer_class = DocumentCategorySerializer
    queryset = DocumentCategory.objects.all()
    filter_backends = [SearchFilter, DjangoFilterBackend]

    search_fields = (
        'name', 'description',
    )

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        responses={status.HTTP_404_NOT_FOUND: _('Not found')},
    )
    def retrieve(self, request, *args, **kwargs):
        """
        Method to retrieve a document.
        """
        return super().retrieve(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        """
        Method to delete a document
        """
        return super().destroy(request=request, *args, **kwargs)

    @swagger_auto_schema(
        responses={
            status.HTTP_201_CREATED: DocumentCategorySerializer,
            status.HTTP_400_BAD_REQUEST: _('Error creating element')
        }
    )
    def create(self, request, *args, **kwargs):
        """
        Method to create a document
        """
        return super().create(request=request, *args, **kwargs)


    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)


    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)


class DocumentLibraryView(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    GenericViewSet
):
    """
    Views for PhotoLibrary REST
    """
    serializer_class = DocumentLibrarySerializer
    queryset = DocumentLibrary.objects.all()
    filter_backends = [SearchFilter, DjangoFilterBackend]

    search_fields = (
        'name', 'description',
    )

    # FormParser, MultiPartParser needed for /upload/ endpoint
    parser_classes = (JSONParser, MultiPartParser)

    def get_serializer_class(self):
        if self.action == 'create':
            return DocumentLibraryCreateSerializer
        elif self.action in ('update', 'partial_update'):
            return DocumentLibraryUpdateSerializer
        elif self.action == 'upload':
            return DocumentLibraryFileUploadSerializer
        elif self.action == 'base64':
            return DocumentLibraryBase64Serializer

        return self.serializer_class


    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        responses={status.HTTP_404_NOT_FOUND: _('Not found')}
    )
    def retrieve(self, request, *args, **kwargs):
        """
        Method to retrieve a document.
        """
        return super().retrieve(request, *args, **kwargs)


    def destroy(self, request, *args, **kwargs):
        """
        Method to delete a document
        """
        return super().destroy(request=request, *args, **kwargs)

    @swagger_auto_schema(
        responses={
            status.HTTP_201_CREATED: DocumentLibrarySerializer,
            status.HTTP_400_BAD_REQUEST: _('Error creating element')
        },
    )
    def create(self, request, *args, **kwargs):
        """
        Method to create a document
        """
        return super().create(request=request, *args, **kwargs)

    @action(detail=False, methods=('POST',))
    @swagger_auto_schema(
        responses={
            status.HTTP_201_CREATED: DocumentLibraryFileUploadSerializer,
            status.HTTP_400_BAD_REQUEST: _('File upload error'),
        },
        request_body=DocumentLibraryFileUploadSerializer,
    )
    def upload(self, request):
        """
        Method to upload an document
        """
        file_serializer = DocumentLibraryFileUploadSerializer(data=request.data, context={'basedir': DOCUMENTS_BASEDIR})
        file_serializer.is_valid(raise_exception=True)
        uploaded_file = file_serializer.save()
        return Response(status=status.HTTP_201_CREATED, data=uploaded_file)

    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: DocumentLibrarySerializer,
            status.HTTP_404_NOT_FOUND: _('Not found')
        },
    )
    def update(self, request, *args, **kwargs):
        """
        Method to update a document
        """
        return super().update(request=request, *args, **kwargs)

    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: DocumentLibrarySerializer,
            status.HTTP_404_NOT_FOUND: _('Not found')
        },
    )
    def partial_update(self, request, *args, **kwargs):
        """
        Method to partially update a document
        """
        return super().partial_update(request=request, *args, **kwargs)

    @action(detail=True, methods=['GET'])
    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: DocumentLibraryBase64Serializer,
            status.HTTP_404_NOT_FOUND: _('Not found')},
    )
    def base64(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)
