import React, { FC, useRef } from 'react';
import { useGlobalState } from '@/app/gobalContext/globalContext';
import { Camera, Loader, LoaderCircle, Trash } from 'lucide-react';
import { IUserInformation } from '@/app/gobalContext/types';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { Avatar, AvatarImage } from '@/components/ui';

interface IProps {
  isDeletingProfile: boolean;
  isUploadingProfile: boolean;
  deleteProfile: (id: number) => void;
  uploadProfile: (value: FormData) => void;
}
const ImageUpload: FC<IProps> = ({
  isDeletingProfile,
  isUploadingProfile,
  deleteProfile,
  uploadProfile,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { userInformation, isUserGetInfo } = useGlobalState();

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  console.log(userInformation?.attachment?.file_path, 'testing profile');
  return (
    <div className="relative">
      {isDeletingProfile || isUploadingProfile || isUserGetInfo ? (
        <div className=" h-40 w-40 flex justify-center items-center">
          <LoaderCircle className="animate-spin spin-in-1 shadow-yellow-50" />
        </div>
      ) : (
        <Avatar className="h-40 w-40">
          <AvatarImage
            loading={'lazy'}
            src={
              userInformation?.attachment?.file_path ||
              '/assets/images/user-image.png'
            }
            alt="Profile Pictures"
          />
        </Avatar>
      )}
      <div className="relative">
        <div className="absolute p-2 bg-white border right-1 bottom-4 rounded-full cursor-pointer">
          {userInformation?.attachment?.file_path ? (
            <Trash
              onClick={() => deleteProfile(userInformation.attachment.id)}
            />
          ) : (
            <Camera onClick={handleIconClick} />
          )}
        </div>
        <input
          type="file"
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
      <h2 className="mt-2 font-semibold">Choose your avatar</h2>
    </div>
  );
};

export default ImageUpload;
