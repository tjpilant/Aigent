import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';

const OCR_RESULTS_DIR = '/app/public/ocr-results';
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token } = req.query;

  if (!token || typeof token !== 'string') {
    return res.status(400).json({ error: 'Token is required' });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, JWT_SECRET) as { filename: string };
    const filePath = path.join(OCR_RESULTS_DIR, decoded.filename);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Read file content
    const content = fs.readFileSync(filePath, 'utf-8');

    // Set headers for file download
    res.setHeader('Content-Type', 'text/markdown');
    res.setHeader('Content-Disposition', `attachment; filename="${decoded.filename}"`);

    // Send the file
    res.send(content);
  } catch (error) {
    console.error('Error serving OCR result:', error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    res.status(500).json({ error: 'Error serving OCR result' });
  }
}
