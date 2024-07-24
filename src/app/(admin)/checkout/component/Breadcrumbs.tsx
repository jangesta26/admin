import React from 'react'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import { Slash } from 'lucide-react'

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
                <BreadcrumbLink href="#something">Checkout</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
                <Slash />
            </BreadcrumbSeparator>
        </BreadcrumbList>
    </Breadcrumb>
  )
}

export default Breadcrumbs
