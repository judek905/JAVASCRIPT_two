# JavaScript Basics Demo

A simple web page demonstrating core JavaScript concepts: inline event handlers, external script linking, alerts, and basic conditional logic.

## Files

- **`index.html`** — The main HTML page. Contains two buttons: one with an inline `alert()`, and one that calls a function from an external script.
- **`external.js`** — Defines the `greet()` function, which is triggered by the "External Reference" button and shows a welcome alert.
- **`intro.js`** — A standalone script demonstrating variables, arithmetic, and `if/else` logic. Calculates a total from exam and coursework marks and logs a pass/retake message to the console.

## How to Run

1. Make sure all three files (`index.html`, `external.js`, `intro.js`) are in the same folder.
2. Open `index.html` in any web browser.
3. Click **"Click Me"** to see an inline alert.
4. Click **"External Reference"** to trigger the `greet()` function from `external.js`.

To see `intro.js` in action, open the file in a browser's developer console, or link it in `index.html` with:
```html
<script src="intro.js"></script>
```

## Notes

- `intro.js` is not currently linked in `index.html` — it runs independently. Add a `<script>` tag if you want its output in the browser console when the page loads.
- Marks in `intro.js` (`exam_marks`, `coursework_marks`) can be edited to test different pass/retake outcomes. The current pass threshold is a total of 50.
