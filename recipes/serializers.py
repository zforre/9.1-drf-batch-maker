from rest_framework import serializers

from .models import Recipe


class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ('id', 'title', 'description', 'image', 'is_public', 
        'recipe_type', 'prep_time', 'cook_time', 'cook_temp', 'directions',)