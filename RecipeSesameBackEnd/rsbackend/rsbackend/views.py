import json
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import status
from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from elasticsearch import Elasticsearch
from django.http import JsonResponse
from .recipeSearch import search, random_recipes
from .nlp import get_keywords
#from rasa.nlu.model import Interpreter

class MessageView(APIView):
    EXCLUSION_KEYWORDS = ["no ", "not ", "don't ", "dont ", "nothing ", "without ", "allergic ", "dislike ", "hate "]

    def post(self, request):
        #Cheap search reset for demo purposes.
        searches = request.data['keywords']
        print(request.data['keywords'])
        neg_searches = request.data['negKeywords']
        if any(x in request.data['message'].lower() for x in self.EXCLUSION_KEYWORDS):
            neg_searches += get_keywords(request.data['message'])
        else:
            searches += get_keywords(request.data['message'])

        recipes = search(searches, neg_searches)
        data = {"recipes": recipes, "keywords": searches, "negKeywords": neg_searches}
        return Response(json.dumps(data))

class RandomView(APIView):
    def get(self, request):
        number_of_recipes = 6
        return Response(random_recipes(number_of_recipes))
