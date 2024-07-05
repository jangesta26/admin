'server only'
import { GetApiResponse, GetMember } from "@/types/member"

export async function getMembers({
  getQuery,
  sort,
  itemPerPage,
  page,
} : {
  getQuery:string, 
  sort: string,
  itemPerPage: string,
  page: string,

}): Promise<GetMember[]> {
  

  try {

    let itemQuery = `?${getQuery ? (getQuery+'&') : (getQuery+'')}${sort ? (sort+'&') : (sort+'')}${itemPerPage ? (itemPerPage+'&') : (itemPerPage+'')}${!page ? (page+'&') : (page+'')}`
    console.log(itemQuery+'.....')

    let apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/accounts/member${itemQuery}`;

    // if (getQuery || sort || itemPerPage || page) {
    //   apiUrl += '?';

    //   if (getQuery) {
    //     apiUrl += `${getQuery}`;
    //   }

    //   if (sort) {
    //     apiUrl += `${getQuery ? '&' : ''}${sort}`;
    //   }

    //   if (itemPerPage) {
    //     apiUrl += `${getQuery ? '&' : ''}${itemPerPage}`;
    //   }

    //   if (page) {
    //     apiUrl += `${getQuery ? '&' : ''}${page}`;
    //   }
    // }

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const apiResponse: GetApiResponse = await response.json();
        
    const members: any = apiResponse.data;

    return members;
    
  } catch (error) {
    console.error('Fetch members error:', error);
    throw new Error('Failed to fetch members');
  }
}


export async function getTotal(): Promise<GetApiResponse[]> {

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

    const apiResponse: GetApiResponse = await response.json();
        
    const total: any = apiResponse.total;

    return total;
    
  } catch (error) {
    console.error('Fetch members error:', error);
    throw new Error('Failed to fetch members');
  }
}

export async function getTotalPage(): Promise<GetApiResponse[]> {

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

    const apiResponse: GetApiResponse = await response.json();
        
    const total_page: any = apiResponse.total_pages;

    return total_page;
    
  } catch (error) {
    console.error('Fetch members error:', error);
    throw new Error('Failed to fetch members');
  }
}

export async function getCurrentPage(): Promise<GetApiResponse[]> {

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

    const apiResponse: GetApiResponse = await response.json();
        
    const current_page: any = apiResponse.page;

    return current_page;
    
  } catch (error) {
    console.error('Fetch members error:', error);
    throw new Error('Failed to fetch members');
  }
}



