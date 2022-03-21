import string
import random
from datetime import datetime
from elasticsearch import Elasticsearch
from django.http import JsonResponse
es = Elasticsearch("http://localhost:9200")

def get_recipe_data(recipe):
    return recipe['_source']

# Parameter 'words' should be a list of strings desired for recipe
# 'neg_words' should be a list of strings not desired in recipe
def search(words, neg_words):
    if len(words) == 0 and len(neg_words) > 0:
        words.append("i")

    if len(words) > 1 and "i" in words:
        words.remove("i")

    words = " ".join(words).lower()

    # Testing search improvements here, not working now
    words.replace("recipes", " ")
    words.replace("recipe", " ")
    words.replace("something", " ")

    es.indices.refresh(index="test")
    neg_words = " ".join(neg_words)

    print(words)
    print(neg_words)

    results = es.search(index="test", body={ #perform sample search
        "size": 72,
        "query": {
            "bool": {
                "must": {
                    "multi_match": {
                        "query": words,
                        "fields": ["Title", "Instructions", "Ingredients"],
                        "operator": "and"
                    }
                },
                "must_not": {
                    "multi_match": {
                        "query": neg_words,
                        "fields": ["Title", "Instructions", "Ingredients"],
                        "operator": "or"
                    }
                }

            }
            }
    })['hits']['hits']

    # Prefer to AND, but if no results, OR instead

    if len(results) < 1:
        results = es.search(index="test", body={ #perform sample search
        "size": 72,
        "query": {
            "bool": {
                "must": {
                    "multi_match": {
                        "query": words,
                        "fields": ["Title", "Instructions", "Ingredients"],
                        "operator": "or"
                    }
                },
                "must_not": {
                    "multi_match": {
                        "query": neg_words,
                        "fields": ["Title", "Instructions", "Ingredients"],
                        "operator": "or"
                    }
                }

            }
            }
        })['hits']['hits']

    finalRes = []

    for result in results:
        finalRes.append(result['_source'])

    return finalRes # Return only relevant recipe data

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
        
