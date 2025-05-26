document.getElementById("checkPage").addEventListener("click", () => {
  document.getElementById("status").innerText = "Scanning page...";

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    if (!tab || !tab.id) {
      console.error("No active tab found.");
      return;
    }

    // Inject content.js only on this page when user clicks
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        files: ["content.js"],
      },
      () => {
        // After injecting, send a message to trigger scanning
        chrome.tabs.sendMessage(
          tab.id,
          { action: "scanIngredients" },
          (response) => {
            const status = document.getElementById("status");

            if (chrome.runtime.lastError) {
              console.error("Message error:", chrome.runtime.lastError.message);
              status.textContent = "Could not scan page.";
              return;
            }

            if (response && response.foundIngredients.length > 0) {
              status.innerHTML = response.foundIngredients
                .map(
                  (item) =>
                    `<li><strong>${item.name}</strong>: ${
                      item.hazard || "Unknown risk"
                    }</li>`
                )
                .join("");
            } else {
              status.textContent = "No toxic ingredients found.";
            }
          }
        );
      }
    );
  });
});
