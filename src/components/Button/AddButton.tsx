'use client'
import React from 'react'
import { Button } from '../ui/button';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';


const AddButton = () => {
  return (
    <Button className="-translate-y-1" >
    <PlusCircle className="mr-1" />
    <Link href='/member/add-member'>
      add account
    </Link>
  </Button>
  )
}

export default AddButton
