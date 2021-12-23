from nltk import pos_tag, word_tokenize
from whoosh.lang import morph_en


chunks_db = []
chunks_len = 0
with open('chunks.txt', 'r') as chunks:
    for line in chunks:
        chunks_len += 1

with open('lib.js', 'w') as lib:
    with open('chunks.txt', 'r') as chunks:
        for index, chunk in enumerate(chunks):
            if str(index)[-3:] == "000":
                print(f"Processing {index} of {chunks_len}")

            chunk = chunk.lower()
            chunk = chunk.strip()
            chars = '!"#$%&()*+,-/.:;<=>?@[\\]^_`{|}~'
            for char in chars:
                chunk = chunk.replace(char, '')
            # all punctuation will be turned into space
            # and account for "to me " (chunk) vs "to meet" (not chunk)
            chunk = " " + chunk + " "
            if chunk not in chunks_db:
                chunks_db.append(chunk)
            # variations of certain forms
            # codes = Penn-Treebank tagset
            chunk = chunk.strip()
            tokens = pos_tag(word_tokenize(chunk))
            for token in tokens:
                word, tag = token
                if tag in ["VB", "VV"]:
                    for variation in morph_en.variations(word):
                        newchunk = chunk.replace(word, variation)
                        newchunk = " " + newchunk + " "
                        if newchunk not in chunks_db:
                            chunks_db.append(newchunk)

    # reverse sort to find longer chunks first
    chunks_db.sort(reverse=True, key=lambda chunk: len(chunk))
    js = """
    function chunksDB() {
        return """ + str(chunks_db) + """;
    }
    """
    lib.write(js)
