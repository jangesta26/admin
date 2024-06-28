'use client'
import React,{ useState, useEffect } from 'react'
import DefaultLayout from '@/components/Layout/DefaultLayout'
import Loader from '@/components/Common/Loader'
import AddMemberForm from '@/components/Forms/AddMemberForm'
import Breadcrumbs from './component/Breadcrumbs'

const AddedMember = () => {

  const [loading, setLoading] = useState<boolean>(true);
  
  
  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  return (
    <>
      { loading ? <Loader/> :
        <>
          <Breadcrumbs/>
          <AddMemberForm/>
        </>
      }
    </>
  )
}

export default AddedMember
