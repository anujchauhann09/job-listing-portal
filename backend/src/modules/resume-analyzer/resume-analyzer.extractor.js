const fs = require('fs');
const { PDFParse } = require('pdf-parse');
const AdmZip = require('adm-zip');
const AppException = require('@/exceptions/app.exception');
const { HTTP_STATUS } = require('@/constants/http-status');
const { RESUME_ANALYZER_MESSAGES } = require('./resume-analyzer.constants');

const SUPPORTED_MIME_TYPES = {
  PDF:  'application/pdf',
  DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  DOC:  'application/msword',
};

function stripXml(xml) {
  return xml
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g,  '&')
    .replace(/&lt;/g,   '<')
    .replace(/&gt;/g,   '>')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g,    ' ')
    .trim();
}

async function extractFromPdf(data) {
  const parser = new PDFParse({ data });
  const result = await parser.getText();
  return result.text;
}

function extractFromDocx(data) {
  try {
    const zip = new AdmZip(data);
    const xml = zip.readAsText('word/document.xml');
    return stripXml(xml);
  } catch {
    return '';
  }
}

function extractFromDoc(data) {
  return data
    .toString('binary')
    .replace(/[^\x20-\x7E\n\r\t]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function extractText(file) {
  const { mimetype, path: filePath } = file;
  const data = await fs.promises.readFile(filePath);

  switch (mimetype) {
    case SUPPORTED_MIME_TYPES.PDF:
      return extractFromPdf(data);
    case SUPPORTED_MIME_TYPES.DOCX:
      return extractFromDocx(data);
    case SUPPORTED_MIME_TYPES.DOC:
      return extractFromDoc(data);
    default:
      throw new AppException({
        status: HTTP_STATUS.BAD_REQUEST,
        message: RESUME_ANALYZER_MESSAGES.INVALID_FILE,
      });
  }
}

module.exports = { extractText };
