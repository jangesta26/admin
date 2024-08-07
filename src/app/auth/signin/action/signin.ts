'use server'
import { GetSignInUser } from "@/types/user";
import { singinAuth } from "@/util/fetch";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtDecode } from 'jwt-decode';


export default async function signin(_prevState:GetSignInUser, formData:GetSignInUser){
    const errorOrRes = await singinAuth("/auth/login", formData, { returnRes: true });
    if (errorOrRes && "error" in errorOrRes){
        return errorOrRes;
    }
    const setCookieHeader = errorOrRes?.headers.get("Set-Cookie");
    if (setCookieHeader) {
        console.log('Set-Cookie Header:', setCookieHeader); 
        const token = setCookieHeader.split(';')[0].split("=")[1];
        const expires = new Date(jwtDecode(token).exp! * 1000);
        try {
        
            cookies().set({
                name: "Authentication",
                value: token,
                secure: process.env.NODE_ENV === 'production',
                httpOnly: true,
                expires: expires,
                sameSite: 'none',
            });
        } catch (e) {
            console.error('Failed to decode JWT token:', e);
            return { error: "Failed to decode JWT token" };
        }
    }
    redirect('/');
}