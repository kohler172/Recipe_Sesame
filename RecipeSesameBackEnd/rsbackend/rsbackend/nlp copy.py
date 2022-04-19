import spacy
from negspacy.negation import Negex
from negspacy.termsets import termset
nlp = spacy.load('en_core_web_md')
# ts = termset("en")
# print(ts.get_patterns())

#doc = nlp("There is no headache.")
# for e in doc.ents:
#     print(e.text, e._.negex)