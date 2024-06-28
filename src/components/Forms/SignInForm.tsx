'use client';
import React from 'react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from '@/components/ui/form';
import { Button } from '@/components/ui/button'
import { User } from 'lucide-react'
import { PasswordInput } from '../ui/passwordInput'
import { Label } from '../ui/label'
import { Checkbox } from '../ui/checkbox'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { SignInUserSchema, SignInUser } from '@/types/user';
import { AlertFailed } from '@/components/Alerts/AlertFailed';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import swal from 'sweetalert';
import { Input } from '../ui/input';


const SignInForm: React.FC = () => {

  const { login } = useAuth();
  const [errorLogin, setErrorLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<SignInUser>({
    resolver: zodResolver(SignInUserSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })
  
  const onSubmit = async (data:any) => {
    try {
      const {username, password } = data;
       // Check if username and password match
       if (username === 'admin' && password === 'admin') {

        swal({
          title: "Login Successful!",
          text: "You have successfully logged in.",
          icon: "success",
        });

        login();
      } else {
        setErrorLogin(true);
        setTimeout(() => setErrorLogin(false), 4000); 
      }

    } catch (error) {
      setErrorLogin(true);
      setTimeout(() => setErrorLogin(false), 4000);
    }
  };

  const handleChange = () => {
    setShowPassword(!showPassword)
  }

  return (
    <>
      {
        errorLogin && (
          <AlertFailed duration={2000} />
        )
      }
      {/* Your login attempt timed out. Login will start from the beginning. */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='space-y-2'>
            <h1 className='text-2xl font-medium mb-4'>
              Sign In here.
            </h1>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Input your email" {...field} 
                      className='border-slate-500 py-6 pl-10' 
                      autoComplete="username"
                      suffix={<User className='translate-x-8 translate-y-3 pr-1 border-r-[1px] -ml-6 text-slate-700'/>}
                      />
                  </FormControl>
                  <FormDescription>
                  </FormDescription>
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
                      placeholder="Input your password" {...field}
                      className='border-slate-500 py-6 pl-10'
                      autoComplete="username"
                      showPassword = {showPassword}
                      />
                  </FormControl>
                  <FormDescription>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="flex mt-4 items-center justify-between gap-6">
              <div className='flex items-center space-x-1 space-y-0.5'>
                <Checkbox id="terms" onClick={handleChange}/>
                <Label htmlFor="terms">Show Password</Label>
              </div>

              <p className='text-sm' >

              </p>
          </div>

            <Button variant={"default"} className='w-full mt-6 py-6 text-xl font-light' type="submit">Sign In</Button>
            {/* <GoogleButton /> */}
            <div className="mt-6 text-center ">
              <p className='text-sm'>
                <Link href="/auth/forgot-password" className="text-primary hover:underline">
                  forgot a password?
                </Link>
              </p>
              </div>
        </form>
      </Form>
    </>
  )
}

export default SignInForm
