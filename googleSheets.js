import { google } from 'googleapis';

const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

// ضع هنا ID الشيت
const SPREADSHEET_ID = '1_ot6ypnAAXKOayrZNvbhnWTTkGRmBRfZ8W0M7ZL5sJ0';

// جلب كل الوظائف
export async function getJobs() {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: 'Sheet1!A:F',
  });
  if (!res.data.values) return [];
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

// إضافة وظيفة جديدة
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
