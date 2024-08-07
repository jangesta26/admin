'use client'
import { AlertCircle, CheckCircle } from "lucide-react"
import style from './alert.module.css'
import { useEffect } from "react";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function AlertFailed(
  { duration, title, description} : {duration:number, title:string, description:string}
) {

  useEffect(() => {
    const timer = setTimeout(() => {
      
      const alertElement = document.getElementById('alert-error');
      if (alertElement) {
        alertElement.classList.add(style.fadeOut);
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <div id="alert-error" className={`fixed top-0 right-0 pt-2 px-2  z-9999 ${style.alertError}`}>
      <Alert variant="destructive" className="border-[#F87171] bg-[#F87171]">
        <AlertCircle className="h-10 w-10 text-[#8a3232] " />
        <AlertTitle className="text-[#8a3232] ml-6">{title}</AlertTitle>
        <AlertDescription className="text-[#8a3232] ml-6">
          {description}
        </AlertDescription>
      </Alert>
    </div>
  )
}
