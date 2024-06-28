'use client'
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Delete, DeleteIcon, Edit, LucideDelete, PlusCircle, Search, Trash, Trash2, User, UserCircle } from 'lucide-react';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationEllipsis,
  } from "@/components/ui/pagination"
import Link from 'next/link';
import { GetMember } from '@/types/member';
import { Label } from '../ui/label';
import { Avatar } from '../ui/avartar';
import { Input } from '../ui/input';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const TableHeadItem = [
  {
    id: 1,
    headerName: 'No.',
    style: 'hidden sm:block',
  },
  {
    id: 2,
    headerName: 'Name',
    style: 'xl:-ml-25 lg:-ml-20 md:-ml-20',
  },
  {
    id: 3,
    headerName: 'Username',
    style: '',
  },
  {
    id: 4,
    headerName: 'Email',
    style: 'hidden  sm:block',
  },
  {
    id: 5,
    headerName: 'Action',
    style: 'xl:ml-10 lg:ml-10 md:ml-10',
  },
];

interface TableMemberItemProps {
  titleHead: string;
  dataMember: GetMember[];
}

const TableMembers: React.FC<TableMemberItemProps> = ({ titleHead, dataMember }) => {

  const [searchTerm, setSearchTerm] = useState<string>(''); // State to store search term
  const [filteredMembers, setFilteredMembers] = useState<GetMember[]>(dataMember); // State to store filtered members
  const [currentPage, setCurrentPage] = useState<number>(1); // State to store current page
  const [itemsPerPage, setItemsPerPage] = useState<number>(5); // State to store items per page

  useEffect(() => {
    // Set filtered members initially based on default items per page
    setFilteredMembers(dataMember.slice(0, itemsPerPage));
  }, [dataMember, itemsPerPage, currentPage]);


  // Function to update filtered members based on current page and items per page
  const updateFilteredMembers = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setFilteredMembers(dataMember.slice(startIndex, endIndex));
  };

  // Function to handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    filterMembers(term);
  };

  // Function to filter members based on search term
  const filterMembers = (term: string) => {
    const filtered = dataMember.filter(member =>
      member.id.toString().includes(term) ||
      member.fname.toLowerCase().includes(term.toLowerCase()) ||
      member.lname.toLowerCase().includes(term.toLowerCase()) ||
      member.username.toLowerCase().includes(term.toLowerCase()) ||
      member.email.toLowerCase().includes(term.toLowerCase()) ||
      (member.status === 1 && 'active'.includes(term.toLowerCase())) ||
      (member.status !== 1 && 'not active'.includes(term.toLowerCase())) // Assuming status 1 means active, adjust as per your actual status logic
    );
    setFilteredMembers(filtered.slice(0, itemsPerPage));
    setCurrentPage(1); // Reset to first page when search term changes
  };

    // Function to handle page change
    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };


  // Function to handle items per page change
  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedItemsPerPage = parseInt(event.target.value);
    setItemsPerPage(selectedItemsPerPage);
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-2 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="
      xl:flex xl:items-center xl:justify-between 
      lg:flex lg:items-center lg:justify-between 
      md:flex md:items-center md:justify-between 
      grid grid-cols
      mb-4
      ">
        <h4 className="translate-y-1 mb-6 text-2xl font-light text-black dark:text-white">
          {titleHead}
        </h4>
        <Button className="-translate-y-1" >
          <PlusCircle className="mr-1" />
          <Link href='/member/add-member'>
            add account
          </Link>
        </Button>
      </div>

      <div className=" mb-6 
        xl:flex xl:items-center xl:justify-between 
        lg:flex lg:items-center lg:justify-between 
        md:flex md:items-center md:justify-between 
        flex flex-cols
        gap-2
      ">
         {/* Items per page selector */}
         <div className='flex items-center justify-start gap-2'>
         <Label className='hidden sm:block'>Page</Label>
         <Select>
          <SelectTrigger className="w-20">
            <SelectValue 
            placeholder={itemsPerPage}
            defaultValue={itemsPerPage.toString()}
            onChange={handleItemsPerPageChange}
            />
          </SelectTrigger>
          <SelectContent className='bg-white dark:bg-background rounded-lg'>
            <SelectGroup >
              <SelectItem value="5" className='hover:bg-black hover:cursor-pointer'>5</SelectItem>
              <SelectItem value="25" className=' hover:bg-black hover:cursor-pointer'>25</SelectItem>
              <SelectItem value="50" className='hover:bg-black hover:cursor-pointer'>50</SelectItem>
              <SelectItem value="75" className='hover:bg-black hover:cursor-pointer'>75</SelectItem>
              <SelectItem value="100" className='hover:bg-black hover:cursor-pointer'>100</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        </div>

       {/* Search Input */}
        <div className='
          xl:translate-x-0
          lg:translate-x-0
          md:translate-x-0
          flex -translate-x-6
          
        '>
          <Input
          type="text"
          className="pl-10 rounded-lg w-[11.3rem]"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearchChange}
          suffix={<Search className='h-6 w-6 opacity-70 translate-x-8 translate-y-2' />}
          />
        </div>
          
      </div>

      <div className="flex flex-col border border-stroke mb-4">
        <div className="
          xl:grid xl:grid-cols-5 
          lg:grid lg:grid-cols-5 
          md:grid md:grid-cols-5 
          sm:flex grid grid-cols-3
          rounded-sm bg-gray-2 dark:bg-meta-4 
        ">
          {TableHeadItem.map((items) => (
            <div key={items.id} className={`${items.style} 
              flex xl:items-start xl:justify-start
              lg:flex lg:items-start lg:justify-start
              md:flex md:items-start md:justify-start
              sm:flex items-center justify-center
              xl:p-5 lg:px- md:p-5 p-2.5`
            }>
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                {items.headerName}
              </h5>
            </div>
          ))}
        </div>

        {filteredMembers.map((data, key) => (
           
          <div
        
            className={`
            xl:grid xl:grid-cols-5
            lg:grid lg:grid-cols-5 
            md:grid md:grid-cols-5 
            sm:flex grid grid-cols-3
            font-light
            text-sm
            border-t
            ${
              key === filteredMembers.length - 0
                ? ''
                : 'border-t border-stroke dark:border-strokedark'
            }`}
            key={key}
          >
            <div className="hidden items-center justify-start p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{data.id}</p>
            </div>
           
            <Link href={`/profile/${data.id}`} 
            className='
              flex 
              sm:flex items-center justify-center
              xl:-ml-25 xl:justify-start
              lg:-ml-20 lg:justify-start
              md:-ml-20 md:justify-start
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
              sm:flex sm:items-center sm:justify-center
              xl:items-center xl:justify-start
              lg:items-center lg:justify-start
              md:items-center md:justify-start
              py-6 xl:p-5 sm:text-lg xl:text-md
            ">
              <p className="text-black dark:text-white">{data.username}</p>
            </div>

            <div className='hidden items-center justify-start sm:flex p-2.5 xl:p-5'>
                <p className="text-white text-sm dark:text-white bg-black rounded-xl px-3 py-1.5 text-md ">
                  {data.email}
                </p>
            </div>

            <div className="flex 
              sm:flex sm:items-center sm:justify-center
              xl:ml-10 xl:items-center xl:justify-start
              lg:ml-10 lg:items-center lg:justify-start
              md:ml-10 md:items-center md:justify-start
              p-4.5 xl:p-5
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
        ))}
      </div>
              
        {/* Pagination */}
        <Pagination className='
          xl:flex xl:items-center xl:justify-between 
          lg:flex lg:items-center lg:justify-between 
          md:flex md:items-center md:justify-between
          grid grid-cols ite items-center justify-center
          mb-4 
        '>
        <Label className='
          ml-2
          xl:translate-x-0 
          lg:translate-x-0 
          md:translate-x-0 
          flex items-center justify-center
          mb-4
        '>Showing result {1} to {filteredMembers.length} of {dataMember.length} entries
        </Label>
          <PaginationContent className='flex gap-0.5'>
            <PaginationItem>
              <PaginationPrevious
                href="#"
              />
            </PaginationItem>

            <PaginationItem>
                <PaginationLink
                  href="#"
                  isActive
                  
                >
                  1
                </PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationLink
                  href="#"
                  
                >
                  2
                </PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationLink
                  href="#"
                  
                >
                  3
                </PaginationLink>
              </PaginationItem>


              <PaginationItem>
                  <PaginationEllipsis />
              </PaginationItem>

              <PaginationItem>
                <PaginationNext
                  href="#"
                />
              </PaginationItem>
          </PaginationContent>
        </Pagination>
    </div>
  );
};

export default TableMembers;