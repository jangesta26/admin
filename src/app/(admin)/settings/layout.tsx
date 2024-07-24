import React, { FC, ReactNode } from 'react'
import { Metadata } from "next";
import { SettingLayout } from "@/components/Layout/SettingLayout";
import ProfileAvatar from '@/components/Avatar/ProfileAvatar';

export const metadata: Metadata = {
  title: "Account | Setting",
  description:
    "This is the settings page for Admin",
};

interface SettingLayoutProps {
  children: ReactNode
}

const Settings: FC<SettingLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="mx-auto max-w-270 -mt-6">
        <div className="flex min-h-screen w-full flex-col">
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
          <div className="mx-auto grid w-full max-w-6xl gap-2">
            <h1 className="text-3xl font-semibold">Settings</h1>
          </div>
          <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav
            className="grid gap-2 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
          >
            <SettingLayout/>
            <div className="relative z-30 mt-10 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
              <ProfileAvatar />
             
            </div>
          </nav>
              <div className="grid grid-cols-5 gap-8">
                <div className="col-span-5 xl:col-span-6">
                  <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="p-7">
                      {children}
                    </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        </div>
      </div>
    </>
  );
};

export default Settings;
