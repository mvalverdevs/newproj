from utils.views import ModelViewSet
from food.models import Recipe, RecipeCategory, RecipeIngredient
from food.serializers import RecipeSerializer, RecipeCategorySerializer, RecipeIngredientSerializer

# Create your views here.

class RecipeView(ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer


class RecipeCategoryView(ModelViewSet):
    queryset = RecipeCategory.objects.all()
    serializer_class = RecipeCategorySerializer


class RecipeIngredientView(ModelViewSet):
    queryset = RecipeIngredient.objects.all()
    serializer_class = RecipeIngredientSerializer
