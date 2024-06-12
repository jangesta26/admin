import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  
  if (req.method === 'POST') {
    // Mock authentication logic for demonstration purposes
    const { username, password } = req.body;
    
    // Example: Check if username and password match expected values
    if (username === 'admin' && password === 'admin') {


      // Return success response with authentication token
      res.status(200).json({ success: true, message:'Login Successfully' });
    } else {
      // Return error response for invalid credentials
      res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  } else {
    // Return 405 Method Not Allowed for non-POST requests
    res.status(405).end();
  }
}