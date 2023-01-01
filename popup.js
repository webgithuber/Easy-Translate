chrome.storage.local.get("text", function(fetchedData) {
    document.getElementById('result').innerHTML=fetchedData.text;
});