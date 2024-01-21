from django.db import models

# Create your models here.
class Recipe(models.Model):
    """ Recipe, Plate, Meal """
    name = models.CharField(
        verbose_name=u'Food name'
    )

    description = models.CharField(
        verbose_name=u'Food description'
    )

    image = models.ImageField(
        verbose_name=u'Recipe image',
        upload_to='repice/',
        null=True
    )

    diners = models.PositiveIntegerField(
        verbose_name=u'Diners number'
    )

    time = models.TimeField(
        verbose_name=u'Cooking time'
    )

    category = models.ManyToManyField(
        verbose_name=u'Food categories',
        to='RecipeCategory',
        blank=True
    )

    ingredients = models.ManyToManyField(
        verbose_name=u'Food ingredients',
        to='RecipeIngredient',
        blank=True
    )


class RecipeCategory(models.Model):
    """ Recipe category """
    name = models.CharField(
        verbose_name=u'Category name',
        max_length=16,
        unique=True
    )


class RecipeIngredient(models.Model):
    """ Recipe ingredient """
    name = models.CharField(
        verbose_name=u'Ingredient name'
    )

    quantity = models.PositiveIntegerField(
        verbose_name=u'Ingredient quantity',
    )

    unit = models.CharField(
        verbose_name=u'Measure unit',
    )
