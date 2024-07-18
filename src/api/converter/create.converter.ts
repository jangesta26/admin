import swal from 'sweetalert';

export default async function createConverter(value: string) {
  try {
    const status = 1;
    const currentDate = new Date();
    const options = { timeZone: 'Asia/Manila' };
    const philippineTime = currentDate.toLocaleString('en-US', options);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/youtube/convert/mp4`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        value,
        status,
        philippineTime,
      }),
    });

    if (!response.ok) {
      const responseData = await response.json();
      console.log(responseData);
      return false;
    }

    return true;

  } catch (error) {
    console.error('Error converting from youtube:', error);
    swal({
      title: 'Error!',
      text: 'An error occurred while converting from youtube.',
      icon: 'error',
    });
    return false;
  }
}
