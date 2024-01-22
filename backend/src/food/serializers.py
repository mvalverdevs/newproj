from rest_framework import serializers
from utils.serializers import DynamicModelSerializer
from food.models import Recipe, RecipeCategory, RecipeIngredient

class RecipeSerializer(DynamicModelSerializer):
    class Meta:
        model = Recipe
        fields = '__all__'

class RecipeCategorySerializer(DynamicModelSerializer):
    class Meta:
        model = RecipeCategory
        fields = '__all__'


class RecipeIngredientSerializer(DynamicModelSerializer):
    class Meta:
        model = RecipeIngredient
        fields = '__all__'