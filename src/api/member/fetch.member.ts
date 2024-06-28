'server only'
import { GetMember } from "@/types/member"

export async function getMembers(): Promise<GetMember[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const members: GetMember[] = await response.json();
    return members;
  } catch (error) {
    console.error('Fetch members error:', error);
    throw new Error('Failed to fetch members');
  }
}
