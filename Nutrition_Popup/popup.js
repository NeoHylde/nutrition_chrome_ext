document.getElementById("checkPage").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length === 0) {
      console.error("❌ No active tab found!");
      return;
    }

    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ["content.js"],
    });
  });

  document.getElementById("status").innerText = "Scanning page...";
});
