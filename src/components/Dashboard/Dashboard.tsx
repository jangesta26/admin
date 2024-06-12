'use client'
import React from 'react'
import ECommerce from "@/components/Dashboard/Ecommerce";
import DefaultLayout from "@/components/Layout/DefaultLayout";
import Loader from "@/components/Common/Loader";
import { useEffect, useState  } from "react";
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import { useRouter } from 'next/navigation';

const Dashboard = () => {

    const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  
  
  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
    router.refresh();
  }, [router]);
  return (
    <>
      {loading ? <Loader /> :
      <DefaultLayout >
        <Breadcrumb pageName='Status'/>
        <ECommerce/>
      </DefaultLayout >
    }
    </>
  )
}

export default Dashboard
