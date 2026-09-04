# colourhand.

**A simple interactive random color generator with spring animations · TypeScript · Motion · Bun**

Generate a shade, watch it paint the whole scene in real time, copy HEX/RGB/HSL instantly.

🔗 **Live:** [colourhand.com](https://colourhand.com)

![Colourhand preview](./docs/demo.gif)

## Features

- 🎨 Random color generation with a curated HSL range (no muddy or blown-out shades)
- 📋 One-click copy to clipboard (HEX)
- 🕘 Color history with clickable swatches

## Tech stack

| Layer              | Choice                             |
| ------------------ | ---------------------------------- |
| Language           | TypeScript@7.0.2                   |
| Build tool         | Vite                               |
| Animation          | [Motion](https://motion.dev)       |
| Package manager    | Bun                                |
| Linter / Formatter | Biome                              |
| Testing            | Vitest                             |
| Deployment         | Cloudflare Workers (static assets) |

## Getting started

```bash
git clone https://github.com/bytestoryofficial/colourhand.git
cd colourhand
bun install
bun run dev
```

Open `http://localhost:5173`.

## Scripts

```bash
bun run dev      # start dev server
bun run build    # type-check + production build
bun run test     # run unit tests (Vitest)
bun run lint     # Biome check
```

## Architecture notes

- **Contrast, not blending** — every piece of UI text computes its own ink color via relative luminance rather than relying on `mix-blend-mode`, which broke down whenever a decorative layer (dot-grid, cursor spotlight) sat behind the text.
- **Motion values over ad-hoc state** — cursor-driven effects (dot spotlight, hand parallax) use Motion's `motionValue()` with `.on('change', ...)` subscriptions rather than animating plain objects, since `onUpdate` is only reliably supported for single-value animations.
- **Reduced motion handled explicitly** — every animated entry point checks `prefers-reduced-motion` and swaps to an instant, non-animated state.

## Deployment

Deployed as a static Worker on Cloudflare (Workers Static Assets), fronted by Cloudflare DNS with automatic TLS.

## License

MIT
