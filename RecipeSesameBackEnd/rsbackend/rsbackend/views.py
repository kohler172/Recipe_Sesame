from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from elasticsearch import Elasticsearch
from django.http import JsonResponse
from .recipeSearch import search, random_recipes
from .nlp import get_keywords

class MessageView(APIView):
    #List class member for tracking keywords in current search thread.#
    searches = []

    def post(self, request):
        #Cheap search reset for demo purposes.
        if 'search' in request.data['message'].lower():
            self.searches.clear()
        else:
            self.searches += get_keywords(request.data['message'])
        return Response(search(self.searches))

class RandomView(APIView):
    def get(self, request):
        number_of_recipes = 6
        return Response(random_recipes(number_of_recipes))
        