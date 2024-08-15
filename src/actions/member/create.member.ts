'server only'
import { AddMemberAccount } from "@/types/member";
import { revalidateTag } from "next/cache";
import swal from 'sweetalert';

export default async function createMember(data:AddMemberAccount) {

  console.log("Requested::::"+data)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          status: 1,
        }),
      });

      if (!response.ok) {
        const responseData = await response.json();
        revalidateTag('member');
        
        if (response.status === 409 && responseData.message === 'Email already exists') {
          swal({
            title: 'Error!',
            text: 'Email is already taken. Please use a different email address.',
            icon: 'error',
          });
        } else {
          swal({
            title: 'Error!',
            text: 'Failed to add member: ' + responseData.message,
            icon: 'error',
          });
        }
        return false;
      }
  
      swal({
        title: 'Added Successful!',
        text: 'You have successfully added a new member.',
        icon: 'success',
      });
      
      return true;
  
    } catch (error) {
      console.error('Error creating member:', error);
      swal({
        title: 'Error!',
        text: 'An error occurred while creating member.',
        icon: 'error',
      });
      return false;
    }
  }
