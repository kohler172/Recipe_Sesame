Five things must be open for the project to work.
Assuming you aren't using docker for ElasticSearch...

Terminal 1: Start ElasticSearch
### From your locally installed ElasticSearch folder
### `./bin/elasticsearch`

Terminal 2: Start react / the front end
### `cd RecipeSesameFrontEnd`
### `npm start`

Terminal 3: Start the backend server
### `cd RecipeSesameBackEnd`
### `python3 manage.py runserver`

Terminal 4: Start the Rasa actions server
### `cd conversational`
### `rasa run actions`

Terminal 5: Start the latest Rasa model as an API
### `cd conversational`
### `rasa run -m models --enable-api --cors "*" --debug`
