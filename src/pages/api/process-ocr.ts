import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Path to the Google Cloud credentials file
const credFilePath = path.join(process.cwd(), '..', 'google-cloud-key.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('API route started');
  console.log('Current working directory:', process.cwd());
  console.log('Credentials file path:', credFilePath);

  try {
    if (fs.existsSync(credFilePath)) {
      const credentials = JSON.parse(fs.readFileSync(credFilePath, 'utf8'));
      console.log('Credentials loaded successfully');
      console.log('Project ID:', credentials.project_id);
      res.status(200).json({ message: 'Credentials loaded successfully', projectId: credentials.project_id });
    } else {
      console.error('Credentials file not found:', credFilePath);
      res.status(500).json({ error: 'Google Cloud credentials file not found' });
    }
  } catch (error) {
    console.error('Error reading credentials file:', error);
    res.status(500).json({ error: 'Failed to load Google Cloud credentials' });
  }
}
