'use client'
import React, { useEffect, useState } from 'react'
import EditForm from './component/EditForm';
import { fetchMember } from '@/actions/member/fetch.member';
import { GetMember } from '@/types/member';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

const AccountDetails= () => {
const searchParams = useSearchParams();
const newParam = searchParams.get("id")
const router = useRouter();
const [ member, setMember ] = useState<GetMember>();


useEffect(() => {

  const fetchData = async () => {
    try {
      const fetchedMember   = await fetchMember({ id: newParam as string });
      setMember(fetchedMember);
    } catch (error) {
      router.push('/not-found')
      console.error('Error fetching data:', error);
    }
  };
  if (newParam) {
    fetchData(); 
  }
},[newParam]);


  return (
    <>
      { member && (
          <EditForm
          id={member.id}
          fname={member.fname}
          lname={member.lname}
          gender={member.gender}
          dob={member.dob}
          email={member.email}
          username={member.username}
          password={member.password}
        />
      )}
    </>
  )
}

export default AccountDetails
