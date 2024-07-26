'use client'
import React, { useState } from 'react'
import { 
    Form, 
    FormControl, 
    FormDescription, 
    FormField, FormItem, 
    FormLabel, 
    FormMessage, 
  } from '@/components/ui/form';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import { Calendar } from '@/components/ui/calendar'
import { UpdateMemberAccount, UpdateMemberSchema } from '@/types/member';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form'
import updateMember from '@/api/member/update.member';
import { Input } from '@/components/ui/input';
import { CalendarIcon, ChevronLeft, ChevronRight, Cloudy, Edit, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

interface MemberProps {
  id?: number | undefined,
  fname?: string;
  lname?: string,
  gender?: string,
  dob?: Date,
  email?: string,
  username?: string,
  password?: string, 

}

const EditForm: React.FC<MemberProps> = ( 
{
  id,
  fname,
  lname,
  gender,
  dob,
  email,
  username,
  password, 
}
) => {

    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [editBtn, setEditBtn] = useState(false);

    const form = useForm<UpdateMemberAccount>({
        resolver: zodResolver(UpdateMemberSchema),
        defaultValues: {
          fname: fname || '',
          lname: lname || '',
          gender: gender || '',
          dob: dob ? (new Date(dob)) : ( undefined ),
          email:email || '',
          username:username || '',
          password: password || '',
        },
      })


    // to detemine password
    const handleChange = () => {
        setShowPassword(!showPassword);
    }

    //update  api route
    const onSubmit = async (data: UpdateMemberAccount) => {
      if (id) {
        try {
          const confirmed = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to make these changes?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            reverseButtons: true,
          });
  
          if (confirmed.isConfirmed) {
            await updateMember(data, id);

            await Swal.fire({
              title: 'Update Successful!',
              text: 'You have successfully updated the account details.',
              icon: 'success',
            });

            router.refresh();
            setEditBtn(false);
          }
        } catch (error) {
          console.error('Error updating details:', error);
          await Swal.fire({
            title: 'Error!',
            text: 'An error occurred while updating details.',
            icon: 'error',
          });
        }
      }
    };
  
    const handleClickEditBtn = () => {
      Swal.fire({
        title: !editBtn ? 'Do you want to edit?' : 'Do you want to disable?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          setEditBtn(!editBtn);
        }
      });
    };


  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
            <div className="w-full sm:w-1/2">
            
            <FormField
                control={form.control}
                name="fname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex gap-1'>First Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="" {...field} 
                        className='py-6 pl-4 rounded-lg capitalize' 
                        disabled={!editBtn && true}
                        />
                    </FormControl>
                    <FormDescription>
                    </FormDescription>
                    <FormMessage className='text-red'/>
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full sm:w-1/2">
            <FormField
                control={form.control}
                name="lname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex gap-1'>Last Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="" {...field} 
                        className='py-6 pl-4 rounded-lg capitalize' 
                        disabled={!editBtn && true}
                        />
                    </FormControl>
                    <FormDescription>
                    </FormDescription>
                    <FormMessage className='text-red'/>
                  </FormItem>
                )}
              />
            </div>
            </div>
            <div className="mb-5.5">
            <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                  <FormLabel className='flex gap-1'>Gender</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}  disabled={!editBtn && true}>
                      <FormControl className='py-6 pl-4 rounded-lg'>
                        <SelectTrigger>
                          <SelectValue placeholder=""{...field}/>
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
            </div>
            <div className="mb-5.5">
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                   <FormLabel className='flex gap-1'>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          disabled={!editBtn && true}
                          className={cn(
                            "pl-3 text-left font-normal w-full",
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
                        startMonth={new Date(1950, 0)}
                        endMonth={new Date()}
                        captionLayout='dropdown'
                        defaultMonth={field.value ? new Date(field.value) : new Date()}
                        footer={field.value !== new Date() ? field.value.toLocaleDateString() : 'Today'}
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
            <div className="mb-5.5">
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex gap-1'>Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="" {...field} 
                        className='py-6 pl-4 rounded-lg' 
                        disabled={!editBtn && true}
                        />
                    </FormControl>
                    <FormDescription>
                    </FormDescription>
                    <FormMessage className='text-red'/>
                  </FormItem>
                )}
              />
            </div>

            <div className="mb-5.5">
            <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex gap-1'>Username</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="" {...field } 
                        className='py-6 pl-4 rounded-lg' 
                        autoComplete="username"
                        disabled={!editBtn && true}
                       
                        />
                    </FormControl>
                    <FormDescription>
                    </FormDescription>
                    <FormMessage className='text-red'/>
                  </FormItem>
                )}
              />
            </div>

            <div className="mb-5.5">
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className='relative'>
                    <FormLabel className='flex gap-1'>Password </FormLabel>
                    <FormControl>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="" {...field } 
                        className='py-6 pl-4 pr-12 rounded-lg' 
                        autoComplete="current-password" 
                        disabled={!editBtn && true}
                        />
                    </FormControl>
                    <FormControl onClick={handleChange} className='cursor-pointer' >
                    <div className='absolute left-full mr-4 -translate-y-11 -translate-x-11'>
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

            <div className="flex items-center justify-start gap-2">
                <span
                className='flex w-15 h-10 bg-slate-950 dark:bg-indigo-700 text-white text-center px-2 py-2 rounded-lg hover:cursor-pointer'
                onClick={handleClickEditBtn}
                >
                  <Edit/>  Edit
                </span>
                <Button 
                
                className={`gap-1 text-sm ${!editBtn ? 'hidden' :'' }`}>
                  <Cloudy/> Save Changes
                </Button>
            </div>
        </form>
    </Form>
  )
}

export default EditForm
