# Sanchez Electronics — Interactive Sites

A zero-backend, static website library for three classes at Simon A. Sanchez High School:

1. **IT Essentials** — [RAID Failure Lab](it-essentials/raid-lab/) ready
2. **Computer Networking** — course directory ready
3. **Cybersecurity** — [Wireless Network Visual Lab](cybersecurity/wireless-lab/) ready (Sections 5.1–5.2, five interactive diagrams)

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
├── apps-script/                         # Google Form creation script
└── DEPLOYMENT.md                        # GitHub Pages publishing guide
```



## Publish with GitHub Pages

The repository is public. In [Settings → Pages](https://github.com/iyannm/sanchez-electronics-interactive-sites/settings/pages), choose **Deploy from a branch**, then **main** and **/(root)**, and click **Save**. Once GitHub confirms publishing, use the **Visit site** link.

See [DEPLOYMENT.md](DEPLOYMENT.md) for details and the [Apps Script instructions](apps-script/README.md) to create a separate answer Form.

## Wireless Network Visual Lab (Cybersecurity 5.1–5.2)

Open [Cybersecurity → Wireless Network Visual Lab](cybersecurity/wireless-lab/). The site provides five projector-friendly diagram modes: client/AP discovery and association, CSMA/CA airtime, clickable 802.11 frame fields, managed wireless APs/WLCs, and WLAN threat scenarios. Each mode has steps, reset controls, and questions to discuss in class. This is a safe schematic simulation, not an operational network scanner or packet tool. No student information is collected.
