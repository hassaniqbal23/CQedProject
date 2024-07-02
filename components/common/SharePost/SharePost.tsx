import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import { Typography } from '../Typography/Typography';
import { Avatar, AvatarImage, Button, Separator, Textarea } from '@/components/ui';
import { useGlobalState } from '@/app/globalContext/globalContext';
import { SelectV2 } from '@/components/ui/select-v2/select-v2';
import Image from 'next/image';
import dayjs from 'dayjs';

interface ISharePost {
  openModalButton: React.ReactNode;
  isVisible: boolean;
  setIsVisible: (val: boolean) => void;
  title: string;
  defaultReceiverId?: string;
  onShare?: (data: {
    content: string;
    communityId?: number | string | null;
  }) => void;
  post?: {
    userFullName: string;
    username: string;
    created_at: string;
    description: string;
    attachment?: string;
    userImage?: string;
  };
}

function SharePost({
  openModalButton,
  isVisible,
  setIsVisible,
  title,
  post,
  onShare,
}: ISharePost) {
  const { joinedCommunities } = useGlobalState();
  const [textAreaValue, setTextAreaValue] = useState('');
  const [selectedCommunityId, setSelectedCommunityId] = useState<number | null>(null);

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      minHeight: '48px',
      borderRadius: '8px',
      borderColor: '#d1d5db',
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
    }),
    input: (provided: any) => ({
      ...provided,
      height: '48px',
      padding: '0',
    }),
    singleValue: (provided: any) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
    }),
    placeholder: (provided: any) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
    }),
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
        <div className="mb-3">
          <Textarea
            placeholder="What would you like to share?"
            className="w-full h-[100px] bg-[#F8F9FB]"
            value={textAreaValue}
            onChange={(e) => setTextAreaValue(e.target.value)}
          />
        </div>
        <div className="rounded-lg border shadow-sm w-full">
          {post?.attachment && (
            <div className="">
              <Image
                loading="lazy"
                src={post?.attachment}
                alt="post"
                width={500}
                height={150}
                className="rounded-md w-full h-[150px] object-cover"
                unoptimized={true}
              />
            </div>
          )}
          <div className="flex gap-3 items-center my-4 p-3">
            <div>
              <Avatar className="w-14 h-14 md:w-54 md:h-54 rounded-full bg-lightgray mb-3">
                <AvatarImage src={post?.userImage} alt="Profile Picture" />
              </Avatar>
            </div>
            <div className="">
              <Typography variant="h5" weight="semibold">
                {post?.userFullName}
              </Typography>
              <div>
                <Typography variant="h5" weight="regular">
                  @{post?.username}
                  <span className="mx-2">.</span>
                  {dayjs(post?.created_at).fromNow()}
                </Typography>
              </div>
              <Typography variant="h5" weight="regular">
                {post?.description && (
                  <>
                    {post?.description.split(' ').slice(0, 10).join(' ')}
                    {post?.description?.split(' ').length > 10 ? '...' : ''}
                  </>
                )}
              </Typography>
            </div>
          </div>
        </div>
        <Separator className="mb-3" />
        <div>
          <Typography variant="h5" weight="semibold" className="mb-2">
            Or Share in community
          </Typography>
          <SelectV2
            options={
              joinedCommunities?.map((community: any) => ({
                label: community?.name,
                image: community?.profile_picture?.file_path,
                value: community?.id,
              })) || []
            }
            formatOptionLabel={(option: any) => {
              return (
                <div className="flex items-center gap-[3px] cursor-pointer">
                  <Avatar className="items-center">
                    <AvatarImage
                      src={option?.image}
                      className="w-8 h-8 rounded-full"
                    />
                  </Avatar>
                  <Typography variant="h5" weight="medium" className="mr-2">
                    {option?.label}
                  </Typography>
                </div>
              );
            }}
            className="font-semibold"
            classNamePrefix={'select'}
            onChange={(value: any) => {
              setSelectedCommunityId(value.value);
            }}
            styles={customStyles}
          />
        </div>
      </div>
      <div className="flex w-full items-center justify-end">
        <Button
          className="px-6"
          onClick={() => {
            if (onShare) {
              onShare({
                content: textAreaValue,
                communityId: selectedCommunityId,
              });
              setIsVisible(false);
              setTextAreaValue('');
            }
          }}
        >
          Share Post
        </Button>
      </div>
    </Modal>
  );
}

export default SharePost;
