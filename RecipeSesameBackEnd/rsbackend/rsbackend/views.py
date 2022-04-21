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
from .scraper import scrape_instructions, scrape_photo
#from rasa.nlu.model import Interpreter

keywords = []
negKeywords = []
EXCLUSION_KEYWORDS = ["no ", "not ", "don't ", "dont ", "nothing ", "without ", "allergic ", "dislike ", "hate ", "rid "]

class MessageView(APIView):
    #Shouldn't be necessary anymore
    def removeI(self, keywords):
        if "i" in keywords:
            keywords.remove("i")
        elif "I" in keywords:
            keywords.remove("I")
        return keywords

    def post(self, request):
        recipes = search(keywords, negKeywords)
        print(recipes)
        data = {"recipes": recipes, "keywords": keywords, "negKeywords": negKeywords}
        return Response(json.dumps(data))


class RandomView(APIView):
    def get(self, request):
        number_of_recipes = 6
        return Response(random_recipes(number_of_recipes))

class ScraperView(APIView):
    def post(self, request):
        val = str(request.body)
        
        url = val[48:-3]
        if 'image' in val:
            vall = scrape_photo(url)
        else:
            vall = scrape_instructions(url)
        return Response(vall)

#Class to update keywords & negKeywords
class KeywordsView(APIView):
    #Returns keywords & negKeywords
    def get(self, request):
        return Response({'keywords': keywords, 'negKeywords': negKeywords})
    #Adds a single keyword to either keywords or negKeywords depending on neg?
    def post(self, request):
        if request.data['neg?'] == 'True':
            negKeywords.append(request.data['keyword'])
        else:
            keywords.append(request.data['keyword'])

        
        return Response({'keywords': keywords, 'negKeywords': negKeywords})
    #Clears both keywords and negKeywords
    def delete(self, request):
        keywords.clear()
        negKeywords.clear()
        return Response({'keywords': keywords, 'negKeywords': negKeywords})
