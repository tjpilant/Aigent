import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm, File } from 'formidable';
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import { GoogleCloudVisionOCRTool } from '../../tools/GoogleCloudVisionOCRTool';
import { TesseractOCRTool } from '../../tools/TesseractOCRTool';

export const config = {
  api: {
    bodyParser: false,
  },
};

const OCR_RESULTS_DIR = process.env.OCR_RESULTS_DIR || path.join(process.cwd(), '..', 'ocr-results');
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Make sure to set this in production

function getCredentials() {
  if (process.env.AIOCR_AIGENT_JSON) {
    return JSON.parse(process.env.AIOCR_AIGENT_JSON);
  }
  
  const credFilePath = path.join(process.cwd(), 'google-cloud-key.json');
  if (fs.existsSync(credFilePath)) {
    return JSON.parse(fs.readFileSync(credFilePath, 'utf8'));
  }
  
  throw new Error('Google Cloud credentials not found. Please set AIOCR_AIGENT_JSON environment variable or provide google-cloud-key.json file.');
}

async function processFile(file: File, ocrMethod: string, credentials: any, processorId: string) {
  console.log('Processing file:', file.originalFilename);
  const inputFilePath = file.filepath;
  const originalFileName = file.originalFilename || 'unnamed';
  const sanitizedFileName = originalFileName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  const outputFileName = `${sanitizedFileName}_ocr_result.md`;
  const outputFilePath = path.join(OCR_RESULTS_DIR, outputFileName);

  let result: string;

  if (ocrMethod === 'google') {
    const ocrTool = new GoogleCloudVisionOCRTool({
      input_file_path: inputFilePath,
      output_md_file_path: outputFilePath,
      credentials_json: credentials,
      processor_id: processorId,
      project_id: credentials.project_id,
    });

    result = await ocrTool.run();
  } else if (ocrMethod === 'tesseract') {
    const ocrTool = new TesseractOCRTool();
    result = await ocrTool.processFile(inputFilePath, outputFilePath);
  } else {
    throw new Error('Invalid OCR method');
  }

  // Clean up the uploaded file
  fs.unlinkSync(inputFilePath);

  // Generate a token for secure file access
  const token = generateToken(outputFileName);

  return {
    result: `OCR processing complete for ${originalFileName}`,
    fileToken: token,
    originalFilename: originalFileName
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('OCR processing started');
  console.log('Current working directory:', process.cwd());
  console.log('OCR_RESULTS_DIR:', OCR_RESULTS_DIR);
  console.log('PROCESSOR_ID:', process.env.PROCESSOR_ID);

  if (req.method !== 'POST') {
    console.log('Invalid method:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const uploadDir = path.join(process.cwd(), '..', 'uploads');
  console.log('Upload directory:', uploadDir);
  
  try {
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
      console.log('Created upload directory');
    }
    if (!fs.existsSync(OCR_RESULTS_DIR)) {
      fs.mkdirSync(OCR_RESULTS_DIR, { recursive: true });
      console.log('Created OCR results directory');
    }
  } catch (error) {
    console.error('Error creating directories:', error);
    return res.status(500).json({ error: 'Failed to create necessary directories' });
  }

  const form = new IncomingForm({
    uploadDir: uploadDir,
    keepExtensions: true,
    multiples: true,
  });

  form.parse(req, async (err, fields, files) => {
    console.log('Form parsing started');
    if (err) {
      console.error('Error parsing form:', err);
      return res.status(500).json({ error: 'Error processing file upload' });
    }

    console.log('Fields:', fields);
    console.log('Files:', files);

    const ocrMethod = Array.isArray(fields.ocrMethod) ? fields.ocrMethod[0] : fields.ocrMethod;
    const uploadedFiles = Array.isArray(files.file) ? files.file : (files.file ? [files.file] : []);

    if (uploadedFiles.length === 0 || !ocrMethod) {
      console.log('Missing required fields');
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const credentials = getCredentials();
      const processorId = process.env.PROCESSOR_ID;
      if (!processorId) {
        throw new Error('Missing Google Cloud Processor ID (PROCESSOR_ID)');
      }

      console.log('Using Processor ID:', processorId);
      console.log('Using Project ID:', credentials.project_id);

      const results = await Promise.all(uploadedFiles.map(file => processFile(file, ocrMethod, credentials, processorId)));

      res.status(200).json({ results });
    } catch (error) {
      console.error('Error processing OCR:', error);
      if (error instanceof Error && error.message.includes('Document exceeds the 15-page limit')) {
        res.status(400).json({ error: 'One or more documents exceed the 15-page limit for OCR processing. Please upload smaller documents.' });
      } else {
        res.status(500).json({ error: 'Error processing OCR: ' + (error instanceof Error ? error.message : String(error)) });
      }
    }
  });
}

function generateToken(filename: string): string {
  return jwt.sign({ filename }, JWT_SECRET, { expiresIn: '1h' });
}
