from rest_framework import serializers
from RecipeSesameBackEnd.rsbackend.rsbackend.models import Craft
from models import Message, Recipe, Ingredient

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('content')

class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ('title', 'instructions', 'picture_link', 'ingredients')

class CraftSerializer(serializers.ModelSerializer):
    class Meta:
        model = Craft
        fields = ('Project-Title', 'Instructables-link', 'Subcategory')