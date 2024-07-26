'use client'
import React, { FC, ReactNode } from 'react';
import { Metadata } from 'next';
import { SettingLayout } from '@/components/Layout/SettingLayout';
import ProfileAvatar from '@/components/Avatar/ProfileAvatar';
import SettingMenu from '@/components/Dropdowns/SettingMenu';
import { useSearchParams } from 'next/navigation';


interface SettingLayoutProps {
  children: ReactNode;
}

const Settings: FC<SettingLayoutProps> = ({ children }) => {
  const searchParams = useSearchParams();
  const newParam = searchParams.get("id")
  console.log(newParam)
  return (
    <>
      <div className="mx-auto max-w-full p-4 sm:p-6 md:p-8 lg:p-10">
        <div className="flex min-h-screen flex-col">
          <main className="flex-1 bg-muted/40 p-4 sm:p-6 md:p-8 lg:p-10">
            <div className="mx-auto grid w-full max-w-6xl gap-4 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
              <nav className="flex flex-col items-center gap-4 md:items-start">
                <div className="relative z-30 mb-6 w-full max-w-[100px] sm:max-w-[120px] md:max-w-[150px] lg:max-w-[150px] rounded-full bg-white/20 p-2 backdrop-blur">
                  <ProfileAvatar />
                </div>
                <div className="hidden md:flex flex-col gap-4 text-sm text-muted-foreground">
                  <SettingLayout />
                </div>
                <div className="md:hidden -mt-8">
                  <SettingMenu />
                </div>
              </nav>
              <div className="flex-1">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="p-4 sm:p-6 md:p-8">{children}</div>
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
