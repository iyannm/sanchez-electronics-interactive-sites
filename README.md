# Sanchez Electronics — Interactive Sites

A zero-backend, static website library for three classes at Simon A. Sanchez High School:

1. **IT Essentials** — first activity: [RAID Failure Lab](it-essentials/raid-lab/)
2. **Computer Networking** — course directory ready
3. **Cybersecurity** — course directory ready

**Simulation only.** Students answer on a separately hosted Google Form created by Apps Script, not on this website. The website never collects names, email addresses or submissions. It can run from local `index.html` files or from GitHub Pages.

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
├── apps-script/
│   ├── CreateCPUandRAIDForm.gs          # One-time Google Form + response Sheet creator
│   └── README.md                       # Step-by-step form setup
└── .github/workflows/pages.yml         # GitHub Pages deployment
```

## Publish on GitHub Pages

The user-facing site has **not** been published automatically. To deploy:

1. At https://github.com/new, create a **public** repository named `sanchez-electronics-interactive-sites`. Public avoids needing a paid plan for private-repo Pages hosting.
2. Extract this ZIP. Upload its **contents** into the repository root, keeping `.github/workflows/pages.yml` (the dot folder can be hidden by file managers).
3. Open repository **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Open **Actions** and verify the workflow `Publish Sanchez Electronics Sites` completed with a successful Pages deployment.
5. The actual live site URL will be displayed in GitHub Pages settings and the Actions deployment. Verify the URL there rather than assuming a published link.
6. In the website, open `IT Essentials → RAID failure lab` and test all six preset scenarios.

Note: GitHub repositories are public by default only if you choose Public. Do not upload student submissions or any student-identifying information.

## Set up the Google Form

See [`apps-script/README.md`](apps-script/README.md). Use the intended GDOE school Google account when executing Apps Script. The code creates one editable Google Form and one response spreadsheet. When executed again it detects the previously saved Form ID and does not recreate the questions.

After creation you can either:
- Post the student Form URL in Google Classroom; **no website edit needed**, or
- Paste the student URL into `assets/config.js` as the `formUrl` value and redeploy, so the RAID lab displays **Open answer form**.

## Lab rules

- Each diagram disk is 1 TB; this is a simplified learning model, not a performance benchmark.
- RAID 0: two-disk striping; no drive failure tolerated; usable 2 TB.
- RAID 1: two-disk mirroring; one drive may fail; usable 1 TB.
- RAID 5: four drives, distributed parity; one failed disk tolerated; usable 3 TB.
- RAID 10: four drives, two mirror pairs (1–2 and 3–4); usable 2 TB. Both disks in either pair failing destroys the array. One failed disk from each pair is survivable.
- RAID is not a substitute for backups.

## Test locally

Open `index.html` in a browser and follow course navigation, or run `python -m http.server 8000` from the repo root and open `http://localhost:8000`.
