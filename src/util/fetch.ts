'use server'
import { PostOptions } from "@/common/post-options.interface";
import { API_URL } from "@/constants/api";
import { GetSignInUser } from "@/types/user";
import { getErrorMessage } from "@/util/errors";
import { cookies } from "next/headers";

const getHeaders = () => ({
    Cookie: cookies().toString(),
});

export async function singinAuth(path:string, formData:GetSignInUser, options:PostOptions) {

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/accounts/member`;
  const apiResponseAuth = await fetch(apiUrl, {
    next: {
      tags: ['member'],
    },
  });

  if (!apiResponseAuth.ok) {
    throw new Error(`Failed to fetch data: ${apiResponseAuth.statusText}`);
  }

  const res = await apiResponseAuth.json() as any;

console.log(res?.username, res?.password)

    if(res?.username === formData.username && res?.password === formData.password ){


    const response = await fetch(`${API_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', ...getHeaders(),
      },
     
      body: JSON.stringify(formData),
    });

    const apiResponse = await response.json();

    if(!response.ok){
      return { error: await getErrorMessage(apiResponse)}
    }

    return options?.returnRes ? response : apiResponse;
  } else {
    return false;
  }
};

export const get = async (path: string) => {
    const res = await fetch(`${API_URL}${path}`, {
        headers: { ...getHeaders() },
    });
    return res.json();
}