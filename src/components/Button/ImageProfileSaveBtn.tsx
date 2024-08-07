'use client'
import uploadImage from '@/actions/member/upload.image';
import React from 'react';

interface ImageProfileSaveBtnProps {
  avatarUrl: string;
  accountId: string | null;
}

const ImageProfileSaveBtn: React.FC<ImageProfileSaveBtnProps> = ({ avatarUrl, accountId }) => {
  
    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    if (!accountId) {
      console.error('No user ID provided');
      return;
    }

    try {
      await uploadImage(avatarUrl, accountId);
    } catch (error) {
      console.error('Error adding image:', error);
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
