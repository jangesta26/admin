'use server'
import { jwtDecode } from "jwt-decode";

export default async function getUserFromToken (token:any) {
    try {
        const decoded:any = jwtDecode(token);
        return {
            userId:decoded.id,
            username:decoded.username,
        }; // Ensure 'id' is the key in your JWT payload
      } catch (error) {
        console.error('Invalid token', error);
        return null;
    }
}