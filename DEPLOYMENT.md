# Deploy Sanchez Electronics Interactive Sites

**Repository:** https://github.com/iyannm/sanchez-electronics-interactive-sites

## Recommended: Cloudflare Pages (private repository)

Cloudflare Pages supports connecting a **private GitHub repository** and automatically redeploying when the main branch changes. Cloudflare Pages Free supports static sites like this one.

1. Sign in to https://dash.cloudflare.com/
2. Open **Workers & Pages → Create application → Pages → Connect to Git**.
3. Select **GitHub**, authorize the Cloudflare Workers & Pages GitHub App, and grant it repository access. Prefer **Only select repositories**, selecting `iyannm/sanchez-electronics-interactive-sites`.
4. Choose that repository, then **Begin setup**.
5. Enter the following settings:

| Setting | Value |
| --- | --- |
| Project name | `sanchez-electronics-interactive-sites` (or any available name) |
| Production branch | `main` |
| Framework preset | None / no framework |
| Build command | Leave blank |
| Build output directory | `.` |
| Root directory | Repository root / leave default |

6. Click **Save and Deploy** and use the URL provided in Cloudflare after a successful deployment. Do not assume the guessed URL is live.
7. Test the library root and `/it-essentials/raid-lab/`, then check the RAID 0, 1, 5, and 10 failure scenarios.

**Privacy:** This deploys a **public website**, but the **GitHub source repository stays private**. No names, grades, student answers, emails, or other student records belong in site source. The simulator does not collect responses.

## Add the answer Form (separate Google service)

1. Use the school Google account to run the script in `apps-script/CreateCPUandRAIDForm.gs`. See [apps-script/README.md](apps-script/README.md).
2. The script creates one Form and a linked response Sheet on Google Drive, not in GitHub.
3. Copy the Form's respondent URL into `assets/config.js` as `formUrl`. Commit the change; Cloudflare redeploys it automatically.
4. If you want the form itself to include a simulator link, paste the **verified** `/it-essentials/raid-lab/` URL into `SE_FORM_CONFIG.RAID_LAB_URL` in Apps Script, then run `updateRaidSimulatorLink()`.

## Alternative: GitHub Pages

GitHub Pages from a **private** repository requires GitHub Pro, GitHub Team, or another qualifying paid tier. GitHub Free requires a **public** repository for GitHub Pages. Private source code should not be mistaken for a private published website.

Official docs:
- [Cloudflare Pages Git integration](https://developers.cloudflare.com/pages/get-started/git-integration/)
- [Cloudflare Pages GitHub integration](https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/)
- [GitHub Pages publishing sources](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
