'use client'
import React, { FC, ReactNode } from 'react'
import useIdleTimer from "@/lib/useIdleTimer";
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import AlertSessionExpired from '@/components/Alerts/AlertSessionExpired';
import { useAuth } from '@/context/AuthContext';
import DefaultLayout from '@/components/Layout/DefaultLayout';

interface AdminLayoutProps {
    children: ReactNode
  }
  
  const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {

    const router = useRouter();
    const { isAuthenticated } = useAuth();

    const [showSessionExpirePrompt, setShowSessionExpirePrompt] = useState(false);

    const handleLogout = useCallback(() => {
        localStorage.removeItem('isLoggedIn');
        router.push('/auth/signin'); 
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
      if (!isAuthenticated) {
        router.push('/auth/signin');
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
        return null; 
      }

  return (

    <DefaultLayout>
        { 
        
        children
        }
        {showSessionExpirePrompt && <AlertSessionExpired onExtendSession={handleExtendSession} />}
    </DefaultLayout>
  );
}


export default AdminLayout
