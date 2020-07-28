with open('lib.js', 'w') as lib:
    with open('chunks.txt', 'r') as chunks:
        chunks_db = []
        for chunk in chunks:
            chunk = chunk.lower()
            chunk = chunk.strip()
            if chunk not in chunks_db:
                chunks_db.append(" " + chunk)
    js = """
    function chunks_lib() {
        let chunks = """ + str(chunks_db) + """;
        return chunks;
    }
    """
    lib.write(js)
