# Firishtah Ghyara — portfolio site

A static multi-page portfolio designed for GitHub Pages. No build step is required.

## Files

- `index.html` — cinematic home/landing page
- `about.html` — about page, education and contact
- `locations.html` — interactive Leaflet map of Mumbai, London and Singapore
- `projects.html` — searchable/filterable project library
- `styles.css` — shared responsive design system
- `script.js` — navigation, animation, project filters, profile photo fallback and map interactions
- `assets/` — place your portrait here

## Publish on GitHub Pages

1. Upload all files and the `assets` folder into the root of your portfolio repository (`firishtah123/Portfolio`).
2. In GitHub, open **Settings → Pages** and confirm deployment is from your intended branch (typically `main`, folder `/root`).
3. Wait for the deployment to finish, then open `https://firishtah123.github.io/Portfolio/`.

## Add your portrait

Upload your photo as `assets/firishtah.jpg`. The About page will detect it automatically. Use a portrait image you have permission to publish.

## Customisation notes

- Project card descriptions and outbound links are in `projects.html`; links are deliberately tied to the supplied report/notebook/repository URLs.
- The HDFC Bank section is a high-level, public-safe summary and intentionally omits confidential code, documents and customer data.
- A 90.04% model result and 20,000+ transaction metric were supplied in the portfolio brief; verify exact scope, denominator, test split and definition before publishing as formal performance claims.
- The Earth/landscape photographs and map tiles are loaded from external providers, so the site needs an internet connection. If a photo URL changes, replace its URL in `styles.css`.
- The location markers show professional locations; no underlying risk layer or customer-location data is invented.
