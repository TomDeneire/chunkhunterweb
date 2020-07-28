function cleanText(text) {
    text = text.toLowerCase();
    return text;
}

function countChunks(text) {
    text = text.toLowerCase();
    return text;
}

function analyze() {
    // Process input
    var input = cleanText(document.getElementById("inputText").value);
    // Mark chunks, calculate stats
    var chunks = {};
    var freqMax = 0;
    var chunksTotal = 0;
    0;
    function processChunk(value, _, _) {
        chunksTotal = chunksTotal + 1;
        var re = new RegExp(value, 'g');
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
    };
    var textLength = input.split(' ').length;
    var chunkFrequency = chunkWords / textLength * 100;
    chunkFrequency = Math.round(chunkFrequency + Number.EPSILON);
    // Sort chunks length
    var chunksLength = "<ul>";
    var keys = Object.keys(chunks);
    keys.sort(function (a, b) { return b - a; });
    for (var i = 0; i < keys.length; i++) {
        chunksLength = chunksLength + "<li>" + keys[i] + " (" + keys[i].length + ")</li>";
    }
    chunksLength = chunksLength + "</ul>"
    // Sort chunks frequency
    var chunksFreq = "<ul>";
    for (var i = freqMax; i > 0; i--) {
        for (let key in chunks) {
            if (chunks[key] == i) {
                chunksFreq = chunksFreq + "<li>" + key + " (" + chunks[key] + ")</li>";
            }
        };

    }
    // Show results
    document.getElementById("resultText").innerHTML = input;
    document.getElementById("chunks").innerHTML = chunksLength;
    document.getElementById("chunksfreq").innerHTML = chunksFreq;
    document.getElementById("stats").innerHTML = `Frequency = ${chunkWords} chunk words / ${textLength} total words = ${chunkFrequency}%. Text checked against ${chunksTotal} registered combinations`;
};
