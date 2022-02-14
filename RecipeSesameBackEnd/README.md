# RecipeSesameBackEnd
This is the backend for our Recipe Sesame project.

## Requirements

You will need to have <b>Django</b>, <b>Django REST</b>, <b>spaCy</b>, and <b>the Elasticsearch Python client</b> installed.

## Setup
To begin, we will install Docker and start Elasticsearch. To do this, follow the instructions under the "Self-managed" tab under "Run Elasticsearch" here:

https://www.elastic.co/guide/en/elasticsearch/reference/current/getting-started.html

Now, Elasticsearch should be running. Next, you'll need to download the dataset here:

https://www.kaggle.com/pes12017000148/food-ingredients-and-recipe-dataset-with-images

This link includes a .csv file and a folder of images. You will need to modify the .csv file to use it in this project. Open the .csv file using Excel, Numbers, etc.
Delete the <b>entire first column</b> and <b>rename</b> the file to <b>dataset_trimmed.csv</b>. Move the renamed file to the rsbackend folder in this repo (<b>NOT</b>
the inner rsbackend folder). To populate Elasticsearch, open a terminal and navigate to the /RecipeSesameBackEnd/rsbackend directory and run:

### `python3 populate_index.py`

Now, the backend should be ready to go. In your terminal, navigate back to the /RecipeSesameBackEnd directory and run:

### `python manage.py runserver`

## API

- /message/
  - POST request with one field in its body - "message", containing the user's message to the chatbot.
  - Extracts keywords and performs an elasticsearch, returning all results.
- /random/
  - GET request
  - Returns n random recipes, where n is set in rsbackend/rsbackend/views.py.
