/**
 * Sanchez Electronics — IT Essentials Section 3.3
 * Creates the ONE answer Form (CPU + RAID Investigation) plus a response Sheet.
 *
 * Run createCpuRaidInvestigation() manually under the intended school Google account.
 * The script stores form/sheet IDs to avoid accidental duplicate creation.
 */
const SE_FORM_CONFIG = {
  FORM_TITLE: 'IT Essentials 3.3 — CPU & RAID Investigation',
  RESPONSE_SHEET_TITLE: 'Sanchez Electronics | IT Essentials 3.3 | CPU & RAID Responses',
  DRIVE_FOLDER_NAME: 'Sanchez Electronics — Interactive Sites',
  // Paste the real GitHub Pages RAID lab URL *after* GitHub Pages is live.
  // Until then, students can open the lab link from Classroom instead.
  RAID_LAB_URL: ''
};

function createCpuRaidInvestigation() {
  const properties = PropertiesService.getScriptProperties();
  const existingId = properties.getProperty('SE_CPU_RAID_FORM_ID');
  if (existingId) {
    try {
      const existing = FormApp.openById(existingId);
      Logger.log('Form already exists. No duplicate created.');
      Logger.log('EDIT: ' + existing.getEditUrl());
      Logger.log('STUDENT: ' + existing.getPublishedUrl());
      return;
    } catch (error) {
      throw new Error('A saved Form ID was found but cannot be opened. Do not rerun blindly. Check access or clear the Script Property SE_CPU_RAID_FORM_ID manually after verification. ' + error);
    }
  }

  const form = FormApp.create(SE_FORM_CONFIG.FORM_TITLE);
  // Save the ID early, so rerunning after a later error won't create another form.
  properties.setProperty('SE_CPU_RAID_FORM_ID', form.getId());
  form.setDescription([
    'Complete the investigation using the lab computer and the RAID simulator.',
    SE_FORM_CONFIG.RAID_LAB_URL ? 'RAID simulator: ' + SE_FORM_CONFIG.RAID_LAB_URL : 'Open the RAID simulator from Google Classroom.',
    'Record the actual CPU information from your own lab PC. Use the RAID simulator to test failure scenarios.',
    'Submit all answers in this form. No printed worksheet is required.'
  ].join('\n\n'));
  form.setIsQuiz(false);
  form.setProgressBar(true);
  form.setConfirmationMessage('Your CPU + RAID investigation has been submitted.');
  form.setAcceptingResponses(true);

  form.addSectionHeaderItem().setTitle('Student details')
    .setHelpText('Use your real class period.');
  form.addTextItem().setTitle('Full name').setRequired(true);
  form.addListItem().setTitle('IT Essentials class period')
    .setChoiceValues(['P1', 'P2', 'P3']).setRequired(true);

  form.addPageBreakItem().setTitle('Part A — Investigate your CPU')
    .setHelpText('Press Ctrl + Shift + Esc → Performance → CPU. Record what your computer displays.');
  shortAnswer_(form, '1. Exact CPU model', 'Example: Intel Core i5-12400. Use the model shown on your own PC.');
  shortAnswer_(form, '2. Base speed in GHz', 'If unavailable, enter Not available.');
  shortAnswer_(form, '3. Number of physical cores', 'Do not confuse cores with logical processors.');
  shortAnswer_(form, '4. Number of logical processors', 'If unavailable, enter Not available.');
  paragraph_(form, '5. Explain the difference between physical CPU cores and logical processors.', 'Use your own words and reference what you found on the computer.');

  form.addPageBreakItem().setTitle('Part B — RAID failure investigation')
    .setHelpText('Use the Sanchez Electronics RAID simulator. Test each required configuration before answering. Each drive has 1 TB capacity.');
  paragraph_(form, '6. RAID 0: With two 1 TB drives, how much storage is usable? What happens when one drive fails?', 'Test RAID 0 with one drive failed. Explain the result.');
  paragraph_(form, '7. RAID 1: Why do two 1 TB drives provide only 1 TB of usable capacity? What happens when one fails?', 'Test RAID 1 with one drive failed.');
  paragraph_(form, '8. RAID 5: With four 1 TB drives, how much storage is usable? Compare the results of one drive failure and two drive failures.', 'Use both RAID 5 preset tests. Explain what parity changes.');
  paragraph_(form, '9. RAID 10: Test failures of drives 1 and 3, then reset and test failures of drives 1 and 2. Why are the results different?', 'Describe the mirrored-pair rule, not just which test succeeded.');
  paragraph_(form, '10. A school office has four 1 TB drives for important records. Recommend RAID 5 or RAID 10, compare capacity and failure tolerance, and explain why it still needs separate backups.', 'Give a justified technician recommendation.');

  const sheet = SpreadsheetApp.create(SE_FORM_CONFIG.RESPONSE_SHEET_TITLE);
  properties.setProperty('SE_CPU_RAID_RESPONSE_SHEET_ID', sheet.getId());
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  // Organize these two files in a dedicated school-Drive folder.
  const existingFolders = DriveApp.getFoldersByName(SE_FORM_CONFIG.DRIVE_FOLDER_NAME);
  const folder = existingFolders.hasNext() ? existingFolders.next() : DriveApp.createFolder(SE_FORM_CONFIG.DRIVE_FOLDER_NAME);
  DriveApp.getFileById(form.getId()).moveTo(folder);
  DriveApp.getFileById(sheet.getId()).moveTo(folder);

  Logger.log('CREATED successfully.');
  Logger.log('FORM EDIT URL: ' + form.getEditUrl());
  Logger.log('STUDENT RESPONSE URL: ' + form.getPublishedUrl());
  Logger.log('RESPONSE SHEET: ' + sheet.getUrl());
  Logger.log('Paste the STUDENT RESPONSE URL into assets/config.js as the formUrl value, or post it in Classroom.');
}

/** Update description on existing Form once the public RAID lab URL is known. */
function updateRaidSimulatorLink() {
  const id = PropertiesService.getScriptProperties().getProperty('SE_CPU_RAID_FORM_ID');
  if (!id) throw new Error('Run createCpuRaidInvestigation() first.');
  if (!/^https:\/\//.test(SE_FORM_CONFIG.RAID_LAB_URL)) throw new Error('First paste the published RAID lab HTTPS URL into SE_FORM_CONFIG.RAID_LAB_URL.');
  const form = FormApp.openById(id);
  form.setDescription('Part A: inspect your computer in Task Manager → Performance → CPU.\n\nPart B: open the simulator at ' + SE_FORM_CONFIG.RAID_LAB_URL + '\n\nSubmit your answers in this Google Form.');
  Logger.log('Updated Form description. Student URL: ' + form.getPublishedUrl());
}

/** Reprint the existing file links without making changes. */
function showExistingLinks() {
  const p = PropertiesService.getScriptProperties();
  const id = p.getProperty('SE_CPU_RAID_FORM_ID');
  if (!id) throw new Error('Run createCpuRaidInvestigation() first.');
  const form = FormApp.openById(id);
  Logger.log('EDIT: ' + form.getEditUrl());
  Logger.log('STUDENT: ' + form.getPublishedUrl());
  const sheetId = p.getProperty('SE_CPU_RAID_RESPONSE_SHEET_ID');
  if (sheetId) Logger.log('RESPONSES: ' + SpreadsheetApp.openById(sheetId).getUrl());
}

function shortAnswer_(form, title, help) {
  form.addTextItem().setTitle(title).setHelpText(help).setRequired(true);
}
function paragraph_(form, title, help) {
  form.addParagraphTextItem().setTitle(title).setHelpText(help).setRequired(true);
}
