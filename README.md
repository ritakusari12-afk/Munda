# MUNDA — Textile Lighting Systems

A single-page marketing website for **MUNDA Textile Lichtsysteme GmbH**, a joint venture of
[AUNDE](https://www.aunde-group.com) and [MENTOR](https://www.mentor.de.com) that combines
technical textiles with LED-based lighting to create **textile lighting systems**.

Content and imagery are sourced from the official site [munda.tech](https://www.munda.tech/).

## Structure

```
index.html               Main page (all sections)
assets/
  css/style.css          Styling (dark "Alles Magenta" theme)
  js/main.js             Random hero background, nav, reveal-on-scroll
  img/
    logo/                Logos, partner logos, awards
    bg/                  Hero background images (rotated at random)
    projects/            Audi A3 + lighting-system project images
    tech/                Technology detail images
    team/                Team / contact photos
```

## Sections

- **Home** — logo over a randomly-selected background image
- **About** — the MUNDA story (AUNDE + MENTOR joint venture), partner profiles, quotes
- **Technology** — how textile light works (POF, lateral/axial coupling, LED modules)
- **Projects** — flagship Audi A3 Facelift 2024, project gallery, awards
- **Team** — managing directors and points of contact
- **Contact** + **footer**

## Run

Open `index.html` directly in any browser (no build step), or serve it locally:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000.
