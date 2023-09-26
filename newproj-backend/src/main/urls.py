"""
URL configuration for main project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from actionlogging import views as actionlogging_views
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path, re_path
from document_library import views as document_views
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions, routers
from user import views as user_views

schema_view = get_schema_view(
   openapi.Info(
      title="newproj API",
      default_version='1.0.0',
      description="Test description",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@example.org"),
      license=openapi.License(name="Custom License"),
   ),
   public=True,
   permission_classes=[permissions.AllowAny],
)

# To register all the urls, add one for each view created
router = routers.DefaultRouter()

urlpatterns = [
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

# Actionlogging views
router.register(
    r"actionlogging",
    actionlogging_views.LoggedActionView,
    basename="actionlogging"
)

# User views
router.register(
    r'user',
    user_views.UserView,
    basename='user'
)

router.register(
    r'user_role',
    user_views.UserRoleView,
    basename='user_role'
)

router.register(
    r'permissions',
    user_views.Permissions,
    basename='permissions'
)


# Document Library
router.register(
    r'document_library_category',
    document_views.DocumentCategoryView,
    basename="document_library_category"
)

router.register(
    r'document_library',
    document_views.DocumentLibraryView,
    basename="document_library"
)

urlpatterns += [
    re_path(r"^api/", include((router.urls, "current"), namespace="current")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)