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
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path, re_path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions, routers
from user import views as user_views
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView
from food import views as food_views


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
    # Documentation and definition
    re_path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    re_path('api/swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    re_path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]

# User views
router.register(
    r'user',
    user_views.UserView,
    basename='user'
)

# Food views
router.register(
    r'recipe',
    food_views.RecipeView,
    basename='recipe'
)

router.register(
    r'recipe_category',
    food_views.RecipeCategoryView,
    basename='recipe_category'
)

router.register(
    r'recipe_ingredient',
    food_views.RecipeIngredientView,
    basename='recipe_ingredient'
)


urlpatterns += [
    re_path(r"^api/", include((router.urls, "current"), namespace="current")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)