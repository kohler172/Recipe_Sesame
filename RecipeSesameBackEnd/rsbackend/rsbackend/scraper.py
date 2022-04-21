import string
import random
from datetime import datetime
from elasticsearch import Elasticsearch
from django.http import JsonResponse
from bs4 import BeautifulSoup
import requests

def scrape_photo(url):
    url = 'https://www.instructables.com/' + url
    data = requests.get(url)

    html = BeautifulSoup(data.text, 'html.parser')

    articles = html.select('div > img')
    ret = ''
    for val in articles:
        ret = val.attrs['src']
        break

    return ret


def scrape_instructions(url):
    url = 'https://www.instructables.com/' + url
    
    data = requests.get(url)

    html = BeautifulSoup(data.text, 'html.parser')

    articles = html.select('.step-body > p')

    ret = ''
    for val in articles:
        print(val.text)
        ret += val.text

    return ret

# url = 'https://www.instructables.com/DIY-Solar-Bottle-Lamp/'
# print(scrape_instructions(url))
