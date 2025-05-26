console.log("content.js is running!");

async function loadToxicIngredients() {
  try {
    const response = await fetch(chrome.runtime.getURL("data/data.json"));
    const data = await response.json();

    let toxicIngredients = {};
    data.forEach((entry) => {
      let ingredientName = entry["STATE OF CALIFORNIA"].toLowerCase();
      toxicIngredients[ingredientName] = entry[""];
    });

    return toxicIngredients;
  } catch (error) {
    console.error("Error loading JSON:", error); // Debugging errors
    return [];
  }
}

async function scanPageForIngredients() {
  let toxicIngredients = await loadToxicIngredients();

  let pageText = document.body.innerText.toLowerCase();
  let foundIngredients = [];

  Object.keys(toxicIngredients).forEach((ingredient) => {
    if (pageText.includes(ingredient)) {
      foundIngredients.push({
        name: ingredient,
        hazard: toxicIngredients[ingredient],
      });
      highlightIngredient(ingredient);
    }
  });
  if (foundIngredients.length > 0) {
    return foundIngredients;
  } else {
    console.log("No toxic ingredients found on this page.");
  }
}

function highlightIngredient(ingredient) {
  let elements = document.querySelectorAll("*");

  elements.forEach((element) => {
    // Skip input fields, textareas, and other form elements
    if (
      element.tagName === "INPUT" ||
      element.tagName === "TEXTAREA" ||
      element.tagName === "SELECT" ||
      element.tagName === "TITLE" ||
      element.isContentEditable
    ) {
      return;
    }

    // Highlights all matching ingredients
    if (
      element.children.length === 0 &&
      element.innerHTML.includes(ingredient)
    ) {
      element.innerHTML = element.innerHTML.replace(
        new RegExp(ingredient, "gi"),
        `<span style="background-color: yellow; color: red; font-weight: bold;" title="Potential Risk">${ingredient}</span>`
      );
    }
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "scanIngredients") {
    scanPageForIngredients().then((foundIngredients) => {
      sendResponse({ foundIngredients });
    });
    return true; // Keeps the message channel open for async response
  }
});

scanPageForIngredients();
