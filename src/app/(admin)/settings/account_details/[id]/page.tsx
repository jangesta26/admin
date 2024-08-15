'use client'
import React, { FC, ReactNode, useState, useRef, useEffect } from 'react';
import { SettingLayout } from '@/components/Layout/SettingLayout';
import SettingMenu from '@/components/Dropdowns/SettingMenu';
import { useSearchParams, useRouter } from 'next/navigation';
import { CameraIcon } from 'lucide-react';
import ImageModal from '@/components/Modal';
import ImageProfile from '@/components/Avatar/ImageProfile';
import ImageProfileSaveBtn from '@/components/Button/ImageProfileSaveBtn';
import Loader from '@/components/Common/Loader';
import { GetMemberAndImageUrl } from '@/types/member';
import { fetchMember } from '@/actions/member/fetch.member';
import EditForm from './component/EditForm';

const Settings = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paramsId = searchParams.get("id");
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [avatarUrl, setAvatarUrl] = useState<string>();
  const [formData, setFormData] = useState<FormData| undefined>(new FormData());
  const [ member, setMember ] = useState<GetMemberAndImageUrl | null>(null);
  const initialAvatarUrl = useRef<string>();


  useEffect(() => {
    const fetchData = async () => {
      if (paramsId) {
        try {
          const fetchedMember = await fetchMember({ id: paramsId });
          setMember(fetchedMember);
          setAvatarUrl(fetchedMember?.images[0]?.imageUrl || '/images/user/default.png');
          initialAvatarUrl.current = fetchedMember?.images[0]?.imageUrl || '/images/user/default.png';
        } catch (error) {
          router.push('/not-found')
          console.error('Error fetching data:', error);
        }
      }
    };
    fetchData();
  }, [paramsId]);

  const updateAvatar = (imgSrc: string) => {
    setAvatarUrl(imgSrc);
  };

  const handleImageFormData = (formData: FormData) => {
    setFormData(formData);
  };


  const isAvatarChanged = avatarUrl !== initialAvatarUrl.current;
 
  useEffect(() => {
    setTimeout(() => setLoading(false), 400);
  }, []);

  return (
    <>
    { loading ? <Loader/> : (
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
                    <ImageProfileSaveBtn formData={formData}/>
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
                  <div className="p-4 sm:p-6 md:p-8">
                    { <>
                        { member && (
                            <EditForm
                            id={member.id}
                            fname={member.fname}
                            lname={member.lname}
                            gender={member.gender}
                            dob={member.dob}
                            email={member.email}
                            username={member.username}
                            password={member.password}
                          />
                      )}
                    </>}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
        {modalOpen && (
          <ImageModal
            updateAvatar={updateAvatar}
            closeModal={() => setModalOpen(false)}
            paramsId={paramsId}
            handleImageFormData={handleImageFormData}
          />
        )}
      </div>
      )
    }
    </>
  );
};

export default Settings;
