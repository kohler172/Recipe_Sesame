import string
import random
from datetime import datetime
from elasticsearch import Elasticsearch
from django.http import JsonResponse
es = Elasticsearch("http://localhost:9200")

def get_recipe_data(recipe):
    return recipe['_source']

# Parameter 'words' should be a list of strings
def search(words):
    print('heres words')
    print(words)
    words = " ".join(words)
    es.indices.refresh(index="crafts")

    results = es.search(index="crafts", body={ #perform sample search
        "query": {
            "multi_match": {
                "query": words,
                "fields": ["Title", "Instructions", "Ingredients"],
                "operator": "or"
                }
            }
        })['hits']['hits']
    
    print('went')

    return map(get_recipe_data, results) # Return only relevant recipe data

def random_recipes(amount):
    es.indices.refresh(index="test")

    results = es.search(index="test", body={
        "size": amount,
        "query": {
            "function_score": {
                "functions": [
                    {
                    "random_score": {
                        "seed": ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(25))
                    }
                    }
                ]
            }
        }
    })['hits']['hits']

    return map(get_recipe_data, results)
        
