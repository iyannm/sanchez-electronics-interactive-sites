# Create the Google Form using Apps Script

The HTML **simulator does not collect answers**. The Google Form collects all student CPU + RAID answers.

## One-time setup — school Google account

1. Sign in to the Google account that should **own the Form and response spreadsheet** (recommended: `imlugue@gdoe.net`).
2. Open https://script.google.com/home/projects/create.
3. Rename the Apps Script project to `Sanchez Electronics — CPU & RAID Answer Form`.
4. Replace the default `Code.gs` content with all the code in [`CreateCPUandRAIDForm.gs`](CreateCPUandRAIDForm.gs).
5. Save. Select **`createCpuRaidInvestigation`** in the function dropdown and click **Run**.
6. Approve the necessary Google permissions for Forms, Sheets, and Drive when prompted. School-admin security policies may prevent some actions; if so, ask school IT.
7. Open **Execution log**. Copy the `STUDENT RESPONSE URL`, `FORM EDIT URL`, and `RESPONSE SHEET` URL.
8. Verify the questions and sharing settings in the Form editor; enable or disable any school-only restriction required for your students.

The script creates a Drive folder named `Sanchez Electronics — Interactive Sites` and moves the new Form and response spreadsheet into it. The question set has student name, class period P1/P2/P3, Task Manager CPU fields, and open-response RAID 0/1/5/10 investigations.

## Link the Form and simulator

**Option A — easiest:** Post both links separately in Google Classroom (RAID lab URL + student response Form URL). The simulator already explains that answers are submitted in Classroom.

**Option B — one-link workflow:** Edit `assets/config.js` and replace the empty `formUrl: ''` with the actual **student respondent URL** from Apps Script, e.g.:

```js
window.SANCHEZ_CONFIG = Object.freeze({ formUrl: 'https://docs.google.com/forms/d/e/REAL_FORM_ID/viewform' });
```

Commit that change to GitHub. Students will now see **Open answer form** inside the RAID simulator. You can also update `RAID_LAB_URL` at the top of the Apps Script and run `updateRaidSimulatorLink()` to include the live simulator URL in the Form instructions.

## Avoid duplicate forms

Do **not** run from a new project every time. Reuse the same Apps Script project. The script keeps the Form ID in Script Properties and simply prints the existing link on subsequent runs. Run `showExistingLinks()` to retrieve it any time.

## Questions generated

- Student name and period (P1 / P2 / P3)
- CPU model, base speed, cores, logical processors, core vs. logical processor explanation
- RAID 0 capacity and failure outcome
- RAID 1 mirror capacity and failure outcome
- RAID 5 single vs. double failure and capacity
- RAID 10 failing disks 1+3 vs. 1+2
- School office choice between RAID 5 and RAID 10, including backup justification

No printing, no separate text-file downloads, no exit ticket. Responses are stored in Google Forms and the linked response Sheet. Questions are **not auto-graded** because explanations require teacher review.
