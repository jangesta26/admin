'use client'
import React, { useState } from 'react';
import { ArrowDownAZ, ArrowUpZA, Edit, Trash2, UserCircle } from 'lucide-react';
import Link from 'next/link';
import { GetMember } from '@/types/member';
import { Label } from '../ui/label';
import { Avatar } from '../ui/avartar';
import { Button } from '../ui/button';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce'
import TableHeadItem from '@/lib/dataTable';


interface TableMemberItemProps {
  dataMember: GetMember[];
  sort: (term: string) => void;
}

const TableMembers: React.FC<TableMemberItemProps> = ({ 
  dataMember,
  sort,
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [sortBtn, setSortBtn] = useState(false);

  const handleChange = useDebouncedCallback((term: string) => {
   const params = new URLSearchParams(searchParams);
    if(term ){
      params.set('sortBy', term);
    } else {
      params.set('sortBy', term);
    }
    sort(term);
    setSortBtn(!sortBtn)
    replace(`${pathname}?${params.toString()}`);
  
  },300)

  return (
    
    <>
      <div className="flex flex-col border border-stroke mb-4">
        <div className="
          xl:grid xl:grid-cols-4 
          lg:grid lg:grid-cols-4 
          md:grid md:grid-cols-4 
          sm:flex grid grid-cols-3
          rounded-sm bg-gray-2 dark:bg-meta-4 px-4  py-0
        ">
          {TableHeadItem.map((items) => (
            <div key={items.id} className={`${items.style} 
              flex xl:items-center xl:justify-start
              lg:flex lg:items-center lg:justify-start
              md:flex md:items-center md:justify-start
              sm:flex items-center justify-center
              py-2 px-4`
            }>
              {
                items.headerName == 'Name' ? (
                  <Button 
                  variant={null}
                  onClick={() => {
                    sortBtn
                    ? handleChange('ASC')
                    : handleChange('DESC')
                  }}
                  className='hover:bg-slate-200 gap-4'
                  >
                    <h5 className="text-md font-medium uppercase xsm:text-base">
                      {items.headerName}
                    </h5>
                      
                        { !sortBtn ? <ArrowDownAZ /> : <ArrowUpZA/> }
                      
                  </Button>
                ) : (

                  <h5 className="text-md font-medium uppercase xsm:text-base">
                    {items.headerName}
                  </h5>
                )
              }
             
              
            </div>
          ))}
        </div>

        {
        dataMember.length > 0 ? (
          dataMember?.map((data, key) => (
           
          <div
        
            className={`
            xl:grid xl:grid-cols-4
            lg:grid lg:grid-cols-4 
            md:grid md:grid-cols-4 
            sm:flex grid grid-cols-3
            sm:items-center sm:justify-center
            xl:items-center xl:justify-start
            lg:items-center lg:justify-start
            md:items-center md:justify-start
            px-4
            font-light
            text-sm
            border-t
            hover:bg-slate-100
            ${
              key === dataMember.length - 0
                ? ''
                : 'border-t border-stroke dark:border-strokedark'
            }`}
            key={key}
          >

            <Link href={`/profile/${data.id}`} 
            className='
              flex items-center justify-center
              xl:items-center xl:justify-start
              lg:items-center lg:justify-start
              md:items-center md:justify-start
              gap-3 py-2.5 xl:p-2 cursor-pointer
            '>
                <Avatar className=" flex h-10 w-10 items-center justify-center rounded-full border-[0.5px]">
                  {/* <Image src={} alt="Brand" width={48} height={48} /> */}
                  <Label> {data.fname.charAt(0).toUpperCase()} {data.lname.charAt(0).toUpperCase()}</Label>
                </Avatar>
                <p className="hidden text-black dark:text-white sm:block capitalize text-balance hover:underline">
                  {data.fname} {data.lname}
                </p>
            </Link>
           

            <div className="flex 
              sm:items-center sm:justify-center
              xl:items-center xl:justify-start
              lg:items-center lg:justify-start
              md:items-center md:justify-start
              py-6 xl:p-5
            ">
              <p className="text-black dark:text-white">{data.username}</p>
            </div>

            <div className='hidden items-center justify-start sm:flex p-2.5 xl:p-5'>
                <p className="text-white text-sm dark:text-white bg-black rounded-xl px-3 py-1.5 text-md ">
                  {data.email}
                </p>
            </div>

            <div className="flex 
              sm:items-center sm:justify-center
              xl:items-center xl:justify-start
              lg:items-center lg:justify-start
              md:items-center md:justify-start
              py-6 xl:p-5
             
            ">

              <Link href={`/profile/${data.id}`} className='hover:text-blue-400'>
                <UserCircle/>
              </Link>
              
              <Link href={`/profile/${data.id}`} className='hover:text-blue-400'>
                  <Edit/>
              </Link>

              <Trash2 className='hover:text-blue-400'/>

            </div>
          </div>
          ))) : (
            <p className='text-center'>No members found matching the query.</p>
          )}
      </div>
    </>
  );
};

export default TableMembers;