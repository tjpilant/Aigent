import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Test API route called');
  console.log('Request method:', req.method);
  console.log('Request body:', req.body);
  console.log('Request query:', req.query);
  
  res.status(200).json({ message: 'Test API route working' });
}
