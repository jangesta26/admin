'use server';
import { UpdateMemberAccount } from '@/types/member';

export default async function updateMember(path:string, data: UpdateMemberAccount, id: number): Promise<boolean> {
  try {
    const status = 1;
    const currentDate = new Date();
    const options = { timeZone: 'Asia/Manila' };
    const philippineTime = currentDate.toLocaleString('en-US', options);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${path}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        status,
        philippineTime,
      }),
    });

    if (!response.ok) {
      const responseData = await response.json();

      if (response.status === 409 && responseData?.message === 'Email already exists') {
        throw new Error('Email is already taken. Please use a different email address.');
      } else {
        throw new Error(`Failed to update the account details: ${responseData?.message || 'Unknown error'}`);
      }
    }

    return true;

  } catch (error) {
    console.error('Error updating member:', error);
    throw error; // Re-throw error to handle in client-side
  }
}
