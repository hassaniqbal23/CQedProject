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
}
const ImageUpload: FC<IProps> = ({
  loading,
  deleteProfile,
  uploadProfile,
  attachmentID,
  attachmentFilepath,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <div className="relative">
      {loading ? (
        <div className=" h-40 w-40 flex justify-center items-center">
          <LoaderCircle className="animate-spin spin-in-1 shadow-yellow-50" />
        </div>
      ) : (
        <Avatar className="h-40 w-40">
          <AvatarImage
            loading={'lazy'}
            src={attachmentFilepath || '/assets/images/user-image.png'}
            alt="Profile Pictures"
          />
        </Avatar>
      )}
      <div className="relative">
        <div className="absolute p-2 bg-white border right-1 bottom-4 rounded-full cursor-pointer">
          {attachmentFilepath ? (
            <Trash onClick={() => deleteProfile(attachmentID)} />
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
