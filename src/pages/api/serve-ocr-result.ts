import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';

const OCR_RESULTS_DIR = process.env.OCR_RESULTS_DIR || path.join(process.cwd(), '..', 'ocr-results');
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Make sure to set this in production

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { filename, token } = req.query;

  if (!filename || typeof filename !== 'string' || !token || typeof token !== 'string') {
    return res.status(400).json({ error: 'Invalid filename or token' });
  }

  try {
    // Verify the token
    const decodedToken = jwt.verify(token, JWT_SECRET) as { filename: string };
    
    if (decodedToken.filename !== filename) {
      return res.status(400).json({ error: 'Token does not match filename' });
    }

    // Prevent directory traversal
    const sanitizedFilename = path.basename(filename);
    const filePath = path.join(OCR_RESULTS_DIR, sanitizedFilename);

    // Check if file exists and is within the OCR_RESULTS_DIR
    if (!fs.existsSync(filePath) || !filePath.startsWith(OCR_RESULTS_DIR)) {
      return res.status(404).json({ error: 'File not found' });
    }

    const fileContent = await fs.promises.readFile(filePath, 'utf8');
    res.setHeader('Content-Type', 'text/markdown');
    res.setHeader('Content-Disposition', `attachment; filename="${sanitizedFilename}"`);
    res.send(fileContent);
  } catch (error) {
    console.error('Error serving OCR result:', error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    res.status(500).json({ error: 'Error serving OCR result' });
  }
}
