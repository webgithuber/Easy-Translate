var contextMenuItem = {
  id: "translate",
  title: "Easy Translate",
  contexts: ["selection"],
};
chrome.contextMenus.create(contextMenuItem, () => chrome.runtime.lastError);

chrome.contextMenus.onClicked.addListener((clickData) => {
  if (clickData.menuItemId == "translate" && clickData.selectionText) {
    text = clickData.selectionText;

    var res = text;
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(
      "https://script.google.com/macros/s/AKfycbypTZbtfuC9qgk83If-wJP7LfrbwQr6TmHYlvogtQzOm78Gc7ReYBjzNpXpU4lkzFMF/exec?q=" +
        text,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        var notification = {
          type: "basic",
          iconUrl: "icon48.png",
          title: "Easy Translated",
          message: JSON.parse(result).text,
        };

        chrome.notifications.create("", notification, function (id) {
          timer = setTimeout(function () {
            chrome.notifications.clear(id);
          }, 120000);

          chrome.storage.local.set({ text: JSON.parse(result).text });
        });
      })
      .catch((error) => console.log("error", error));
  }
});
