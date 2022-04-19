# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions

from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
import spacy
import requests

nlp = spacy.load("en_core_web_md")
keywordUrl = 'http://localhost:8000/keywords/'
EXCLUSION_KEYWORDS = ["no ", "not ", "don't ", "dont ", "nothing ", "without ", "allergic ", "dislike ", "hate ", "rid ", "exclude "]

#Posts a single keyword to the backend, adding it to the list
def postKeyword(keyword, neg):
    print("heres keyword")
    print(keyword)
    keyDict = {'keyword': keyword, 'neg?': neg}
    r = requests.post(url = keywordUrl, data = keyDict)

#Get the string of entities for printing
def getEntitiesString(entities):
    if len(entities) == 0:
        return False
    elif len(entities) == 1:
        return entities[0]['value']
    elif len(entities) == 2:
        return entities[0]['value']+" and "+entities[1]['value']
    else:
        str = entities[0]['value']
        for i in range(len(entities)-2):
            str = str+", "+entities[i+1]['value']
        return str+", and "+entities[-1]['value']

class ActionIngredient(Action):
    def name(self) -> Text:
        return "action_ingredient"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

<<<<<<< HEAD
        keywords = getEntitiesString(tracker.latest_message['entities'])
        print("IN RUN")
        print(tracker.latest_message['text'])
=======

        doc = nlp(tracker.latest_message['text'])
        nouns = [chunk.text for chunk in doc.noun_chunks]
        adjectives = [token.lemma_ for token in doc if token.pos_ == "ADJ"]
        keywords = nouns + adjectives
>>>>>>> 38f03bb15b8a02d8d0c0caf060b4a8eddd6a8a8c

        if any(x in tracker.latest_message['text'] for x in EXCLUSION_KEYWORDS):
            for word in keywords:
                postKeyword(word, True)
            if keywords is False:
                dispatcher.utter_message(response="utter_dont_understand")
            else:
                dispatcher.utter_message(response="utter_ingredient_neg", ingredient=keywords)

        else:
            for word in keywords:
                postKeyword(word, False)
            if keywords is False:
                dispatcher.utter_message(response="utter_dont_understand")
            else:
                dispatcher.utter_message(response="utter_ingredient_pos", ingredient=keywords)

        print(tracker.latest_message['entities'])
        return []

class ActionCategory(Action):
    def name(self) -> Text:
        return "action_category"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        keywords = getEntitiesString(tracker.latest_message['entities'])

        if any(x in tracker.latest_message['text'] for x in EXCLUSION_KEYWORDS):
            for entity in tracker.latest_message['entities']:
                postKeyword(entity['value'], True)
            if keywords is False:
                dispatcher.utter_message(response="utter_dont_understand")
            else:
                dispatcher.utter_message(response="utter_ingredient_neg", category=keywords)

        else:
            for entity in tracker.latest_message['entities']:
                postKeyword(entity['value'], False)
            if keywords is False:
                dispatcher.utter_message(response="utter_dont_understand")
            else:
                dispatcher.utter_message(response="utter_category", category=keywords)

        print(tracker.latest_message['entities'])
        return []



class ActionClear(Action):

    def name(self) -> Text:
        return "action_clear"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        dispatcher.utter_message(response="utter_clear")

        return []
