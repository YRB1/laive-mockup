# Laivestyle — store concept

Full store concept for [Laivestyle](https://instagram.com/laivestyle_), designed and built by [YRB Nova](https://yrbnova.com).

Plain HTML, CSS and JS. No build step.

**Deploy on Vercel:** vercel.com/new → Import `YRB1/laive-mockup` → Framework preset: Other → Deploy. Every push to `main` redeploys.

## Pages
`index` (home) · `shop` (filters and sort) · `product?p=<id>` · `lookbook` · `about` · `faq` (delivery, returns, size guide) · `contact` · `policies`

## Features
- **Intro:** a custom light-beam sequence. The hand mark pours in under a light beam with a loading counter, then "Enter". The tagline plays word by word and a white flash wipes into the site. Music plays here only, then fades out.
- **Home hero:** an always-playing, always-muted campaign film (16:9 on desktop, 9:16 on phones).
- **Sliders:** New in, Bestsellers, Reviews, Complete the look, Recently viewed.
- **Shopping:** quick-add on product cards, wishlist, search, a bag drawer with a free-delivery progress bar and Klarna split, colourways, a size guide modal, low-stock hints and a sticky add-to-bag on mobile.
- **Site-wide:** announcement bar, mega menu, mobile menu, cookie banner, newsletter sign-up, social feed (Instagram and TikTok), payment badges and currency selector.

The catalogue and sample reviews are in `js/main.js` (`CAT`, `REVIEWS`).

## Placeholders to replace before launch
| Item | Notes |
|---|---|
| Prices, fabric weights, delivery rates, 10% sign-up offer | Concept values. Confirm with Laivestyle |
| Reviews | Every card is labelled **Sample**. Replace with real reviews after Drop 01 (Judge.me, or Shopify's own) |
| TikTok, X and YouTube links | `#`. Only Instagram is real |
| Product imagery | `assets/img/ai/` is AI-generated (FLUX) and `assets/img/shop/` is Unsplash stock, both with the Laivestyle mark composited on. Replace with real product photography |
| Founder story, email, policies | Marked with `[...]` |
| Checkout, sign-up and contact forms | Front-end only. Connect to Shopify or Klaviyo |
| 3D store clips and theme music | Cut from a 592px screen recording. Swap in the original renders and the full track |

## Credits
Stock photos from Unsplash, used under the Unsplash License.
