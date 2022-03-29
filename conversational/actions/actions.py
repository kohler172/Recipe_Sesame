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

class ActionIngredient(Action):

    ingredients = []
    def name(self) -> Text:
        return "action_ingredient"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        if any(x in tracker.latest_message['text'] for x in EXCLUSION_KEYWORDS):
            for entity in tracker.latest_message['entities']:
                postKeyword(entity['value'], True)
                dispatcher.utter_message(response="utter_ingredient_neg", ingredient=entity['value'])
        else:
            print('went positive')
            for entity in tracker.latest_message['entities']:
                postKeyword(entity['value'], False)
                dispatcher.utter_message(response="utter_ingredient_pos", ingredient=entity['value'])
                self.ingredients.append(entity['value'])

        print(self.ingredients)
        return []


class ActionAdjective(Action):

    def name(self) -> Text:
        return "action_adjective"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        print('went adjective')
        doc = nlp(tracker.latest_message['text'])
        if any(x in tracker.latest_message['text'] for x in EXCLUSION_KEYWORDS):
            for entity in tracker.latest_message['entities']:
                postKeyword(entity['value'], True)
                dispatcher.utter_message(response="utter_adjective_neg", adjective=entity['value'])
        else:
            for entity in tracker.latest_message['entities']:
                postKeyword(entity['value'], False)
                dispatcher.utter_message(response="utter_adjective_pos", adjective=entity['value'])

        return []


class ActionTool(Action):

    ingredients = []
    def name(self) -> Text:
        return "action_tool"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        if any(x in tracker.latest_message['text'] for x in EXCLUSION_KEYWORDS):
            for entity in tracker.latest_message['entities']:
                postKeyword(entity['value'], True)
                dispatcher.utter_message(response="utter_tool_neg", tool=entity['value'])
        else:
            for entity in tracker.latest_message['entities']:
                postKeyword(entity['value'], False)
                dispatcher.utter_message(response="utter_tool_pos", tool=entity['value'])

        print(self.ingredients)
        return []



class ActionClear(Action):

    def name(self) -> Text:
        return "action_clear"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        dispatcher.utter_message(response="utter_clear")

        return []
