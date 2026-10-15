# FemWise website

Static marketing site for the FemWise Android app by Team Aether: project overview, features,
architecture, screenshots and the APK download.

No build step. Plain HTML, CSS and JavaScript.

```
index.html        the page
css/style.css     styles (design tokens at the top)
js/main.js        nav, reveal animations, marquee, APK release link
assets/           app screenshots and illustration
downloads/        how the APK is published via GitHub Releases
```

## Run locally

```bash
python -m http.server 8080
```

Then open <http://localhost:8080>.

## Deploy

Upload the whole folder to any static host (GitHub Pages, Netlify, Vercel, Cloudflare Pages, or a
plain web server). Make sure the host serves `.apk` files with the
`application/vnd.android.package-archive` content type; most do by default.

## Editing

- Release version, size and download URL: the `APK` object at the top of `js/main.js`. The APK itself is a GitHub Release asset (see `downloads/README.md`).
- Colours, type scale and spacing: the `:root` block at the top of `css/style.css`.
- Screenshots: `assets/screens/`, referenced from the gallery and feature cards in `index.html`.
