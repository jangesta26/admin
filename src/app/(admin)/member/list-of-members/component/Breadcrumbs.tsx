import React from 'react'
import { Slash } from 'lucide-react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"


const Breadcrumbs = () => {
  return (
    <Breadcrumb className='mb-4'>
        <BreadcrumbList>
        <BreadcrumbItem>
            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
            <Slash />
        </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage className='text-primary'>Members</BreadcrumbPage>
          </BreadcrumbItem>
        <BreadcrumbSeparator>
            <Slash />
        </BreadcrumbSeparator>
        </BreadcrumbList>
    </Breadcrumb>
  )
}

export default Breadcrumbs
