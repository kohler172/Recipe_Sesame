from numpy import searchsorted
import spacy

nlp = spacy.load('en_core_web_md')

def get_keywords(message):
    doc = nlp(message)
    nouns = [chunk.text for chunk in doc.noun_chunks]
    adjectives = [token.lemma_ for token in doc if token.pos_ == "ADJ"]

    all_words = nouns + adjectives

    #modified to return a list for tracking current series of searches.
    return all_words
