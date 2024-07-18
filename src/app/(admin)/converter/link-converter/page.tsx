'use client'
import React, { useState } from 'react'
import Title from './components/Title';
import InputConverter from './components/InputConverter';
import ButtonConverter from './components/ButtonConverter';
import Resizable from './components/Resizable';
import SocialMediaIcons from './components/SocialMediaIcons';

const page = () => {
  const [urlLink, getUrlLink] = useState<string>('');

  const handleUrlLink = (value:string) => {
    getUrlLink(value)
  }

  return (
    <div className="mx-auto max-w-full">

    <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
        <div className="mt-10">
            <Title title="Free Unlimited Youtube Link Converter"/>
          <p className="font-light">Please insert a valid YouTube video URL</p>
            <div className="
            mx-auto mb-5.5 mt-4.5 grid max-w-[50rem] 
            grid-row-2 rounded-lg border border-stroke 
            py-2.5 shadow-1 dark:border-strokedark 
            dark:bg-[#37404F] space-y-2">
                <InputConverter url={handleUrlLink}/>
                <ButtonConverter url_link={urlLink}/>
            </div>

        <Resizable />
        
          {/* social media icons */}
          <SocialMediaIcons/>
        </div>
      </div>
    </div>
  </div>
  )
}

export default page
