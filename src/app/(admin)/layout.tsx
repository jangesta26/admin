'use client'
import React, { FC, ReactNode } from 'react'
import useIdleTimer from "@/lib/useIdleTimer";
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import AlertSessionExpired from '@/components/Alerts/AlertSessionExpired';

import { useAuth } from '@/context/AuthContext';

interface AdminLayoutProps {
    children: ReactNode
  }
  
  const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {

    const router = useRouter();
    const { isAuthenticated } = useAuth();

    const [showSessionExpirePrompt, setShowSessionExpirePrompt] = useState(false);

      // Handle auto logout after 5 minutes (300000 milliseconds) of inactivity
    const handleLogout = useCallback(() => {
        localStorage.removeItem('isLoggedIn');
        router.push('/auth/signin'); // Redirect to login page
        window.location.reload();
    }, [router]);

    const handleWarning = useCallback(() => {
        setShowSessionExpirePrompt(true);
    }, []);

    const handleExtendSession = useCallback(() => {
        setShowSessionExpirePrompt(false);
    }, []);

    useIdleTimer(handleLogout, 300000, handleWarning, 60000);
  
    useEffect(() => {
      // Check if user is logged in, if not redirect to login page
      if (!isAuthenticated) {
        router.push('/auth/signin');
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
        return null; // or a loading spinner, or redirect, etc.
      }

  return (

    <div>
        { 
        children
        }
        {showSessionExpirePrompt && <AlertSessionExpired onExtendSession={handleExtendSession} />}
    </div>
  );
}


export default AdminLayout
