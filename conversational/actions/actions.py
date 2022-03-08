# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions

from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
import spacy

nlp = spacy.load("en_core_web_md")

EXCLUSION_KEYWORDS = ["not", "don't", "dont", "allergic", "dislike", "hate"]

class ActionIngredient(Action):

    ingredients = []
    def name(self) -> Text:
        return "action_ingredient"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        if any(x in tracker.latest_message['text'] for x in EXCLUSION_KEYWORDS):
            for entity in tracker.latest_message['entities']:
                dispatcher.utter_message(response="utter_ingredient_neg", ingredient=entity['value'])
        else:
            print('went positive')
            for entity in tracker.latest_message['entities']:
                dispatcher.utter_message(response="utter_ingredient_pos", ingredient=entity['value'])
                self.ingredients.append(entity['value'])

        print(self.ingredients)
        return []


class ActionAdjectivePos(Action):

    def name(self) -> Text:
        return "action_adjective"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        print('went adjective')
        doc = nlp(tracker.latest_message['text'])
        if any(x in tracker.latest_message['text'] for x in EXCLUSION_KEYWORDS):
            for token in doc:
                if token.pos_ == "ADJ":
                    dispatcher.utter_message(response="utter_adjective_neg", adjective=token.text)
        else:
            for token in doc:
                if token.pos_ == "ADJ":
                    dispatcher.utter_message(response="utter_adjective_pos", adjective=token.text)

        return []


class ActionToolPos(Action):

    ingredients = []
    def name(self) -> Text:
        return "action_tool"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        if any(x in tracker.latest_message['text'] for x in EXCLUSION_KEYWORDS):
            for entity in tracker.latest_message['entities']:
                dispatcher.utter_message(response="utter_tool_neg", tool=entity['value'])
        else:
            for entity in tracker.latest_message['entities']:
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
