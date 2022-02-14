import spacy

nlp = spacy.load('en_core_web_md')

def get_keywords(message):
    doc = nlp(message)
    nouns = [token.lemma_ for token in doc if token.pos_ == "NOUN"]
    adjectives = [token.lemma_ for token in doc if token.pos_ == "ADJ"]

    all_words = nouns + adjectives

    return " ".join(all_words)