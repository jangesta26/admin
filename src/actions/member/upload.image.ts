// src/api/member/upload.image.ts
'use server';

import { revalidateTag } from 'next/cache';
import swal from 'sweetalert';

// Helper function to convert base64 to Blob
const base64ToBlob = (base64: string, mime: string) => {
  const byteCharacters = atob(base64);
  const byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  return new Blob(byteArrays, { type: mime });
};

export default async function uploadImage(avatarUrl: string, accountId: string) {
  try {
    const status = 1;
    const currentDate = new Date();
    const options = { timeZone: 'Asia/Manila' };
    const philippineTime = currentDate.toLocaleString('en-US', options);

    if (!avatarUrl) {
      throw new Error('No image URL provided');
    }

    const [metadata, base64Data] = avatarUrl.split(',');

    if (!metadata || !base64Data) {
      throw new Error('Invalid base64 data');
    }

    const mimeMatch = metadata.match(/:(.*?);/);
    if (!mimeMatch) {
      throw new Error('Could not determine MIME type');
    }
    const mimeType = mimeMatch[1];

    const blob = base64ToBlob(base64Data, mimeType);
    const formData = new FormData();
    formData.append('file', blob, 'avatar.png'); // Adjust file name if needed
    formData.append('accountId', accountId);
    formData.append('status', status.toString());
    formData.append('philippineTime', philippineTime);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const responseData = await response.json();
      throw new Error(responseData.message || 'Failed to create image');
    }

    revalidateTag('image');

    swal({
      title: 'Added Successful!',
      text: 'You have successfully added a new image.',
      icon: 'success',
    });

    return true;
  } catch (error) {
    console.error('Error creating image:', error);
    swal({
      title: 'Error!',
      text: 'An error occurred while creating the image.',
      icon: 'error',
    });
    return false;
  }
}
