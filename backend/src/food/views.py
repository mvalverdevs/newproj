from utils.views import ModelViewSet
from food.models import Recipe, RecipeCategory, RecipeIngredient, RecipeImage
from food.serializers import RecipeSerializer, RecipeCategorySerializer, RecipeIngredientSerializer, RecipeImageSerializer
from rest_framework import mixins, viewsets

# Create your views here.

class RecipeView(ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    filterset_fields = ('category', )


class RecipeImageView(
    viewsets.GenericViewSet,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin
):
    queryset = RecipeImage.objects.all()
    serializer_class = RecipeImageSerializer


class RecipeCategoryView(ModelViewSet):
    queryset = RecipeCategory.objects.all()
    serializer_class = RecipeCategorySerializer


class RecipeIngredientView(ModelViewSet):
    queryset = RecipeIngredient.objects.all()
    serializer_class = RecipeIngredientSerializer
