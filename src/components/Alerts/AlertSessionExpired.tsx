import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface AlertSessionExpired {
  onExtendSession: () => void;
}

const SessionExpirePrompt: React.FC<AlertSessionExpired> = ({ onExtendSession }) => {
  return (
    <div className="fixed top-0 right-0 pt-2 px-2 z-9999">
      <Alert variant="destructive" className="border-warning bg-warning">
        <AlertCircle className="h-10 w-10 text-black" />
        <AlertTitle className="text-black ml-6">Session Expiring Soon</AlertTitle>
        <AlertDescription className="text-black ml-6">
          Your session will expire soon. Click <button onClick={onExtendSession} className="text-primary underline">here</button> to extend your session.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default SessionExpirePrompt;
