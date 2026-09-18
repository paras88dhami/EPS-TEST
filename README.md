# EPS-TOPIK Release v1

Static 40-question EPS-TOPIK practice site.

- Reading: 1–20
- Listening: 21–40
- 50-minute timer
- Question-by-question Korean browser TTS
- Two-play limit per listening question
- Text and image options
- Responsive UI
- No backend or external packages

## Run

```bash
python -m http.server 8000 --bind 127.0.0.1
```

Open `http://127.0.0.1:8000/`.

## Deploy

Push the folder to GitHub and enable GitHub Pages from the repository root.

## Add questions

- `data/reading.json`
- `data/listening.json`

All included questions and SVG illustrations are original practice content created for this project.
