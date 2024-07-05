'use client';
import { Input } from '@/components/ui/input/input';
import { useState, useRef, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea/textarea';
import { Button } from '@/components/ui/button/button';
import Image from 'next/image';
import { Images, Smile, X } from 'lucide-react';
import { Typography } from '../Typography/Typography';
import dynamic from 'next/dynamic';
import { EmojiClickData } from 'emoji-picker-react';
import Modal from '@/components/common/Modal/Modal';
import { useMutation } from 'react-query';
import { uploadImage } from '@/app/api/communities';
import { NewFeeds } from '@/components/NewFeeds/NewFeeds';
import { useGlobalState } from '@/app/globalContext/globalContext';
import ReactPlayer from 'react-player';
import { IAttachments } from '@/types/global';
import MulltiFileUploader from '../MultiFileUploader/MulltiFileUploader';

const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false });

interface CreatePostModalProps {
  title?: string;
  textarea?: string;
  buttonTrigger: React.ReactNode;
  buttonAction?: string;
  icon: string;
  onPublish?: (data: any) => void;
  buttonActionLoading?: boolean;
}

export const CreatePostModal = ({
  icon,
  title,
  textarea,
  buttonAction,
  onPublish,
  buttonActionLoading,
}: CreatePostModalProps) => {
  const { userInformation } = useGlobalState();

  const [showUpload, setShowUpload] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState(textarea || '');
  const [searchInputFocused, setSearchInputFocused] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<any | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const playerRef = useRef<HTMLVideoElement>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  const handleShowUpload = () => {
    setShowUpload(true);
    setUploadedImage(null);
    setShowEmojiPicker(false);
  };

  const handleHideUpload = () => setShowUpload(false);

  const handleEmojiClick = (emojiObject: EmojiClickData) => {
    setTextAreaValue((prev) => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handleFileUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const { mutate: uploadPost, isLoading: isUploadingPost } = useMutation(
    'post-upload',
    (data: FormData) => uploadImage(data),
    {
      onSuccess: (data) => {
        setUploadedImage(data.data?.data);
      },
      onError: (error) => {
        console.log(error, 'error');
      },
    }
  );

  const handleFileChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      const formData = new FormData();

      Array.from(files).forEach((file) => {
        formData.append('files', file);
      });

      uploadPost(formData);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const openModalButton = (
    <NewFeeds
      className="w-full"
      userImage={
        userInformation?.attachment?.file_path || '/assets/profile/profile.svg'
      }
      onClick={() => {
        setUploadedImage(null);
        setIsVisible(true);
        setTextAreaValue('');
      }}
    />
  );

  const handleOkClick = () => {
    onPublish &&
      onPublish({
        content: textAreaValue,
        attachment_ids: uploadedImage.map((item: any) => item.id),
      });
    setTextAreaValue('');
    setUploadedImage(null);
    setIsVisible(false);
  };

  return (
    <Modal
      openModalButton={openModalButton}
      isVisible={isVisible}
      isSeperator={false}
      onOpenChange={() => setIsVisible(!isVisible)}
      header={
        <>
          <Typography variant="h3" weight="semibold">
            {title}
          </Typography>
        </>
      }
      footer={false}
    >
      <div className="w-full">
        {(uploadedImage || !showUpload) && (
          <Textarea
            placeholder="What would you like to share?"
            className={`w-full ${uploadedImage ? 'h-[100px]' : 'h-[300px]'} bg-[#F8F9FB]`}
            value={textAreaValue}
            onChange={(e) => setTextAreaValue(e.target.value)}
          />
        )}
        {uploadedImage && uploadedImage?.length && (
          <div
            className={`relative mt-4 ${uploadedImage.length === 2 || uploadedImage.length === 4 ? 'grid grid-cols-2 gap-2' : uploadedImage.length === 3 ? 'grid grid-cols-2 gap-2' : ''}`}
          >
            {uploadedImage.map((item: IAttachments, index: number) => {
              if (item.file_type === 'MP4') {
                return (
                  <ReactPlayer
                    key={index}
                    url={item.file_path}
                    autoPlay={false}
                    controls={true}
                    width="100%"
                    height="auto"
                  />
                );
              } else {
                return (
                  <Image
                    key={index}
                    src={item?.file_path || ''}
                    alt="Uploaded"
                    width={100}
                    height={100}
                    className={`w-full h-auto ${uploadedImage.length === 3 ? 'max-h-[200px]' : 'max-h-[300px]'} object-cover rounded-2xl ${uploadedImage.length === 3 && index === 2 ? 'col-span-2' : ''}`}
                    unoptimized={true}
                  />
                );
              }
            })}
            <X
              className="absolute top-2 right-2 bg-white/70 rounded-full p-1 cursor-pointer"
              onClick={() => {
                setUploadedImage(null);
                setShowUpload(true);
              }}
            />
          </div>
        )}
      </div>
      {showUpload && !uploadedImage && (
        <div className="mt-4 flex flex-col items-center justify-center h-[300px] bg-[#F8F9FB] border-2 border-[#d3d3d3] relative">
          <a
            onClick={() => {
              setShowUpload(false);
            }}
            className="absolute -top-2 -right-2  cursor-pointer bg-slate-200 w-8 h-8 rounded-full text-center block items-center text-[23px] leading-[1.3]"
          >
            &times;
          </a>
          <div>
            <Image
              src={icon}
              alt="icon"
              width={70}
              height={70}
              className="text-primary-500"
              unoptimized={true}
            />
          </div>
          <Typography variant="h4" weight="semibold" className="mt-4">
            Upload files
          </Typography>
          <Typography
            variant="h5"
            className="text-center mt-2 text-[#5D5E68]"
            weight="semibold"
          >
            Share images or a single video in your post.
          </Typography>
          <MulltiFileUploader
            files={uploadedImage}
            onFileSelect={(data) => handleFileChange(data)}
          >
            <Button
              variant={'default'}
              size={'md'}
              loading={isUploadingPost}
              className="mt-2 rounded-full"
            >
              Upload from computer
            </Button>
          </MulltiFileUploader>
        </div>
      )}
      <div className="flex flex-wrap flex-col sm:flex-row justify-between mt-3 p-2">
        <div className="flex flex-col sm:flex-row ml-3">
          <div
            onClick={handleShowUpload}
            className={`flex items-center mb-2 sm:mb-0 sm:mr-4 p-2 cursor-pointer ${
              showUpload || uploadedImage
                ? 'bg-[#ECEDF8] text-primary-500 rounded-full'
                : 'text-[#4E5D78]'
            }`}
          >
            <Images
              className={`${showUpload || uploadedImage ? 'text-primary-500' : ''}`}
            />
            <span
              className={`font-semibold ml-1 ${showUpload || uploadedImage ? 'text-primary-500' : ''}`}
            >
              Photo/Video
            </span>
          </div>
          <div
            onClick={() => {
              setShowEmojiPicker((prev) => !prev);
              setShowUpload(false);
            }}
            className={`relative flex items-center mb-2 sm:mb-0 p-2 cursor-pointer ${
              showEmojiPicker
                ? 'bg-[#ECEDF8] text-primary-500 rounded-full'
                : 'text-[#4E5D78]'
            }`}
          >
            <Smile className={`${showEmojiPicker ? 'text-primary-500' : ''}`} />
            <span
              className={`font-semibold ml-1 ${showEmojiPicker ? 'text-primary-500' : ''}`}
            >
              Feeling
            </span>
            {showEmojiPicker && !searchInputFocused && (
              <div
                ref={emojiPickerRef}
                className="absolute below-28 left-28 z-10 bg-white"
              >
                <Picker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>
        </div>
        <Button
          type="submit"
          className="rounded-full w-full sm:w-auto"
          size="md"
          disabled={textAreaValue || uploadedImage ? false : true}
          loading={buttonActionLoading}
          onClick={textAreaValue || uploadedImage ? handleOkClick : () => {}}
        >
          {buttonAction}
        </Button>
      </div>
    </Modal>
  );
};
