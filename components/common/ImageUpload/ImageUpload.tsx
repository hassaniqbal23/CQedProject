import React, { FC, useRef } from 'react';
import { Camera, LoaderCircle, Trash } from 'lucide-react';
import { toast } from 'react-toastify';
import { Avatar, AvatarImage } from '@/components/ui';

interface IProps {
  loading: boolean;
  deleteProfile: (id: number) => void;
  uploadProfile: (value: FormData) => void;
  attachmentID: number;
  attachmentFilepath: string;
  title?: string;
}

const ImageUpload: FC<IProps> = ({
  loading,
  deleteProfile,
  uploadProfile,
  attachmentID,
  attachmentFilepath,
  title = 'Upload your picture',
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <div className="relative flex justify-center items-center">
        {loading ? (
          <div className="h-40 w-40 flex justify-center items-center">
            <LoaderCircle className="animate-spin spin-in-1 shadow-yellow-50" />
          </div>
        ) : (
          <Avatar
            className={` ${attachmentFilepath ? 'h-40 w-40 flex justify-center items-center' : 'h-40 w-40 flex justify-center items-center border-2 border-dashed border-[#05b6b7]'}`}
          >
            <AvatarImage
              loading={'lazy'}
              src={attachmentFilepath || '/imageUpload.svg'}
              alt="Profile Picture"
              className={` ${attachmentFilepath ? 'w-full h-full object-cover ' : 'h-14 w-14'}`}
            />
          </Avatar>
        )}
        <div className="relative">
          <div className="absolute p-2 right-1  bg-white border border-[#CFCBCB] top-8 rounded-full cursor-pointer">
            {attachmentFilepath ? (
              <Trash onClick={() => deleteProfile(attachmentID)} />
            ) : (
              <Camera onClick={handleIconClick} />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (event.target.files) {
                const file = event.target.files[0];
                if (file.size > 2097152) {
                  toast.error(
                    'File is too large. Please select a file less than 2MB.',
                    {
                      position: 'top-right',
                    }
                  );
                  return;
                } else {
                  const formData = new FormData();
                  formData.append('file', event.target.files[0] as any);
                  uploadProfile(formData);
                }
              }
            }}
          />
        </div>
      </div>
      <h2 className="mt-2 font-semibold">{title}</h2>
    </>
  );
};

export default ImageUpload;
