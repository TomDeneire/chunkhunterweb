var chunksCSV = "chunk, length, frequency\n"

function download(filename, text) {
    // https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function makeCSV() {
    return chunksCSV;
}

function cleanText(text) {
    text = text.toLowerCase();
    return text;
}

function analyze() {
    // PROCESS INPUT
    // add space to recognize chunk at start of text)
    var input = " " + cleanText(document.getElementById("inputText").value);
    // MARK CHUNKS, CALCULATE STATS
    var chunks = {};
    var freqMax = 0;
    var chunksTotal = 0;
    0;
    function processChunk(value, _, _) {
        chunksTotal = chunksTotal + 1;
        var re = new RegExp(value, 'g');
        // Replace value and keep case (= much slower)
        // var re = new RegExp(value, 'gi');
        input = input.replace(re, "<mark>" + value + "</mark>");
        var count = (input.match(re) || []).length;
        if (count != 0) {
            var chunk = value.trim();
            chunks[chunk] = count;
            if (count > freqMax) { freqMax = count };
        }
    };
    chunksDB().forEach(processChunk);
    var chunkWords = 0;
    for (let key in chunks) {
        chunkWords = chunkWords + (key.split(' ').length * chunks[key]);
        chunksCSV = chunksCSV + key + "," + key.trim().length + "," + chunks[key] + "\n";
    };
    var textLength = input.split(' ').length;
    var chunkFrequency = chunkWords / textLength * 100;
    chunkFrequency = Math.round(chunkFrequency + Number.EPSILON);
    // SORT CHUNKS (LENGTH)
    var chunksLength = "<ul>";
    var keys = Object.keys(chunks);
    keys.sort(function (a, b) { return b - a; });
    for (var i = 0; i < keys.length; i++) {
        chunksLength = chunksLength + "<li>" + keys[i] + " (" + keys[i].length + ")</li>";
    }
    chunksLength = chunksLength + "</ul>"
    // SORT CHUNKS (FREQUENCY)
    var chunksFreq = "<ul>";
    for (var i = freqMax; i > 0; i--) {
        for (let key in chunks) {
            if (chunks[key] == i) {
                chunksFreq = chunksFreq + "<li>" + key + " (" + chunks[key] + ")</li>";
            }
        };

    }
    // SHOW RESULTS
    document.getElementById("resultText").innerHTML = "<tt>" + input + "</tt>";
    document.getElementById("chunks").innerHTML = chunksLength;
    document.getElementById("chunksfreq").innerHTML = chunksFreq;
    document.getElementById("stats").innerHTML = `Frequency = ${chunkWords} chunk words / ${textLength} total words = ${chunkFrequency}%. Text checked against ${chunksTotal} registered combinations`;
    document.getElementById("results").style.visibility = 'visible';
};