'use client';

import React from 'react';
import { useForm, SubmitHandler  } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpUserSchema, SignUpUser } from '@/types/user';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PasswordInput } from '../ui/passwordInput';
import Link from 'next/link';
import { Mail, User } from 'lucide-react';

const SignUpForm: React.FC = () => {

  const form = useForm<SignUpUser>({
    resolver: zodResolver(SignUpUserSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<SignUpUser> = async (data:any) => {
    try {
      const {username, email ,password } = data;
       // Check if username and password match
       if (username === 'admin' && email ==='admin@admin.com' && password === 'admin') {
        // Authentication successful, store login status and redirect to dashboard
        alert('Correct details')
      } else {
        // setErrorLogin(true);
        // Authentication failed, display error message
        // setTimeout(() => setErrorLogin(false), 4000); 
        alert('Inorrect details')
      }

    } catch (error) {
      alert('An error occurred');
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='space-y-2'>
            <h1 className='text-2xl font-medium mb-4'>
              Sign Up here.
            </h1>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Input your username" {...field} 
                      className='border-slate-500 py-6' 
                      suffix={<User className='-translate-x-2 translate-y-3 -ml-6 text-slate-700'/>}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Input your email" {...field} 
                      className='border-slate-500 py-6'
                      suffix={<Mail className='-translate-x-2 translate-y-3 -ml-6 text-slate-700'/>}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput 
                      placeholder="Input password" {...field}
                      className='border-slate-500 py-6' 
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput 
                      placeholder="Confirm password" {...field}
                      className='border-slate-500 py-6' 
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className='w-full mt-6' type="submit">Sign Up</Button>
          <div className="mt-6 text-center">
            <p className='text-sm'>
              Already have an account?{" "}
              <Link href="/auth/signin" className="text-primary hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </>
  );
}

export default SignUpForm;
