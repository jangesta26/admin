'use client'
import React, {useState, useEffect} from 'react'
import TableMembers from '@/components/Tables/TableMembers'
import { useRouter } from 'next/navigation'
import Loader from '@/components/Common/Loader'
import { getMembers } from '@/api/member/fetch.member'
import Breadcrumbs from './component/Breadcrumbs'


const Members = () => {

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [members, setMembers] = useState<any[]>([]);
 
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const membersData = await getMembers(); 
        setMembers(membersData);
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching members:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(members)
  return (
    <>
      {loading ? <Loader /> : (
        <>
          <Breadcrumbs/>
            <TableMembers dataMember={members} titleHead='List of Members'/>
        </>
      )}
    </>
  )
}

export default Members
