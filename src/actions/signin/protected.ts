'use server'
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';


function verifyAuthToken(req: NextApiRequest): string | null {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.substring(7); 
  
  const secretKey = '0123456789!~`#$%^&*()_+';

  try {

    const decoded = jwt.verify(token, secretKey) as { username?: string };
    return decoded.username ?? null; 
  } catch (error) {
    
    return null;
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
 
  const username = verifyAuthToken(req);
  if (!username) {
   
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  res.status(200).json({ success: true, message: `Welcome, ${username}!` });
}
