# nutrition_chrome_ext

# Nutrition Ingredient Checker

## Overview

The **Nutrition Ingredient Checker** is a Chrome extension designed to scan web pages for toxic ingredients listed under California Proposition 65. It allows users to check product ingredients and receive warnings if any harmful substances are detected.

## Features

- Scans web pages for toxic ingredients from **Proposition 65 list**.
- Displays alerts when hazardous ingredients are detected.
- Provides details on the associated health risks.
- User-friendly popup interface for manual scanning.

## Installation

1. **Download the extension files**.
2. **Open Chrome** and navigate to `chrome://extensions/`.
3. **Enable Developer Mode** (toggle switch in the top right corner).
4. **Click "Load unpacked"** and select the folder containing the extension files.
5. The **Nutrition Ingredient Checker** will now be available in your extensions toolbar.

## How It Works

1. **Automatic Scan**: When a page is loaded, the extension scans its text for any listed toxic ingredients.
2. **Manual Scan**: Click the extension icon and press the **Scan Ingredients** button.
3. **Results Displayed**:
   - If toxic ingredients are found, their names and hazards are displayed.
   - If no toxic ingredients are detected, a green checkmark appears.

## Files & Structure

- `manifest.json`: Defines extension settings and permissions.
- `popup.html`: The user interface for the extension.
- `popup.js`: Handles user interactions within the popup.
- `content.js`: The script that scans web pages for toxic ingredients.
- `data.json`: Contains the list of toxic ingredients and associated risks.
- `styles.css`: Defines the styling for the extension's popup.

## Permissions

- **Active Tab**: Required to scan the current webpage.
- **Storage**: Used to store found ingredients temporarily.
- **Scripting**: Enables execution of the content script on web pages.

## Known Issues

- The extension currently scans plain text but does not process images or embedded PDFs.
- Some pages may have dynamically loaded content that requires re-scanning.

## Future Improvements

- Support for ingredient input by users.
- More detailed risk analysis and alternative recommendations.

## License

This project is licensed under the MIT License.

## Contact

For questions or contributions, contact **neo.hyldelund@gmail.com**.

###
