'use client'
import React, { FC, ReactNode, useState, useRef, useEffect } from 'react';
import { SettingLayout } from '@/components/Layout/SettingLayout';
import SettingMenu from '@/components/Dropdowns/SettingMenu';
import { useSearchParams } from 'next/navigation';
import { CameraIcon } from 'lucide-react';
import ImageModal from '@/components/Modal';
import ImageProfile from '@/components/Avatar/ImageProfile';
import ImageProfileSaveBtn from '@/components/Button/ImageProfileSaveBtn';

interface SettingLayoutProps {
  children: ReactNode;
}

const DEFAULT_AVATAR_URL = '/images/user/default.png';

const Settings: FC<SettingLayoutProps> = ({ children }) => {
  const searchParams = useSearchParams();
  const paramsId = searchParams.get("id");
  const [modalOpen, setModalOpen] = useState(false);

  const [avatarUrl, setAvatarUrl] = useState<string>(DEFAULT_AVATAR_URL);

  const initialAvatarUrl = useRef<string>(DEFAULT_AVATAR_URL);


  const updateAvatar = (imgSrc: string) => {
    setAvatarUrl(imgSrc);
  };

  const isAvatarChanged = avatarUrl !== initialAvatarUrl.current;

  return (
    <>
      <div className="mx-auto max-w-full p-4 sm:p-6 md:p-8 lg:p-10">
        <div className="flex min-h-screen flex-col">
          <main className="flex-1 bg-muted/40 p-4 sm:p-6 md:p-8 lg:p-10">
            <div className="mx-auto grid w-full max-w-6xl gap-4 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
              <nav className="flex flex-col items-center gap-1.5 md:items-start">
                <div className='flex flex-col items-center justify-center'>
                <div className="relative z-30 mb-4 w-24 sm:w-32 md:w-40 lg:w-40 rounded-full dark:bg-white/20 p-2 backdrop-blur bg-primary/70">
                  <div className="relative drop-shadow-2">
                    <ImageProfile avatarUrl={avatarUrl} />
                    <label
                      htmlFor="profile"
                      className="absolute flex items-center justify-center h-8 w-8 sm:h-8 sm:w-8 md:h-8 md:w-8 lg:h-8 lg:w-8 xl:h-8 xl:w-8 cursor-pointer rounded-full bg-primary text-white hover:bg-opacity-90 bottom-2 right-2"
                    >
                      <button onClick={() => setModalOpen(true)}>
                        <CameraIcon className='text-slate-300 h-5' />
                      </button>
                    </label>
                  </div>
                </div>
                
                {isAvatarChanged && (
                    <ImageProfileSaveBtn avatarUrl={avatarUrl} accountId={paramsId}/>
                 )}

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
        {modalOpen && (
          <ImageModal
            updateAvatar={updateAvatar}
            closeModal={() => setModalOpen(false)}
          />
        )}
      </div>
    </>
  );
};

export default Settings;
