# Laivestyle

Store concept for [Laivestyle](https://instagram.com/laivestyle_) — site by [YRB Nova](https://yrbnova.com).

Plain HTML, CSS and JS. No build step.

**Deploy on Vercel:** vercel.com/new → Import `YRB1/laive-mockup` → Framework preset: Other → Deploy. Every push to `main` redeploys.

## Pages

- `index.html`. The 3D store intro (with or without sound), a campaign triptych, the Drop 01 grid with category filters, shop-by-category tiles, the store, and an email sign-up.
- `product.html?p=<id>`. Product page: gallery, colourways, sizes, add to bag.
- The bag drawer works across pages and shows a subtotal. Checkout is a stub until Shopify is connected.

The catalogue lives in `js/main.js` (`CAT`).

## Before going live

| What | Notes |
|---|---|
| Prices | £30–£75 placeholders in `CAT` |
| Product photos | Pages using Unsplash stock shots with the Laivestyle mark composited on (`assets/img/shop/`). Replace them with real product photography. |
| 3D store clips and theme music | Cut from a 592px screen recording. Swap in the original renders and the full track. |
| Sign-up and checkout | Connect to Shopify (customer form and cart) or Klaviyo |
| Drop date | `2026-12-05T18:00:00Z` in `js/main.js` and the top bar |

## Credits

The stock photos are from Unsplash and used under the Unsplash License, which allows free commercial use with no attribution required.
