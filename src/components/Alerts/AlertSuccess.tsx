import { CheckCircle } from "lucide-react"
import style from '@/components/Forms/form.module.css'
import { useEffect } from "react";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function AlertSuccess({ duration = 2000 }) {

  useEffect(() => {
    const timer = setTimeout(() => {
      
      const alertElement = document.getElementById('alert-success');
      if (alertElement) {
        alertElement.classList.add(style.fadeOut);
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <div id='alert-success' className={`fixed top-0 right-0 pt-2 px-2 z-9999 ${style.alertSucess}`}>
      <Alert variant="destructive" className="border-[#34D399] bg-[#34D399]">
        <CheckCircle className="h-10 w-10 text-black " />
        <AlertTitle className="text-black ml-6">Success</AlertTitle>
        <AlertDescription className="text-black ml-6">
          Login successfully!
        </AlertDescription>
      </Alert>
    </div>
  )
}