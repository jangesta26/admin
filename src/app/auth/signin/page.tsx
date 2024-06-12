import React from 'react';
import { Metadata } from 'next';
import SignInForm from '@/components/Forms/SignInForm';

export const metadata: Metadata = {
  title: "  iQueries - Sign In",
  description: "This is the auth page for admin",
  // other metadata
};

const SignInPage = () => {
  return (
      <div className='relative flex flex-col bg-slate-300 px-10 pt-4 pb-10 rounded-b-xl text-black'>
        <SignInForm />
      </div>
  )
}

export default SignInPage
