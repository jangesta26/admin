import { X } from 'lucide-react'
import React from 'react'
import ImageCropper from './ImageCropper'

interface ImageModalProps {
  updateAvatar: (dataUrl: string) => void;
  closeModal: () => void;
  handleImageFormData: (formData: FormData) => void;
  paramsId:any;
}

const ImageModal: React.FC<ImageModalProps> = ({ updateAvatar, closeModal, paramsId, handleImageFormData }) => {
  return (
    <div 
    className='relative z-9999'
    aria-labelledby='crop-image-dialog'
    role='dialog'
    aria-modal='true' 
    >
      <div className='fixed inset-0 bg-slate-900 bg-opacity-75 transition-all backdrop-blur-sm'>
        <div className='fixed inset-0 z-10 w-screen overflow-auto'>
          <div className='flex min-h-full items-center justify-center px-2 py-12 text-center'>
              <div className='relative w-[90%] sm:w-[50%] min-h-[60vh] rounded-2xl bg-slate-800 text-slate-400 text-left shadow-xl transition-all'>
                  <div className='px-5 py-4 space-y-2'>
                      <button
                          type='button'
                          className=' rounded-md p-1 inline-flex items-center justify-center text-slate-400 hover:bg-slate-700 focus:outline-none absolute top-2 right-2'
                          onClick={closeModal}
                      >
                      <span className='sr-only'>Close menu</span>
                          <X/>
                      </button>
                      <ImageCropper 
                      updateAvatar={updateAvatar}
                      closeModal={closeModal}
                      handleImageFormData={handleImageFormData}
                      paramsId={paramsId}
                      />
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageModal