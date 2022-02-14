from datetime import datetime
from elasticsearch import Elasticsearch
es = Elasticsearch("http://localhost:9200")

print("Enter your recipe search: ")
input = input()

es.indices.refresh(index="test")

res = es.search(index="test", query={ #perform sample search
    "multi_match": {
            "query": input,
            "fields": ["title", "instructions", "ingredients"],
            "operator": "or"
            }
        })

print("Got %d Hits:" % res['hits']['total']['value'])

for hit in res['hits']['hits']:
    print("%(title)s: %(instructions)s" % hit["_source"])