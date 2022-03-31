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

        keywords = getEntitiesString(tracker.latest_message['entities'])

        if any(x in tracker.latest_message['text'] for x in EXCLUSION_KEYWORDS):
            for entity in tracker.latest_message['entities']:
                postKeyword(entity['value'], True)
            if keywords is False:
                dispatcher.utter_message(response="utter_dont_understand")
            else:
                dispatcher.utter_message(response="utter_ingredient_neg", ingredient=keywords)

        else:
            for entity in tracker.latest_message['entities']:
                postKeyword(entity['value'], False)
            if keywords is False:
                dispatcher.utter_message(response="utter_dont_understand")
            else:
                dispatcher.utter_message(response="utter_ingredient_pos", ingredient=keywords)

        print(tracker.latest_message['entities'])
        return []


class ActionAdjective(Action):

    def name(self) -> Text:
        return "action_adjective"

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
                dispatcher.utter_message(response="utter_adjective_neg", adjective=keywords)
        else:
            for entity in tracker.latest_message['entities']:
                postKeyword(entity['value'], False)
            if keywords is False:
                dispatcher.utter_message(response="utter_dont_understand")
            else:
                dispatcher.utter_message(response="utter_adjective_pos", adjective=keywords)

        return []


class ActionTool(Action):

    ingredients = []
    def name(self) -> Text:
        return "action_tool"

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
                dispatcher.utter_message(response="utter_tool_neg", tool=keywords)
        else:
            for entity in tracker.latest_message['entities']:
                postKeyword(entity['value'], False)
            if keywords is False:
                dispatcher.utter_message(response="utter_dont_understand")
            else:
                dispatcher.utter_message(response="utter_tool_pos", tool=keywords)

        return []



class ActionClear(Action):

    def name(self) -> Text:
        return "action_clear"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        dispatcher.utter_message(response="utter_clear")

        return []
