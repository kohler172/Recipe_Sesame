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

    def name(self) -> Text:
        return "action_ingredient_pos"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        doc = nlp(tracker.latest_message['text'])
        for chunk in doc.noun_chunks: 
            dispatcher.utter_message(response="utter_ingredient_pos", ingredient=chunk.text)

        return []

class ActionIngredientNeg(Action):

    def name(self) -> Text:
        return "action_ingredient_neg"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        doc = nlp(tracker.latest_message['text'])
        for chunk in doc.noun_chunks: 
            dispatcher.utter_message(response="utter_ingredient_neg", ingredient=chunk.text)

        return []

class ActionAdjectivePos(Action):

    def name(self) -> Text:
        return "action_adjective_pos"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

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
