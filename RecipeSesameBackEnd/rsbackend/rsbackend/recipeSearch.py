import string
import random
from datetime import datetime
from elasticsearch import Elasticsearch
from django.http import JsonResponse
from .scraper import scrape_instructions, scrape_photo
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

    # Remove search-breaking words from array
    if "recipes" in words:
        words.remove("recipes")
    if "recipe" in words:
        words.remove("recipe")
    if "something" in words:
        words.remove("something")
    if "some" in words:
        words.remove("some")

    words = " ".join(words).lower()

    es.indices.refresh(index="crafts")
    neg_words = " ".join(neg_words)

    results = es.search(index="crafts", body={ #perform sample search
        "size": 72,
        "query": {
            "bool": {
            "must": {
                "multi_match": {
                    "query": words,
                    "fields": ["Project_Title"],
                    "operator": "and"
                }
            },
            "must_not": {
                "multi_match": {
                    "query": neg_words,
                    "fields": ["Project_Title"],
                    "operator": "or"
                }
            }
            }
        }
    })['hits']['hits']

    # Prefer to AND, but if no results, OR instead

    if len(results) < 1:
        results = es.search(index="crafts", body={ #perform sample search
        "query": {
            "bool": {
            "must": {
                "multi_match": {
                    "query": words,
                    "fields": ["Project_Title"],
                    "operator": "and"
                }
            },
            "must_not": {
                "multi_match": {
                    "query": neg_words,
                    "fields": ["Project_Title"],
                    "operator": "or"
                }
            }
            }
        }
        })['hits']['hits']

    finalRes = []

    for result in results:
        dict = result['_source']
        dict["instructions"] = scrape_instructions(dict['Instructables_link'])
        # print("now instr. ")
        # print(dict["instructions"])
        finalRes.append(dict)

    return finalRes # Return only relevant recipe data

def random_recipes(amount):
    es.indices.refresh(index="crafts")
    print('called randrecp')

    results = es.search(index="crafts", body={
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

    res = []
    # print('results here')
    # print(results[0]['_source'])
    for result in results:
        dict = result['_source']
        dict["instructions"] = scrape_instructions(dict['Instructables_link'])
        dict["img_url"] = scrape_photo(dict['Instructables_link'])
        # print("now instr. ")
        # print(dict["instructions"])
        res.append(dict)
    # print(type(results[0]['_source']))

    # return map(get_recipe_data, results)
    cop = map(get_recipe_data, results)
    print('heres cop')
    # print(cop)
    return res
        
