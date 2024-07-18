'use client'
import React, {useState, useEffect} from 'react'
import TableMembers from '@/components/Tables/TableMembers'
import Loader from '@/components/Common/Loader'
import { fetchMembers, getCurrentPage, getTotalItems, getTotalPages} from '@/api/member/fetch.member'
import Breadcrumbs from './component/Breadcrumbs'
import AddButton from '@/components/Button/AddButton'
import SearchInput from '@/components/Search/SearchInput'
import Paginate from '@/components/Pagination/Paginate'
import { Label } from '@/components/ui/label'
import { GetMember } from '@/types/member'
import PageSelector from '@/components/Selector/PageSelector'



const Members = () => {

  const [loading, setLoading] = useState<boolean>(true);
  const [members, setMembers] = useState<GetMember[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [itemPerPage, setItemPerPage] = useState<number>(0);

  const [page, setPage] = useState<string>('');
  const [getSearch, setGetSearch] = useState<string>('');
  const [sort, setSort] = useState<string>('');
  const [limitPage, setLimitPage] = useState<string>('');
  
  
  useEffect(() => {
    const fetchData = async () => {
      try{

        const response: GetMember[] = await fetchMembers({
          getSearch: getSearch, 
          sort: sort, 
          limitPage: limitPage,
          page: page,
          
        }); 
        const response_total = await getTotalItems();
        const response_total_page = await getTotalPages();
        const response_current_page = await getCurrentPage();
        const response_item_page = await getCurrentPage();
        
        setMembers(response);
        setTotal(response_total);
        setTotalPage(response_total_page)
        setCurrentPage(response_current_page)
        setItemPerPage(response_item_page)
        setLoading(false);

      }catch (error) {

        console.error('Error fetching data:', error);
        // Handle error state or display an error message
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
          <Breadcrumbs/>
            <div className="rounded-sm border border-stroke bg-white px-2 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
              <div className="
              xl:flex xl:items-center xl:justify-between 
              lg:flex lg:items-center lg:justify-between 
              md:flex md:items-center md:justify-between 
              grid grid-cols
              mb-4
              ">
                <h4 className="translate-y-1 mb-6 text-2xl font-light text-black dark:text-white">
                "List of Members"
                </h4>
                <AddButton />
              </div>
              <div className=" mb-6 
              xl:flex xl:items-center xl:justify-between 
              lg:flex lg:items-center lg:justify-between 
              md:flex md:items-center md:justify-between 
              flex flex-cols
              gap-2
            ">
              {/* Items per page selector */}
                <PageSelector placeholderLimitPage={itemPerPage}  onChangePageLimit={handleItemLimitPage}/>

              {/* Search Input */}
                <SearchInput placeholder="Search by name..." onSearch={handleSearch}/>
                  
              </div>
            <TableMembers 
              dataMember={members}
              sort={handleSort}
            />

        <div className='
          xl:flex xl:items-center xl:justify-between 
          lg:flex lg:items-center lg:justify-between 
          md:flex md:items-center md:justify-between
          grid grid-cols items-center justify-center
          mb-4 
          '>
            {/* result */}
           
            <div className='flex items-center justify-center mb-4'> 
              <Label>
                  Showing result {
                    members.length > 0 ? (
                      1
                    ):(
                      0
                    )
                  } 
                  {" "} to {" "}
                  {members.length}

                  {" "} of {total} entries
              </Label>
              
            </div> 
           {/* Pagination */}
            
               {/* <Paginate totalPage={totalPage} currentPage={currentPage}/> */}
               <Paginate totalPage={totalPage} currentPage={currentPage} onPage={handlePage}/>
            
      </div>
          </div>
        </>
      )}
    </>
  )
}

export default Members


