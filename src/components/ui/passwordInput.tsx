import * as React from "react";
import { LockIcon } from "lucide-react";
import { Input } from "./input";

export interface PasswordInputProps 
  extends React.InputHTMLAttributes<HTMLInputElement> {
    showPassword?: React.ReactNode;
  }

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, type, showPassword, ...props }, ref) => {

    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={className}
          {...props}
          ref={ref}
          suffix={
            <LockIcon className="translate-x-8 translate-y-3 border-r-2 pr-1 -ml-6 text-slate-700" />
          }
          showPassword={showPassword}
        />
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };

