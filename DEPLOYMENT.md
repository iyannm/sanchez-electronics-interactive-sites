# Publish Sanchez Electronics Interactive Sites with GitHub Pages

**Repository:** https://github.com/iyannm/sanchez-electronics-interactive-sites  
**Visibility:** Public  
**Type:** Plain HTML, CSS, JavaScript (no build needed)

## Enable GitHub Pages

1. Open [Repository Settings → Pages](https://github.com/iyannm/sanchez-electronics-interactive-sites/settings/pages).
2. Under **Build and deployment**, set **Source → Deploy from a branch**.
3. Select **Branch: main** and **Folder: /(root)**.
4. Click **Save**.
5. Watch the deployment in the [Actions tab](https://github.com/iyannm/sanchez-electronics-interactive-sites/actions) or return to the Pages settings. When deployment succeeds, GitHub displays a **Visit site** link.
6. Check **Home → IT Essentials → RAID Failure Lab**, plus Networking and Cybersecurity.

Expected GitHub Pages URL pattern (do not share as live until GitHub confirms publishing):
`https://iyannm.github.io/sanchez-electronics-interactive-sites/`

Direct RAID path after successful deployment:
`https://iyannm.github.io/sanchez-electronics-interactive-sites/it-essentials/raid-lab/`

The repository already includes `index.html` at its root and relative asset paths. No GitHub Actions workflow, npm, or hosting provider beyond GitHub Pages is needed.

## Set up the separate answer Google Form

1. Use the school Google account and follow [apps-script/README.md](apps-script/README.md).
2. Run the existing [CreateCPUandRAIDForm.gs](apps-script/CreateCPUandRAIDForm.gs) from a Google Apps Script project. This creates the Form and response spreadsheet in Google Drive.
3. Copy the Form's **student respondent URL**, not the edit URL, into [assets/config.js](assets/config.js) as `formUrl`.
4. Commit the config change; the Pages site publishes the updated link.
5. Optionally add the verified RAID URL to `SE_FORM_CONFIG.RAID_LAB_URL` in Apps Script and run `updateRaidSimulatorLink()`.

The public website **does not collect or save student submissions**. Google Forms handles submission separately. Do not commit any private student information or response data to this public repository.

## Notes

- Changing the repository to **public** makes the source code publicly visible, not just the website.
- To check the live URL, use the **Visit site** link in Settings → Pages.
- If the site isn't accessible immediately after saving, check the Pages deployment run and status in GitHub Actions. GitHub says publishing can take several minutes.
- Official [GitHub Pages publishing source documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
