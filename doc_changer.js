chrome.action.onClicked.addListener((tab) => {
  chrome.windows.create({
    url: chrome.runtime.getURL("popup.html"),
    type: "popup",
    width: 600,
    height: 100
  });
});

function switchToJapanese(currentUrl, callback) {
  var newUrl = currentUrl.replace(/(\/\/[^\/]*)/, '$1/ja_jp');
  chrome.history.addUrl({url: currentUrl}, function() {
    chrome.tabs.update({url: newUrl}, callback);
  });
}

document.addEventListener("DOMContentLoaded", function() {
  const yesButton = document.getElementById("yesButton");
  const noButton = document.getElementById("noButton");

  yesButton.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      var currentUrl = tabs[0].url;
      switchToJapanese(currentUrl, function() {
        window.close();
      });
    });
  });

  noButton.addEventListener("click", () => {
    window.close();
  });
});

