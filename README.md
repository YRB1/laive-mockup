# Laivestyle — Everything Under The Light

Concept website for [Laivestyle](https://instagram.com/laivestyle_), designed and built by **[YRB Nova](https://yrbnova.com)**.

It replaces the current locked Shopify password page with a pre-launch store for Drop 01.

## What's in it

- **Enter screen.** Visitors choose "Enter with sound" or "Enter quietly". Choosing sound starts the music, since browsers need a click before audio can play.
- **Music player.** A floating pill that fades the track in and out. It keeps the visitor's choice and position between pages.
- **Hero.** Animated light rays, a gold glow that follows the cursor, a looping Drop 01 film in an arched frame, and a countdown to the drop. On phones the film fills the screen behind the headline.
- **Drop 01 grid.** Hover zoom and a quick-view button on each piece.
- **Story section.** The words light up one by one as you scroll.
- **Lookbook.** Parallax photos.
- **Waitlist.** A form with three reasons to join and a thank-you state.
- **Instagram strip, footer and "Made by YRB Nova" credit.**
- **Product page** (`product.html`). Colour swap, size picker, zoom, a bag drawer that remembers items, and a sticky buy button on mobile.
- **Phones and accessibility.** Mobile menu, full-screen menu, and a still version for visitors who turn off motion on their device.

Plain HTML, CSS and JavaScript with no build step. Deploy the folder as-is to Vercel, Netlify or GitHub Pages.

## Swap before going live

| Placeholder | Replace with |
|---|---|
| `[PRICE]` | Real prices |
| Founder story (`#story`) | 2–3 lines from the founder |
| `data-drop` on the countdown (`index.html`) | Real drop date and time (UTC) |
| `assets/media/hero-film.mp4` | A real Reel or campaign clip, ideally 1080×1440 or larger |
| `assets/media/under-the-light.mp3` | Laivestyle's own track, if they have one. The current loop is an original instrumental made for this concept |
| Waitlist form (`js/main.js`, the `waitlist` section) | Shopify customer form or a Klaviyo list |
| Product photos | Original high-resolution photos. The current ones are cropped from Instagram |

## Structure

```
index.html       Home / pre-launch
product.html     Product page (Fitted Logo Tee)
css/style.css    All styles
js/main.js       Intro, music, countdown, reveals, bag, product logic
assets/img       Logo, photos, favicon, social preview image
assets/media     Hero film, music
```
