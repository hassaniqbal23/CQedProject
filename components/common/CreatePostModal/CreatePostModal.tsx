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

const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false });

interface CreatePostModalProps {
  title?: string;
  textarea?: string;
  buttonTrigger: string;
  description?: string;
  buttonAction?: string;
  icon: string;
}

export const CreatePostModal = ({
  icon,
  title,
  textarea,
  description,
  buttonAction,
  buttonTrigger,
}: CreatePostModalProps) => {
  const [showUpload, setShowUpload] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState(textarea || '');
  const [searchInputFocused, setSearchInputFocused] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  const handleSearchInputFocus = () => {
    setSearchInputFocused(true);
  };

  const handleSearchInputBlur = () => {
    setSearchInputFocused(false);
  };

  const handleFileUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        setShowUpload(false);
      };
      reader.readAsDataURL(file);
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
    <Button variant="outline" size="md" onClick={() => setIsVisible(true)}>
      {buttonTrigger}
    </Button>
  );

  const handleOkClick = () => {
    // Handle OK click logic here
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
            className={`w-full ${
              uploadedImage ? 'h-[100px]' : 'h-[300px]'
            } bg-[#F8F9FB]`}
            value={textAreaValue}
            onChange={(e) => setTextAreaValue(e.target.value)}
          />
        )}
        {uploadedImage && (
          <div className="relative mt-4">
            <Image
              src={uploadedImage}
              alt="Uploaded"
              width={100}
              height={100}
              className="w-full h-auto max-h-[300px] object-cover rounded-2xl"
            />
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
        <div className="mt-4 flex flex-col items-center justify-center h-[300px] bg-[#F8F9FB] border-2 border-[#d3d3d3]">
          <div>
            <Image
              src={icon}
              alt="icon"
              width={70}
              height={70}
              className="text-[#4146B8]"
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
          <Button
            variant={'default'}
            size={'md'}
            className="mt-2 rounded-full"
            onClick={handleFileUploadClick}
          >
            Upload from computer
            <Input
              type="file"
              id="picture"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </Button>
        </div>
      )}
      <div className="flex flex-col sm:flex-row justify-between mt-3 p-2">
        <div className="flex flex-col sm:flex-row ml-3">
          <div
            onClick={handleShowUpload}
            className={`flex items-center mb-2 sm:mb-0 sm:mr-4 p-2 cursor-pointer ${
              showUpload || uploadedImage
                ? 'bg-[#ECEDF8] text-[#4146B8] rounded-full'
                : 'text-[#4E5D78]'
            }`}
          >
            <Images
              className={`${showUpload || uploadedImage ? 'text-[#4146B8]' : ''}`}
            />
            <span
              className={`font-semibold ml-1 ${
                showUpload || uploadedImage ? 'text-[#4146B8]' : ''
              }`}
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
                ? 'bg-[#ECEDF8] text-[#4146B8] rounded-full'
                : 'text-[#4E5D78]'
            }`}
          >
            <Smile className={`${showEmojiPicker ? 'text-[#4146B8]' : ''}`} />
            <span
              className={`font-semibold ml-1 ${
                showEmojiPicker ? 'text-[#4146B8]' : ''
              }`}
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
          onClick={handleOkClick}
        >
          {buttonAction}
        </Button>
      </div>
    </Modal>
  );
};
