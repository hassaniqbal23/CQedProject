import React, { useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Textarea,
  Form,
  FormField,
  FormMessage,
  Avatar,
  AvatarImage,
  Separator,
  Skeleton,
} from '@/components/ui';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { Typography } from '../Typography/Typography';
import { useGlobalState } from '@/app/globalContext/globalContext';
import CreateChatModal from '@/components/Chat/ChatContent/CreateChatModal/CreateChatModal';
import { useRouter, usePathname } from 'next/navigation';
import { useChatProvider } from '@/components/Chat/ChatProvider/ChatProvider';
import { getCountry } from '@/app/utils/helpers';
import SkeletonCard from '../SkeletonCard/SkeletonCard';

const formSchema = z.object({
  story: z
    .string({
      message: 'Story is required',
    })
    .min(25, {
      message: 'Story should be at least 25 characters',
    }),
});

interface IFriend {
  isTrue?: boolean;
  isPending?: boolean;
}

export interface IPublishStoryViewDialogProps {
  isFriend?: IFriend;
  loading?: {
    isCreatingPenpal: boolean;
    isGettingUserStory: boolean;
  };
  children?: React.ReactNode;
  open: boolean;
  onOpenChange?: () => void;
  onClose?: () => void;
  onAddFriend?: () => void;
  onReply?: () => void;
  initialValue?: string;
  userInfo?: {
    username: string;
    imageUrl: string;
    userId: number;
    location: string;
  };
}

export const PublishStoryViewDialog: React.FC<IPublishStoryViewDialogProps> = ({
  children,
  loading = {
    isCreatingPenpal: false,
    isGettingUserStory: false,
  },
  open,
  onOpenChange,
  onClose,
  onAddFriend,
  initialValue,
  userInfo,
  isFriend,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      story: initialValue,
    },
  });

  useEffect(() => {
    if (initialValue) {
      form.setValue('story', initialValue);
    }
  }, [initialValue]);

  const { userInformation } = useGlobalState();
  const { country = '', flag = '' } = getCountry(userInfo?.location || '');
  const router = useRouter();
  const pathname = usePathname();
  const { setSelectedConversationId } = useChatProvider();

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="max-w-[600px] max-h-[800] p-0">
        {loading?.isGettingUserStory ? (
          <div>
            <SkeletonCard
              noOfCards={1}
              className="md:grid-cols-1 xl:grid-cols-1"
            />
          </div>
        ) : (
          <Form {...form}>
            <form className="space-y-4">
              <AlertDialogHeader className="px-6 pb-1 pt-6">
                <AlertDialogTitle className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Avatar className="w-14 h-14 rounded-full bg-lightgray ">
                      <AvatarImage
                        height={59}
                        width={59}
                        src={userInfo?.imageUrl}
                        alt="Profile Picture"
                      />
                    </Avatar>
                    <div className="ml-3">
                      <Typography variant="h5" weight="semibold">
                        {userInfo?.username}
                      </Typography>
                      <div className="flex items-center">
                        {userInfo?.location && (
                          <Image
                            className="mr-2"
                            src={flag}
                            height={30}
                            width={30}
                            alt="view-Story"
                            unoptimized={true}
                          />
                        )}
                        <Typography variant="h5" weight="regular">
                          {country}
                        </Typography>
                      </div>
                    </div>
                  </div>

                  <X className="cursor-pointer" onClick={onClose} />
                </AlertDialogTitle>
              </AlertDialogHeader>
              <Separator />
              <FormField
                control={form.control}
                name="story"
                render={({ field }) => (
                  <>
                    <div className="px-5">
                      <Textarea
                        className="border-0"
                        readOnly
                        placeholder="Tell us about yourself, What makes you smile?"
                        rows={20}
                        {...field}
                      ></Textarea>
                    </div>
                    <FormMessage className="mt-2" />
                  </>
                )}
              />
              <AlertDialogFooter className="gap-4 px-5 py-6">
                <div className="flex items-center">
                  {initialValue && (
                    <>
                      {userInformation?.id !== userInfo?.userId && (
                        <>
                          {!isFriend?.isTrue ? (
                            <Button
                              className="rounded-full h-12"
                              size="md"
                              variant="info"
                              loading={loading?.isCreatingPenpal}
                              onClick={onAddFriend}
                              type="button"
                            >
                              Add Friend
                            </Button>
                          ) : isFriend?.isTrue && !isFriend.isPending ? (
                            <CreateChatModal
                              defaultReceiverId={userInfo?.userId}
                              onChatCreated={(id) => {
                                setSelectedConversationId(id);
                                if (pathname?.startsWith('/student')) {
                                  router.push(`/students/chats`);
                                } else if (pathname?.startsWith('/teacher')) {
                                  router.push(`/teachers/chats`);
                                }
                              }}
                              trigger={
                                <Button
                                  className="ml-5 rounded-full h-12"
                                  size="md"
                                  variant="outline"
                                  type="button"
                                >
                                  Reply
                                </Button>
                              }
                            />
                          ) : (
                            <Button
                              className="rounded-full h-12"
                              size="md"
                              variant="info"
                              disabled
                              type="button"
                            >
                              Request Pending
                            </Button>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
              </AlertDialogFooter>
            </form>
          </Form>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};
