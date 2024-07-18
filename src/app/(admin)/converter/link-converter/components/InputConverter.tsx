'use client'
import { Input } from '@/components/ui/input'
import React from 'react'

interface UrlLinkProps{
  url: (term: string) => void;
}

const InputConverter:React.FC<UrlLinkProps> = (
 { url }
) => {

  const handleUrl = (term: string) => {
    url(term);
  }


  return (
    <>
    <div className="w-full px-2">
        <Input
        placeholder='Paste a URL here'
        onChange={(e) => {
          handleUrl(e.target.value);
        }}
        />
    </div>
    </>
  )
}

export default InputConverter
