'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

const page = () => {
    const router = useRouter();
    const isAuthenticated = useAuth();
    useEffect(() => {
        if (!isAuthenticated) { 
          router.push('/auth/signin'); 
          router.refresh();
        } else {
          router.push('/dashboard'); 
        }
      }, [isAuthenticated, router]);
    
      return null; 
}

export default page
// import getMe from "@/util/get-me";

// export default async function Home() {
//   const me = await getMe();
//   console.log(me);
//   return (
//     <div>
//     {me}
//     </div>
//   )
// }