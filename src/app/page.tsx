'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

const page = () => {
    const router = useRouter();
    const isAuthenticated = useAuth();
    useEffect(() => {
        // Check authentication status or any other condition
        // Redirect based on the condition
        if (!isAuthenticated) { 
          router.push('/auth/signin'); // Redirect to sign-in page if not authenticated
          router.refresh();
        } else {
          router.push('/dashboard'); // Redirect to dashboard if authenticated
        }
      }, [isAuthenticated, router]);
    
      return null; // Render nothing initially, redirect will happen in useEffect
}

export default page
