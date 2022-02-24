# Rasa: Conversational Chatbot

Chatbot in rasa. Not integrated with the rest yet.

## Setup

Rasa must be installed.

In /conversational run the following command to start the actions server.

### `rasa run actions`

Then, in a seperate terminal, 

### `rasa train`
to train a new model.

### `rasa shell`
to speak to the chatbot using the most recent model.


## Relevant files

domain.yml specifies intents, responses, and actions
data/nlu.yml contains sample statements for mapping statements to intents
data/stories.yml contains example stories of the path a conversation should take
actions/actions.py is where we will interact with the backend.