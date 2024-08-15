'server only';

export default async function createUploadImage(path:string, formData:any) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const responseData = await response.json();
      console.error("Failed to upload image: ", responseData.message);
      return false;
    }
    return true;

  } catch (error) {
    console.log("An error occurred while uploading."+ error)
    return false;

  }
}

