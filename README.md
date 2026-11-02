# Cadence — Cycle, Intimacy & Psychobiology PWA (v2.0)

Cadence is a local-first, zero-noise Progressive Web Application designed with a warm, female-gaze editorial aesthetic. It translates psychoneuroendocrinology, symptothermal fertility biomarkers (BBT & cervical fluid), and intimacy tracking into calm visual geometry.

## Key Capabilities
- **Zero-Noise, Local-First Privacy**: Starts with a clean slate (no pre-populated clutter) and stores 100% of your data on-device in `localStorage`.
- **Cycle-Reactive Ambient Theme Engine**: Dynamically shifts subtle botanical tones and morphing SVG geometry across Menstrual (Terracotta Clay), Follicular (Spring Celadon), Ovulatory (Sunlit Marigold), and Luteal (Velvet Fig) phases in both Light and Dark modes.
- **Visual-First Information Design**:
  - **Sculptural Cycle Dial & Morphing Botanical Core**: Displays logged periods, predicted windows, ovulation peak, and intimacy markers on an interactive ring.
  - **6-Axis Somatosensory Petal Rose**: Instant non-verbal graphic readout of Energy, Calm (GABA-A), Verbal Focus, Desire/Libido, Social Bandwidth, and Rest Need.
  - **Dual Endocrine & Symptothermal Studio**: Interactive SVG curves for Estradiol ($E_2$), Progesterone ($P_4$), LH surge, Allopregnanolone, and waking Basal Body Temperature ($^\circ\text{F}$) + Cervical Fluid viscosity.
- **Intimacy, Libido & Biomarker Logging**: Track protected/unprotected sex, solo pleasure, spontaneous vs. responsive desire, orgasm, lubrication, dyspareunia/pelvic pain, cervical mucus, and OPK strips.
- **Multi-Profile & Granular JSON Portability**: Track yourself, a partner, or family members. Export/import individual profile `.json` files or full encrypted-ready vaults.

## Running & Installing Offline
1. Serve this folder over any static HTTP server (e.g., `python3 -m http.server 8080`) or host on GitHub Pages / Cloudflare Pages / Vercel.
2. Open in Safari (iOS) or Chrome (Android/Desktop) and select **Add to Home Screen** or **Install Cadence**.
3. The Service Worker (`sw.js`) caches all assets for full offline operation.
