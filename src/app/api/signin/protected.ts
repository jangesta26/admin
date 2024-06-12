// pages/api/protected.ts

import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

// Middleware function to verify authentication token
function verifyAuthToken(req: NextApiRequest): string | null {
  // Extract token from request headers
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // No token found in headers
    return null;
  }
  const token = authHeader.substring(7); // Remove 'Bearer ' prefix
  
  // Replace 'your_secret_key' with your actual secret key used for signing tokens
  const secretKey = '0123456789!~`#$%^&*()_+';

  try {
    // Verify token using secret key
    const decoded = jwt.verify(token, secretKey) as { username?: string };
    return decoded.username ?? null; // Extracted username from token payload
  } catch (error) {
    // Token verification failed
    return null;
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Verify authentication token
  const username = verifyAuthToken(req);
  if (!username) {
    // Unauthorized: Token invalid or missing
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  // Token is valid, proceed with handling the request
  // Example: Fetch data or perform actions for authenticated user
  res.status(200).json({ success: true, message: `Welcome, ${username}!` });
}
