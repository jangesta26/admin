'server only'
import { GetApiResponse, GetMember, GetMemberAndImageUrl } from "@/types/member"
import queryString from 'query-string';

interface GetMembersParams {
  getSearch?: string | null;
  sort?: string | null;
  limitPage?: string | null;
  page?: string | null;
}

export async function fetchMembers({
  getSearch,
  sort,
  limitPage,
  page,
}: GetMembersParams): Promise<{ members:GetMemberAndImageUrl[], meta: GetApiResponse['meta'] }> {
  try {

    const queryParams = {
      search: getSearch || undefined,
      sortBy: sort ? `id:${sort}` : undefined,
      limit: limitPage || 10,
      page: page ? page.toString() : undefined,
    };

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/accounts/member?${queryString.stringify(queryParams)}`;
    console.log(apiUrl)
    const response = await fetch(apiUrl, {
      next: {
        tags: ['member'],
      },
    });


    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const apiResponse = await response.json() as GetApiResponse;
    const members:any = apiResponse.data;

    return { members, meta: apiResponse.meta };

  } catch (error) {
    console.error('Fetch members error:', error);
    throw new Error('Failed to fetch members');
  }
}


export async function fetchMember({
  id
}: {id:string}): Promise<GetMemberAndImageUrl> {
  try {

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/accounts/${id}`;
    const response = await fetch(apiUrl, {
      next: {
        tags: ['member'],
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const apiResponse = await response.json() as GetMemberAndImageUrl;

    return apiResponse;

  } catch (error) {
    console.error('Fetch members error:', error);
    throw new Error('Failed to fetch members');
  }
}

