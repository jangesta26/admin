'use client'
import React, { FC, ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface AuthLayoutProps {
  children: ReactNode
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {

  
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);


  return (
    <>
      <div className='relative flex flex-col h-screen overflow-hidden items-center justify-center py-2'>
        <div className='h-screen content-center items-center justify-center px-4'>
          <div className='relative sm:mx-auto py-6 px-10 bg-slate-900 rounded-t-xl'>
            <h1 className='lg:text-2xl text-center font-bold text-white tracking-widest px-10'>
              iQueries Solutions
            </h1>
          </div>
            {children}
        </div>
        <div className='xl:-mt-12 mx-auto flex items-center justify-center'>
          <p className='text-sm'>
            &copy;2024 iQueries Solutions Phil., Inc. All Rights Reserved
          </p>
        </div>
      </div>
    </>
  )
}

export default AuthLayout
