import string
import random
from datetime import datetime
from elasticsearch import Elasticsearch
from django.http import JsonResponse
from bs4 import BeautifulSoup
import requests

def scrape_photo(url):
    data = requests.get(url)

    html = BeautifulSoup(data.text, 'html.parser')

    articles = html.select('div > img')
    ret = ''
    for val in articles:
        ret = val.attrs['src']
        break

    return ret


def scrape_instructions(url):
    data = requests.get(url)

    html = BeautifulSoup(data.text, 'html.parser')

    articles = html.select('.stepbody')

    ret = ''
    for val in articles:
        print(val)

    return ret


