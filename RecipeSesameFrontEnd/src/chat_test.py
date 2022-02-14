from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer
# Create a new chat bot named Charlie
chatbot = ChatBot('Charlie')
trainer = ListTrainer(chatbot)
trainer.train([
'Hi, can I help you?',
'Sure, I would like to book a flight to Iceland.',
'Your flight has been booked.'
])

response = chatbot.get_response('I would like to book a flight.')
