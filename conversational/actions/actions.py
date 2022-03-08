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

class ActionIngredientPos(Action):

    ingredients = []
    def name(self) -> Text:
        return "action_ingredient_pos"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        print('went positive')
        for entity in tracker.latest_message['entities']:
            dispatcher.utter_message(response="utter_ingredient_pos", ingredient=entity['value'])
            self.ingredients.append(entity['value'])

        print(self.ingredients)
        return []

class ActionIngredientNeg(Action):
    neg_ingredients = []
    def name(self) -> Text:
        return "action_ingredient_neg"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        print('went negative')
        for entity in tracker.latest_message['entities']:
            dispatcher.utter_message(response="utter_ingredient_neg", ingredient=entity['value'])
            self.neg_ingredients.append(entity['value'])

        print('excluding: ')
        print(self.neg_ingredients)
        return []

class ActionAdjectivePos(Action):

    def name(self) -> Text:
        return "action_adjective_pos"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        print('went adjective')
        doc = nlp(tracker.latest_message['text'])
        for token in doc:
            if token.pos_ == "ADJ":
                dispatcher.utter_message(response="utter_adjective_pos", adjective=token.text)

        return []

class ActionAdjectiveNeg(Action):

    def name(self) -> Text:
        return "action_adjective_neg"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        doc = nlp(tracker.latest_message['text'])
        for token in doc:
            if token.pos_ == "ADJ":
                dispatcher.utter_message(response="utter_adjective_neg", adjective=token.text)

        return []

class ActionToolPos(Action):

    ingredients = []
    def name(self) -> Text:
        return "action_tool_pos"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        print('went positive')
        for entity in tracker.latest_message['entities']:
            dispatcher.utter_message(response="utter_tool_pos", tool=entity['value'])
            self.ingredients.append(entity['value'])

        print(self.ingredients)
        return []

class ActionToolNeg(Action):
    neg_ingredients = []
    def name(self) -> Text:
        return "action_tool_neg"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        print('went negative')
        for entity in tracker.latest_message['entities']:
            dispatcher.utter_message(response="utter_tool_neg", tool=entity['value'])
            self.neg_ingredients.append(entity['value'])

        print('excluding: ')
        print(self.neg_ingredients)
        return []


class ActionClear(Action):

    def name(self) -> Text:
        return "action_clear"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        dispatcher.utter_message(response="utter_clear")

        return []
