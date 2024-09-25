'use client';

import { useDropzone } from 'react-dropzone';
import { IoMdCloudUpload } from 'react-icons/io';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"


import SparkleHeaderComponent from '@/app/_components/SparkleHeaderComponent';
import { useState } from 'react';
import Loader from '@/app/_components/Loader';


const Page = () => {


  const [imageUrlFromBackend, setImageUrlFromBackend] = useState(null);

  const [openModal, setOpenModal] = useState(false);

  const [loading, setLoading] = useState();


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    maxFiles: 1,
    onDrop: async (acceptedPicture) => {

      try {

        setLoading(true);
        
        const formData = new FormData();

        formData.append('image_file', acceptedPicture[0]);  
  
        formData.append('size', 'auto');

  
        const response = await fetch('https://api.remove.bg/v1.0/removebg', {
          method: 'POST',
          headers: { 'X-Api-Key': process.env.NEXT_PUBLIC_REMOVE_BG_API_KEY },
          body: formData,
        });
  
        const imageBlob = await response.blob();
  
        const imageUrl = URL.createObjectURL(imageBlob);
  
        setImageUrlFromBackend(imageUrl);
  
        setOpenModal(true);

        toast.success('the background has been successfully removed from the image', { 
          duration: 3500,
          style: {
            background: '#333',
            color: '#fff',
          },
        });

      } catch (error) {
        
        console.log(error);

        setOpenModal(false);

        toast.error('an error occurred while removing the background from the image, or the API may have reached its monthly usage limit.', { 
          duration: 5000,
          style: {
            background: '#333',
            color: '#fff',
          },
        });
        
      } finally {

        setLoading(false);

      }
    },
    onDropRejected: () => {
      
      toast.error('multiple images are not allowed', { 
        duration: 5000,
        style: {
          background: '#333',
          color: '#fff',
        },
      });

    },
  });


  const downloadRemovedBgImg = () => {

    if (!imageUrlFromBackend) {

      alert('No image available for download');

      return;

    }
  
    const a = document.createElement('a');

    a.href = imageUrlFromBackend;
  
    a.download = `background_removed_image_${uuidv4()}.png`;
  
    document.body.appendChild(a);
  
    a.click();
  
    document.body.removeChild(a);

  };
  

  return (
    <>

     {loading && <Loader />}

      <div className="min-h-screen w-full bg-neutral-950 relative flex flex-col items-center antialiased">
        
        <div className="mt-32 flex flex-col gap-10 lg:gap-14 w-10/12 lg:w-9/12">
          
          <SparkleHeaderComponent heading="Upload your Image" />

          <div
            className={`border-8 p-20 w-full border-solid border-red-300 flex items-center justify-center rounded-lg hover:cursor-pointer ${
              isDragActive
                ? 'border-violet-300 bg-transparent/40'
                : 'border-violet-500'
            }`}
            {...getRootProps()}
          >
            <input {...getInputProps()} />

            <div className="text-white text-base lg:text-xl flex items-center justify-center flex-col gap-3 text-center">
              
              <IoMdCloudUpload size={80} className="text-violet-400" />

              <p>
                <span className="text-violet-400">Click to Upload</span> or Drag
                and Drop
              </p>

              <p className="text-violet-500">JPG, JPEG, or PNG</p>

            </div>

          </div>

        </div>

        <AlertDialog open={openModal} onOpenChange={setOpenModal}>

          <AlertDialogContent className='bg-slate-800'>

            <AlertDialogHeader>

              <AlertDialogTitle className='text-center text-lg'>Image with Background Removed</AlertDialogTitle>

              <AlertDialogDescription>

                <Image 
                  src={imageUrlFromBackend} 
                  alt="image" 
                  width={200}
                  height={200}
                  className="mt-2 block m-auto rounded object-cover mb-4"
                />

              </AlertDialogDescription>

            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={downloadRemovedBgImg}>Download Image</AlertDialogAction>
            </AlertDialogFooter>

          </AlertDialogContent>

        </AlertDialog>

      </div>
    </>
  );
};

export default Page;
