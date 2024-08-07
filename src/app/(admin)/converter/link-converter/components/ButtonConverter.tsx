import React from 'react';
import createConverter from '@/actions/converter/create.converter';
import { Button } from '@/components/ui/button';

interface ButtonConverterProps {
  url_link: string;
}

const ButtonConverter: React.FC<ButtonConverterProps> = ({ url_link }) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response:any = await createConverter(url_link);
      const blob = new Blob([response.data], { type: 'video/mp4' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'video.mp4');
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error converting:', error);
    }
  };

  return (
    <div className="px-2">
      <form onSubmit={handleSubmit}>
        <Button
          className="w-full dark:hover:bg-white hover:dark:text-black"
          variant={'default'}
          type="submit"
        >
          Convert
        </Button>
      </form>
    </div>
  );
};

export default ButtonConverter;
