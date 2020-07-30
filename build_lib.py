with open('lib.js', 'w') as lib:
    with open('chunks.txt', 'r') as chunks:
        chunks_db = []
        for chunk in chunks:
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
    # reverse sort to find longer chunks first

    def mySort(e):
        return len(e)
    chunks_db.sort(reverse=True, key=mySort)
    js = """
    function chunksDB() {
        let chunks = """ + str(chunks_db) + """;
        return chunks;
    }
    """
    lib.write(js)
