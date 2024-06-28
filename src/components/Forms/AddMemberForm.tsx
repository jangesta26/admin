'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from '../ui/input';
import { AddMemberAccount, AddMemberSchema } from '@/types/member';
import { CalendarIcon, Eye, EyeOff } from 'lucide-react';
import { cn } from "@/lib/utils"
import { format } from "date-fns"

import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, FormItem, 
  FormLabel, 
  FormMessage, 
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from '../ui/calendar'
import createMember from '@/api/member/create.member'
import swal from 'sweetalert'


const AddMemberForm = () => {

    const [errorSubmit, setErrorSubmit] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    // zod validation
    const form = useForm<AddMemberAccount>({
      resolver: zodResolver(AddMemberSchema),
      defaultValues: {
        fname: "",
        lname: "",
        gender:"",
        dob:undefined,
        email: "",
        username: "",
        password: "",
      },
    })


    // to detemine password
    const handleChange = () => {
      setShowPassword(!showPassword);
    }

    // api route
    const onSubmit = async (data:AddMemberAccount) => {
      console.log(data)
      try {
          await createMember(data);
      } catch (error) {
          console.error('Error adding member:', error);
      }
    };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <h1 className='text-2xl font-medium text-black dark:text-white mb-4'>
            Member Details
          </h1>
          <div className='grid xl:grid-flow-col sm:grid-col gap-4'>
            <div className='space-y-4'>
            
              <FormField
                control={form.control}
                name="fname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex gap-1'>First Name <p className='text-red text-[20px]'>*</p></FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Input your first name" {...field} 
                        className='py-6 pl-4 rounded-lg' 
                        />
                    </FormControl>
                    <FormDescription>
                    </FormDescription>
                    <FormMessage className='text-red'/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex gap-1'>Last Name <p className='text-red text-[20px]'>*</p></FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Input your last name" {...field} 
                        className='py-6 pl-4 rounded-lg' 
                        />
                    </FormControl>
                    <FormDescription>
                    </FormDescription>
                    <FormMessage className='text-red'/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                  <FormLabel className='flex gap-1'>Gender <p className='text-red text-[20px]'>*</p></FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl className='py-6 pl-4 rounded-lg dark:bg-slate-950'>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white dark:bg-slate-950">
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="rather">Rather not to say</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                    </FormDescription>
                    <FormMessage className='text-red'/>
                  </FormItem>
                )}
              />
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                   <FormLabel className='flex gap-1'>Date of birth <p className='text-red text-[20px]'>*</p></FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                              format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white dark:bg-slate-950" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        captionLayout='dropdown-buttons'
                        fromYear={1950}
                        toYear={2024}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            </div>
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex gap-1'>Email<p className='text-red text-[20px]'>*</p></FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Input your email" {...field} 
                        className='py-6 pl-4 rounded-lg' 
                        />
                    </FormControl>
                    <FormDescription>
                    </FormDescription>
                    <FormMessage className='text-red'/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex gap-1'>Username<p className='text-red text-[20px]'>*</p></FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Input your username" {...field } 
                        className='py-6 pl-4 rounded-lg' 
                        autoComplete="username"
                       
                        />
                    </FormControl>
                    <FormDescription>
                    </FormDescription>
                    <FormMessage className='text-red'/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex gap-1'>Password<p className='text-red text-[20px]'>*</p> </FormLabel>
                    <FormControl>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Input your password" {...field } 
                        className='py-6 pl-4 pr-12 rounded-lg' 
                        autoComplete="current-password" 
                        />
                    </FormControl>
                    <FormControl onClick={handleChange} className='cursor-pointer' >
                    <div className='absolute xl:left-[95%] sm:flex left-[85%] md:left-[90%] items-end justify-end mr-4 -translate-y-11'>
                      { !showPassword 
                        ?<EyeOff/>
                        :<Eye/>
                      }
                    </div>
                    </FormControl>
                    <FormDescription>
                    </FormDescription>
                    <FormMessage className='text-red'/>
                  </FormItem>
                )}
              />
            </div>
          </div>

            <Button
            variant={"default"} 
            className='mx-auto items-center w-30 py-6 mt-6 text-xl font-extralight' 
            type="submit"
            >
              Add
            </Button>
        </form>
      </Form>

    </>
  )
}
export default AddMemberForm
