'use client';
import React, { useState, useEffect } from 'react';
import TableMembers from '@/components/Tables/TableMembers';
import Loader from '@/components/Common/Loader';
import { fetchMembers } from '@/actions/member/fetch.member';
import Breadcrumbs from './component/Breadcrumbs';
import AddButton from '@/components/Button/AddButton';
import SearchInput from '@/components/Input/SearchInput';
import Paginate from '@/components/Pagination/Paginate';
import { Label } from '@/components/ui/label';
import { GetMemberAndImageUrl } from '@/types/member';
import ItemPerPage from '@/components/Dropdowns/ItemPerPage';

const Members = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [members, setMembers] = useState<GetMemberAndImageUrl[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [page, setPage] = useState<string>('');
  const [getSearch, setGetSearch] = useState<string>('');
  const [sort, setSort] = useState<string>('');
  const [limitPage, setLimitPage] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { members, meta } = await fetchMembers({ getSearch, sort, limitPage, page });
        setMembers(members);
        setTotal(meta.totalItems);
        setTotalPage(meta.totalPages);
        setCurrentPage(meta.currentPage);
        setTimeout(() => setLoading(false), 400);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [getSearch, sort, limitPage, page]);

  const handleSearch = (value: string) => {
    setGetSearch(value);
  };

  const handleSort = (value: string) => {
    setSort(value);
  };

  const handlePage = (value: string) => {
    setPage(value);
  };

  const handleItemLimitPage = (value: string) => {
    setLimitPage(value);
  };

  return (
    <>
      {loading ? <Loader /> : (
        <>
          <Breadcrumbs />
          <div className="rounded-sm border border-stroke bg-white px-4 pb-4 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-6 lg:px-8">
            <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <h4 className="text-2xl font-light text-black dark:text-white">
                List of Members
              </h4>
              <AddButton />
            </div>
            <div className="mb-6 flex flex-wrap gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Items per page selector */}
              <ItemPerPage entries='Entries' onChangePageLimit={handleItemLimitPage} />
              {/* Search Input */}
              <SearchInput placeholder="Search by name..." onSearch={handleSearch} />
            </div>
            <TableMembers
              dataMember={members}
              sort={handleSort}
            />
            <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              {/* Result */}
              <div className="flex items-center">
                <Label>
                  Showing result {members.length > 0 ? 1 : 0} to {members.length} of {total} entries
                </Label>
              </div>
              {/* Pagination */}
              <Paginate totalPage={totalPage} currentPage={currentPage} onPage={handlePage} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Members;
