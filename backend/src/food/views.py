from utils.views import ModelViewSet
from food.models import Recipe, RecipeCategory, RecipeIngredient
from food.serializers import RecipeSerializer, RecipeCategorySerializer, RecipeIngredientSerializer
from rest_framework.parsers import MultiPartParser

# Create your views here.

class RecipeView(ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    filterset_fields = ('category', )
    parsers = [MultiPartParser]


class RecipeCategoryView(ModelViewSet):
    queryset = RecipeCategory.objects.all()
    serializer_class = RecipeCategorySerializer


class RecipeIngredientView(ModelViewSet):
    queryset = RecipeIngredient.objects.all()
    serializer_class = RecipeIngredientSerializer
