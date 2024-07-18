'server only'
import { GetApiResponse, GetMember } from "@/types/member"
import queryString from 'query-string';

interface GetMembersParams {
  getSearch: string | null;
  sort: string | null;
  limitPage: string | null;
  page: string | null;
}

export async function fetchMembers({
  getSearch,
  sort,
  limitPage,
  page,
}: GetMembersParams): Promise<GetMember[]> {
  

  console.log(page)

  try {

    const queryParams = {
      search: getSearch ? getSearch : undefined,
      sortBy: sort ? `id:${sort}` : undefined,
      limit: limitPage ? limitPage : undefined,
      page: page ? page.toString() : undefined,
    }

    console.log(queryParams)
      

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/accounts/member?${queryString.stringify(queryParams)}`;
    console.log(apiUrl)
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

   

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const apiResponse = await response.json() as GetApiResponse;
        
    const members: any = apiResponse.data;

    return members;
    
  } catch (error) {
    console.error('Fetch members error:', error);
    throw new Error('Failed to fetch members');
  }
}

async function fetchApiInfo(endpoint: string): Promise<number> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts/member`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const apiResponse = await response.json() as  GetApiResponse ;

    switch (endpoint) {
      case 'totalItems':
        return apiResponse.meta.totalItems;
      case 'totalPages':
        return apiResponse.meta.totalPages;
      case 'currentPage':
        return apiResponse.meta.currentPage;
      default:
        throw new Error(`Invalid endpoint: ${endpoint}`);
    }

  } catch (error) {
    console.error(`Fetch ${endpoint} error:`, error);
    throw new Error(`Failed to fetch ${endpoint}`);
  }
}

export async function getTotalItems(): Promise<number> {
  return fetchApiInfo('totalItems');
}

export async function getTotalPages(): Promise<number> {
  return fetchApiInfo('totalPages');
}

export async function getCurrentPage(): Promise<number> {
  return fetchApiInfo('currentPage');
}

export async function getItemPerPage(): Promise<number> {
  return fetchApiInfo('itemsPerPage');
}

