
import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
  keyFile: 'credentials.json', // 🔹 ضع هنا مسار Service Account
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

const SPREADSHEET_ID = 'YOUR_SHEET_ID_HERE'; // 🔹 ضع هنا ID الشيت

export async function getJobs() {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: 'Sheet1!A:F',
  });
  return res.data.values.map((row, i) => ({
    id: i,
    title: row[0],
    company: row[1],
    country: row[2],
    city: row[3],
    link: row[4],
    hrEmail: row[5],
  }));
}

export async function addJob(job) {
  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: 'Sheet1!A:F',
    valueInputOption: 'RAW',
    requestBody: {
      values: [[job.title, job.company, job.country, job.city, job.link, job.hrEmail]],
    },
  });
}
