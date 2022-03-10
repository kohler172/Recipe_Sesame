# Rasa: Conversational Chatbot

Chatbot in rasa. Not integrated with the rest yet.

## Setup

Rasa must be installed.

In /conversational run the following command to start the actions server.

### `rasa run actions`
To enable the actions server. The actions server must be up for either the shell or the whole application to work.

Then, in a seperate terminal,

### `rasa train`
to train a new model.

### `rasa shell`
to speak to the chatbot using the most recent model... or

### 'rasa run -m models --enable-api --cors "*" --debug'
To enable the rasa server for use with the application.

## Relevant files

domain.yml specifies intents, responses, and actions

data/nlu.yml contains sample statements for mapping statements to intents

data/stories.yml contains example stories of the path a conversation should take

data/rules.yml contains rules when a certain action should always follow an intent.

actions/actions.py is where we will interact with the backend.

config.yml specifies the pipeline. I've modified entity extraction to be CRF so that it can make inferences based on part-of-speech.
