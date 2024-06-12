import { AlertCircle, CheckCircle } from "lucide-react"
import style from '@/components/Forms/form.module.css'
import { useEffect } from "react";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function AlertFailed({ duration = 2000 }) {

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
        <AlertTitle className="text-[#8a3232] ml-6">Error</AlertTitle>
        <AlertDescription className="text-[#8a3232] ml-6">
          Incorrect username or password. Please try again!
        </AlertDescription>
      </Alert>
    </div>
  )
}
