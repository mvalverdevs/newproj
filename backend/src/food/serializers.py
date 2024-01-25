from rest_framework import serializers
from utils.serializers import DynamicModelSerializer
from food.models import Recipe, RecipeCategory, RecipeIngredient, RecipeImage


class RecipeImageSerializer(DynamicModelSerializer):
    class Meta:
        model = RecipeImage
        fields = '__all__'


class RecipeSerializer(DynamicModelSerializer):
    image_data = RecipeImageSerializer(read_only=True, source='image')
    class Meta:
        model = Recipe
        fields = (
            'id',
            'name',
            'description',
            'diners',
            'time',
            'category',
            'ingredients',
            'image',
            'image_data'
        )
        read_only_fields = (
            'id',
            'image_data'
        )


class RecipeCategorySerializer(DynamicModelSerializer):
    class Meta:
        model = RecipeCategory
        fields = '__all__'


class RecipeIngredientSerializer(DynamicModelSerializer):
    class Meta:
        model = RecipeIngredient
        fields = '__all__'