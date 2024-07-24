
import Checkout from '@/components/Ecommerce/Checkout'
import React from 'react'
import Breadcrumbs from './component/Breadcrumbs'

const page = () => {
  return (
    <>
    <Breadcrumbs />
    <div className="rounded-sm border border-stroke bg-white px-2 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
    <Checkout />
    </div>
    </>
  )
}

export default page
