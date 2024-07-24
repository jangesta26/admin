'use client'
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Loader from "@/components/Common/Loader/";
import Calendar from '@/components/Calender/Calendar';


const CalendarPage = () => {

  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in, if not redirect to login page
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      router.push('/auth/signin');
    }
  }, []);


  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    setTimeout(() => setLoading(false), 400);
  }, []);


  return (
    <>
    { loading ? <Loader /> :
    <>
      <Calendar />
    </>
    }
    </>
  );
};

export default CalendarPage;
