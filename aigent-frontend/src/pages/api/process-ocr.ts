import type { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm, Fields, Files } from "formidable";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";

export const config = {
  api: {
    bodyParser: false,
  },
};

const OCR_RESULTS_DIR = '/app/public/ocr-results';
const BACKEND_URL = 'http://backend:8000';
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const form = new IncomingForm({
      uploadDir: "/app/uploads",
      keepExtensions: true,
    });

    const { fields, files } = await new Promise<{
      fields: Fields;
      files: Files;
    }>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    if (!files.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    const ocrMethod = Array.isArray(fields.ocrMethod) ? fields.ocrMethod[0] : fields.ocrMethod || 'google';

    // Ensure directories exist
    fs.mkdirSync(OCR_RESULTS_DIR, { recursive: true });

    // Read file and convert to base64
    const fileContent = fs.readFileSync(file.filepath);
    const base64Content = fileContent.toString('base64');

    // Forward to backend
    const formData = new URLSearchParams();
    formData.append('fileContent', base64Content);
    formData.append('fileName', file.originalFilename || 'unnamed');
    formData.append('ocrMethod', ocrMethod);

    const backendResponse = await fetch(`${BACKEND_URL}/process-ocr`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    const backendResult = await backendResponse.json();

    if (!backendResponse.ok) {
      throw new Error(backendResult.error || 'Backend processing failed');
    }

    // Clean up temporary file
    try {
      fs.unlinkSync(file.filepath);
    } catch (error) {
      console.error('Error cleaning up temporary file:', error);
    }

    // Generate token for file access
    const outputFileName = `${path.parse(file.originalFilename || '').name}_aiocr.md`;
    const token = jwt.sign(
      { 
        filename: outputFileName,
        exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour
      },
      JWT_SECRET
    );

    res.status(200).json({
      success: true,
      result: backendResult.message,
      downloadUrl: token,
      filePath: backendResult.filePath,
      originalFilename: file.originalFilename
    });
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : "Error processing file" 
    });
  }
}
