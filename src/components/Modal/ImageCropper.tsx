'use client'
import React, { useCallback, useRef, useState } from 'react'
import { Label } from '../ui/label'
import 'react-image-crop/dist/ReactCrop.css';
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop  } from 'react-image-crop';
import { Button } from '../ui/button';
import setCanvasPreview from '@/lib/setCanvasPreview';

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

interface ImageCropperProps {
  updateAvatar: (dataUrl: string) => void;
  closeModal: () => void;
  handleImageFormData: (formData: FormData) => void;
  paramsId: any;
}

const ImageCropper: React.FC<ImageCropperProps> = ({ updateAvatar, closeModal, paramsId, handleImageFormData }) => {

    const imgRef = useRef<HTMLImageElement | null>(null);
    const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const [ imgSrc, setImgSrc ] = useState<string>('');
    const [ crop, setCrop ] = useState();
    const [error, setError] = useState<string>('');

    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const imageElement = new Image();
            imageElement.src = reader.result as string;

            imageElement.onload = () => {
                const { naturalWidth, naturalHeight } = imageElement;
                if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
                    setError('Image must be at least 150 x 150 pixels.');
                    setImgSrc('');
                    return;
                }
                setImgSrc(reader.result as string);
                setError('');
            }
        };
        reader.readAsDataURL(file);
    };

  
  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width,  height } = e.currentTarget;
    const cropWithInPercent = ( MIN_DIMENSION / width ) * 100;
    const crop = makeAspectCrop(
        {
            unit: '%',
            width: cropWithInPercent,
        },
        ASPECT_RATIO,
        width,
        height
    );
    const centeredCrop:any = centerCrop(crop, width, height)
    setCrop(centeredCrop);
};

  const handleCrop = async () => {
    if (imgRef.current && previewCanvasRef.current && crop) {
      setCanvasPreview({
        image: imgRef.current,
        canvas: previewCanvasRef.current,
        crop: convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height),
      });

      previewCanvasRef.current.toBlob(async (blob) => {
        if (blob) {
 
          const formData = new FormData();
          formData.append('file', blob, 'cropped-image.png');
          formData.append('accountId', paramsId);

          const dataUrl = previewCanvasRef.current?.toDataURL();
          updateAvatar(dataUrl || '')
          closeModal();
          handleImageFormData(formData)

        }
      }, 'image/png');
    } else {
      console.error('Image reference or crop is missing');
      setError('Image reference or crop is missing');
    }
  };

  return (
    <>
      <Label>
        <span className='sr-only'>Choose file photo</span>
        <input
            type="file"
            accept='image/*'
            onChange={onSelectFile}
            className="block w-full text-sm text-slate-500 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-slate-700 file:text-sky-300 hover:file:bg-slate-600"
        />
      </Label>
      {error && <p className='text-rose-500 text-xs'>{error}</p>}
        {
          imgSrc && 
            ( <div className='flex flex-col items-center'>
                <ReactCrop
                    crop={crop}
                    circularCrop
                    keepSelection
                    aspect={ASPECT_RATIO}
                    minWidth={MIN_DIMENSION}
                    onChange={
                      (percentCrop: any) => setCrop(percentCrop)
                    } 
                >
                    <img 
                    ref={imgRef}
                    src={imgSrc}
                    alt='Upload'
                    onLoad={onImageLoad}
                    style={{
                    maxHeight: "70vh"
                    }}
                    />
                </ReactCrop>
                <Button
                variant={null}
                className='text-white font-mono text-xs py-2 px-4 rounded-2xl mt-4 bg-primary/90 hover:bg-primary'
                onClick={handleCrop}
              >
                  Crop Image
                </Button>
            </div>
        )}
        {crop &&
          <canvas
            ref={previewCanvasRef}
            className='mt-2'
            style={{
              display: "none",
              border: "1px solid black",
              objectFit: "contain",
              width: 150,
              height: 150,
            }}
          />
        }
    </>
  )
}

export default ImageCropper
// const dataUrl = previewCanvasRef.current?.toDataURL();
// updateAvatar(dataUrl || '')
// if (closeModal) closeModal();