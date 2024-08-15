'use client'
import createUploadImage from '@/actions/upload/create.upload';
import React from 'react';
import { useRouter } from 'next/navigation';
import swal from "sweetalert";

interface ImageProfileSaveBtnProps {
  formData?: FormData;
}

const ImageProfileSaveBtn: React.FC<ImageProfileSaveBtnProps> = ({ formData }) => {

  const router = useRouter();

  const onSubmit = async () => {
    try{
      const response = await createUploadImage('/upload/image-profile', formData);
    if(response){
      swal({
        title: 'Image Uploaded Successful!',
        text: 'You have successfully login.',
        icon: 'success',
      });
      router.refresh();
    }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
    
  };

  return (
    <form onSubmit={onSubmit}>
      <div className='-space-y-4 mb-6'>
        <button
          type="submit"
          className='px-4 py-2 bg-blue-500 text-white rounded'
        >
          Upload
        </button>
      </div>
    </form>
  );
}

export default ImageProfileSaveBtn;
