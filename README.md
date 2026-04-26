# type/test — Typing Speed Test

A clean, minimal typing speed test built with vanilla HTML, CSS, and JavaScript. Features real-time WPM tracking, accuracy measurement, a countdown timer, and a local leaderboard.

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

---

## Features

- **Live WPM counter** — updates every second as you type
- **Accuracy tracking** — calculated as correct keystrokes ÷ total keystrokes
- **Animated countdown timer** — circular ring that shifts from yellow → orange → red as time runs out
- **Character-level feedback** — correct characters highlight, wrong characters turn red with a shake animation
- **Three time modes** — 30s, 60s, and 120s
- **Results screen** — shows WPM, accuracy, correct chars, error count, and a performance grade
- **Local leaderboard** — top 8 scores saved in `localStorage` and displayed after each test
- **Infinite word supply** — text auto-extends so you never run out of words mid-test

---

## Project Structure

```
typing-speed-test/
├── index.html    # HTML structure and layout
├── style.css     # Styles, animations, and CSS variables
└── script.js     # Game logic, WPM calculation, leaderboard
```

---

## Getting Started

No build tools, no dependencies, no installation needed.

1. Download or clone the project files
2. Make sure all three files are in the same folder
3. Open `index.html` in any modern browser

```bash
# Optional: serve locally with Python
python -m http.server 8000
# Then visit http://localhost:8000
```

---

## How to Play

1. Open `index.html` in your browser
2. Select a time mode — **30s**, **60s**, or **120s**
3. Click the text box or press any key to start the timer
4. Type the words shown — the timer begins on your first keystroke
5. Results appear automatically when time runs out
6. Hit **new test** to shuffle in fresh words, or **reset** to restart with the same settings

---

## WPM Calculation

Words per minute is calculated using the standard formula:

```
WPM = (correct characters / 5) / (elapsed time in minutes)
```

Dividing by 5 treats every 5 characters as one "word," which is the industry-standard approach used by sites like Monkeytype and TypeRacer.

---

## Performance Grades

| Grade | WPM Threshold |
|---|---|
| 🏆 Expert | 100+ WPM |
| ⚡ Advanced | 70–99 WPM |
| ✓ Intermediate | 50–69 WPM |
| ↗ Keep Practicing | Below 50 WPM |

---

## Tech Highlights

- **Zero dependencies** — pure vanilla JS, no frameworks or libraries
- **CSS custom properties** — entire theme controlled via `:root` variables
- **SVG timer ring** — animated with `stroke-dashoffset` for smooth progress
- **localStorage** — scores persist across browser sessions without a backend
- **Auto-extending text** — new words are appended on the fly so the test never cuts short

---

## Customization

**Change the color theme** — edit the CSS variables at the top of `style.css`:
```css
:root {
  --bg: #0d0d0f;
  --accent: #e8ff57;   /* change this to any highlight color */
  --error: #ff5f57;
  --correct: #57ffda;
}
```

**Add more words** — extend the `WORD_BANK` array at the top of `script.js`.

**Change default time** — update the `maxTime` initial value in `script.js`:
```js
let maxTime = 60; // change to 30 or 120
```

---

## Browser Support

Works in all modern browsers — Chrome, Firefox, Safari, and Edge. No polyfills required.

---

## License

This project is open source and free to use for personal and educational purposes.
