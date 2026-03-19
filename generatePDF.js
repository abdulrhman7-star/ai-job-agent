
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export async function generatePDF(job, applicant) {
  const fileName = `CoverLetter_${job.title.replace(/\s/g, '_')}_${Date.now()}.pdf`;
  const filePath = path.join('.', 'pdfs', fileName);

  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filePath));

  const coverLetter = `Dear ${job.company},

I am applying for the position of ${job.title} in ${job.city}, ${job.country}.
My skills and experience perfectly match the requirements of this role.

Sincerely,
${applicant.name}`;

  doc.text(coverLetter, { align: 'left' });
  doc.end();

  return fileName;
}
