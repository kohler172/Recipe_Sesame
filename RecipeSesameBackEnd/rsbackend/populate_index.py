from datetime import datetime
import enum
import json
import csv
from elasticsearch import Elasticsearch, helpers
es = Elasticsearch("http://localhost:9200")

with open('rsbackend/dataset_trimmed.csv') as csv_file:
  reader = csv.DictReader(csv_file)
  helpers.bulk(es, reader, index='test')

es.indices.refresh(index="test")