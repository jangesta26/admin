import { Metadata } from "next";
import SignUpForm from '@/components/Forms/SignUpForm'
import React from 'react'

export const metadata: Metadata = {
  title: "  iQueries - Sign Up",
  description: "This is the auth page for admin",
  // other metadata
};

const SignUpPage = () => {
  return (
      <div className='relative flex flex-col bg-slate-300 px-10 pt-4 pb-10 rounded-b-xl text-black'>
        <SignUpForm />
      </div>
  )
}

export default SignUpPage
