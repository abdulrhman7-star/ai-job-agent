
import express from 'express';
import cors from 'cors';
import { getJobs, addJob } from './googleSheets.js';
import { generatePDF } from './generatePDF.js';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());

const pdfDir = path.join('.', 'pdfs');
if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir);

app.get('/api/search', async (req, res) => {
  try {
    const jobs = await getJobs();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/generate-pdf', async (req, res) => {
  try {
    const { job, applicant } = req.body;
    const pdfFile = await generatePDF(job, applicant);
    res.json({ file: pdfFile });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/add-job', async (req, res) => {
  try {
    const job = req.body;
    await addJob(job);
    res.json({ status: 'success' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
