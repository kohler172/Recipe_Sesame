import spacy
from negspacy.negation import Negex
from negspacy.termsets import termset

ts = termset("en")

nlp = spacy.load("en_core_web_md")
nlp.add_pipe(
    "negex",
		config={"ent_types":["NOUN"]}
)
doc = nlp("I do not like fish but I love bread")
nouns = [token.lemma_ for token in doc if token.pos_ == "NOUN"]

for token in nouns:
	print(token, token._.negex)
