# Sanchez Electronics — Interactive Sites

A zero-backend, static website library for three classes at Simon A. Sanchez High School:

1. **IT Essentials** - course directory ready
2. **Computer Networking** — course directory ready
3. **Cybersecurity** — course directory ready

**Simulation only.** Students answer on a separately hosted Google Form, not on this website. The website never collects names, email addresses or submissions. It can run from local `index.html` files or from GitHub Pages.

## Repository structure

```text
sanchez-electronics-interactive-sites/
├── index.html                          # Landing page, three course tiles
├── assets/
│   ├── styles.css                      # Shared minimal design
│   ├── config.js                       # Optional Google Forms student URL
│   └── raid.js                         # Interactive RAID model
├── it-essentials/
│   ├── index.html                      # IT Essentials activity library
│   └── raid-lab/index.html             # RAID 0 / 1 / 5 / 10 simulator
├── networking/index.html              # Future Networking labs
├── cybersecurity/index.html           # Future Cybersecurity labs
└── .github/workflows/pages.yml         # GitHub Pages deployment
```


