'server only';
import { GetSignInUser } from "@/types/user";
import { revalidateTag } from "next/cache";
import swal from "sweetalert";

export default async function createSignInAuth(path:string, formData: GetSignInUser) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
      }),
    });

    if (!response.ok) {
      const responseData = await response.json();
      revalidateTag('logs');
        console.log("Failed to login: "+ responseData.message);
      return false;
    }
    const data = await response.json();

    localStorage.setItem('authToken', data.token);
    
    console.log("get userId: "+data.token)

    swal({
      title: 'Login Successful!',
      text: 'You have successfully login.',
      icon: 'success',
    });
    
    return true;

  } catch (error) {
    console.log("An error occurred while logging."+ error)
    return false;

  }
}

