function cleanText(text) {
    text = text.toLowerCase();
    return text;
}

function analyze() {
    // Process input
    var input = cleanText(document.getElementById("inputText").value);
    // Mark chunks
    function markChunk(value, _, _) {
        input = input.replace(value, "<mark>" + value + "</mark>");
    };
    chunks_lib().forEach(markChunk);
    // Show result
    document.getElementById("resultText").innerHTML = input;
};