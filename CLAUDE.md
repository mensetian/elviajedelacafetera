# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"El viaje de la Cafetera" is a static single-page web application (Spanish-language interactive travel blog) documenting a motorcycle journey across South America. It uses **vanilla HTML/CSS/JavaScript** with no framework, build tools, or package manager.

## Deployment

There is no build step. The site deploys via FTP using the VS Code SFTP extension (configured in `.vscode/sftp.json`) to `ftp.conmenas.com`. To "run" locally, open `index.html` directly in a browser or use any static file server.

## Architecture

### Core Files

| File | Role |
|------|------|
| `index.html` | Single HTML document (~566 lines); contains all markup and inline SVGs |
| `styles.css` | All styles (~2,825 lines); no preprocessor |
| `scripts.js` | Main interactive logic (~620 lines) |
| `video_controller.js` | YouTube iframe API integration (~157 lines) |

`scripts_noop.js` and `scripts - Copy.js` are legacy/backup files — not loaded by the page.

### Data

Country video data lives in `videos_data/<CC>.json` (one file per country: AR, BO, BR, CL, CO, EC, PE, PY, UY). These are loaded on-demand when a user opens a country modal.

### Scroll Animation System (`scripts.js`)

The page has three distinct visual states driven by scroll position:

- **Top state** (`applyTopStyles`): Full-size map, bike stationary
- **Middle state** (`updateScrollStyles`): Bike rotates/scales, world shrinks, clouds parallax
- **Bottom state** (`applyBottomStyles`): Zoomed-out final layout

All animation constants (rotation angles, scale multipliers, thresholds) are centralized in the `CONSTS` object at the top of `scripts.js`. Animation updates are scheduled via `requestAnimationFrame` through `scheduleUpdate()`.

### Modal Video Player (`video_controller.js`)

Opens when a country is clicked on the SVG map. Loads country JSON, generates a video grid with YouTube thumbnails, and initializes the YouTube iframe API on demand. Falls back to "PROXIMAMENTE..." if no videos are configured.

### Key Interaction Patterns

- Touch events use a `TOUCH_DELAY` (350ms) to distinguish taps from scrolls — see `attachModalOpenHandler()`
- Dark mode ("noche") is toggled by clicking the lamp on the bike SVG; it adds/removes the `.noche` class on `<body>` and shows/hides stars
- `localStorage` tracks first-time visitors to control intro animation playback

### Assets

- `fonts/` — Custom webfonts (WOFF2): RoadPixel, 04b30, GetShow, ARI
- `imgs/flags/` — Country flag SVGs and PNGs
- `imgs/socials/` — Social media icons
