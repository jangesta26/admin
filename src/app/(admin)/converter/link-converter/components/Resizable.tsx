import React from 'react'
import Image from 'next/image'
import ImagesLogo from '@/../../../admin/public/vercel.svg'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

const Resizable = () => {
  return (
    <div className="
    flex flex-col-3 mx-auto items-center justify-start mt-4.5 max-w-[50rem] 
    rounded-lg border border-stroke 
    py-4 px-4 shadow-1 dark:border-strokedark 
    dark:bg-[#37404F] gap-4">
     <div className='flex items-center justify-center w-60 h-32 px-2 rounded-xl bg-slate-400 '>
        <Image 
            src={ImagesLogo}
            alt="video"
            width={280}
            height={480}
              style={{
                width: "auto",
                height: "auto",
              }}
        />
     </div>
     <div className='
     grid grid-rows-2 py-6 items-center 
     justify-start w-100 h-32
     text-black dark:text-white
     '>
        <Label className='text-2xl font-medium '>Title of the Video</Label>
        <div className='flex gap-4'>
            <Label className='text-start font-light'>Views</Label>
            <Label className='text-start font-light'>Date Published</Label>
        </div>
        

     </div>
     <div className='flex items-center 
     justify-start w-50 h-32
     text-black dark:text-white
     '>
        <Button>Download</Button>

     </div>

   </div>
  )
}

export default Resizable
