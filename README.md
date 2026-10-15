# FemWise website

Static marketing site for the FemWise Android app by Team Aether: project overview, features,
architecture, screenshots and the APK download.

No build step. Plain HTML, CSS and JavaScript.

```
index.html        the page
css/style.css     styles (design tokens at the top)
js/main.js        nav, reveal animations, marquee, APK availability check
assets/           app screenshots and illustration
downloads/        put femwise.apk here (see downloads/README.md)
```

## Run locally

```bash
python -m http.server 8080
```

Then open <http://localhost:8080>. Serve it over HTTP rather than opening the file directly, so the
APK size check and the download link work the same way they will in production.

## Deploy

Upload the whole folder to any static host (GitHub Pages, Netlify, Vercel, Cloudflare Pages, or a
plain web server). Make sure the host serves `.apk` files with the
`application/vnd.android.package-archive` content type; most do by default.

## Editing

- Release version and APK path: the `APK` object at the top of `js/main.js`.
- Colours, type scale and spacing: the `:root` block at the top of `css/style.css`.
- Screenshots: `assets/screens/`, referenced from the gallery and feature cards in `index.html`.
