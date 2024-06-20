import React, { FC, useState } from 'react';
import { Avatar, AvatarImage, Button } from '@/components/ui';
import { Typography } from '@/components/common/Typography/Typography';
import { CircleAlert, PhoneOff, Trash2 } from 'lucide-react';
import { useMutation, useQueryClient } from 'react-query';
import { blockUser, unblockUser, reportUser } from '@/app/api/users';
import { useGlobalState } from '@/app/globalContext/globalContext';
import { ReportClassDialog } from '@/components/common/DeleteClassModal/ReportClassModal';
import { useChatProvider } from '../../ChatProvider/ChatProvider';
import Image from 'next/image';
import { ChatConversation } from '@/types/chat';
import { useRouter, usePathname } from 'next/navigation';
import { ChatConversation } from '@/types/chat';
import { useRouter, usePathname } from 'next/navigation';

interface IProps {
  conversation: ChatConversation;
  conversation: ChatConversation;
  onChatDelete?: () => void;
}

export const ConversationUserSheet: FC<IProps> = ({
  conversation,
  conversation,
  onChatDelete,
}) => {
  const { usersIBlocked } = useGlobalState();
  const queryClient = useQueryClient();
  const route = useRouter();
  const pathname = usePathname();
  const { currentConversationAttachments } = useChatProvider();
  const route = useRouter();
  const pathname = usePathname();

  const [report, setReport] = useState(false);

  const { mutate: blockUserMutation, isLoading: isBlockingUser } = useMutation(
    (userId: number) => blockUser(userId),
    {
      onSuccess: (data) => {
        queryClient.refetchQueries('get-users-i-blocked');
      },
      onError: (error) => {
        console.log('Error blocking user', error);
      },
    }
  );

  const { mutate: unblockUserMutation, isLoading: isUnBlockingUser } =
    useMutation((blockedUserId: number) => unblockUser(blockedUserId), {
      onSuccess: () => {
        queryClient.refetchQueries('get-users-i-blocked');
      },
      onError: (error) => {
        console.log('Error unblocking user', error);
      },
    });

  const { mutate: reportUserMutation, isLoading: isReportingUser } =
    useMutation(
      ({ userId, reportText }: { userId: number; reportText: string }) =>
        reportUser(userId, reportText),
      {
        onSuccess: () => {
          queryClient.refetchQueries('get-users-i-blocked');
        },
        onError: (error) => {
          console.log('Error reporting user', error);
        },
      }
    );

  const isUserBlocked = (userId: number | string) => {
    return usersIBlocked.some(
      (blockedUser: any) => blockedUser.blockedUserId === userId
    );
  };

  const getBlockedUserId = (userId: number | string) => {
    const blockedUser = usersIBlocked.find(
      (blockedUser: any) => blockedUser.blockedUserId === userId
    );
    return blockedUser ? blockedUser.id : null;
  };

  const handleBlockUnblock = () => {
    if (conversation) {
      const blockedUserId = getBlockedUserId(Number(conversation.user.id));
      if (blockedUserId) {
        unblockUserMutation(blockedUserId);
      } else {
        blockUserMutation(Number(conversation.user.id));
      }
      if (conversation) {
        const blockedUserId = getBlockedUserId(Number(conversation.user.id));
        if (blockedUserId) {
          unblockUserMutation(blockedUserId);
        } else {
          blockUserMutation(Number(conversation.user.id));
        }
      }
    };

    const ChatSidebarActions = [
      {
        icon: <CircleAlert size={18} />,
        label: 'Report',
        command: function () {
          setReport(true);
        },
      },
      {
        icon: <PhoneOff size={18} />,
        label: isUserBlocked(Number(conversation?.user?.id))
          ? 'Unblock'
          : 'Block',
        label: isUserBlocked(Number(conversation?.user?.id))
          ? 'Unblock'
          : 'Block',
        command: handleBlockUnblock,
      },
      {
        icon: <Trash2 size={18} color="red" />,
        label: 'Delete',
        command: function () {
          if (onChatDelete) {
            onChatDelete();
          }
        },
      },
    ];

    const handleReport = (reportText?: string) => {
      if (reportText) {
        reportUserMutation({
          userId: Number(conversation?.user?.id),
          reportText,
        });
        reportUserMutation({
          userId: Number(conversation?.user?.id),
          reportText,
        });
      }
      setReport(false);
    };

    return (
      <div className="p-6 h-full overflow-y-auto">
        <div className="flex flex-col items-center">
          <Avatar className="w-[150px] h-[150px] rounded-full bg-lightgray">
            <AvatarImage
              src={
                conversation?.user?.attachment?.file_path ||
                '/assets/profile/profile.svg'
              }
              alt="Profile Picture"
            />
            <AvatarImage
              src={
                conversation?.user?.attachment?.file_path ||
                '/assets/profile/profile.svg'
              }
              alt="Profile Picture"
            />
          </Avatar>
          <Typography
            variant="p"
            weight="medium"
            className="text-[#131517] text-[20px] font-semibold text-center mt-4"
          >
            {conversation?.user?.name}
            {conversation?.user?.name}
          </Typography>
          <Button
            onClick={() => {
              if (pathname?.startsWith('/student')) {
                route.push(`/students/profile/${conversation.user.id}`);
              } else if (pathname?.startsWith('/teacher')) {
                route.push(`/teachers/profile/${conversation.user.id}`);
              }
            }}
            className="rounded-full bg-[#2183C4] text-[#F5FBFF] text-sm w-32 h-10 mt-3"
          >
            <Button
              onClick={() => {
                if (pathname?.startsWith('/student')) {
                  route.push(`/students/profile/${conversation.user.id}`);
                } else if (pathname?.startsWith('/teacher')) {
                  route.push(`/teachers/profile/${conversation.user.id}`);
                }
              }}
              className="rounded-full bg-[#2183C4] text-[#F5FBFF] text-sm w-32 h-10 mt-3"
            >
              View Profile
            </Button>
        </div>
        <div>
          <Typography
            variant="p"
            weight="medium"
            className="text-[#414141] text-[16px] font-semibold mt-3 mb-1"
          >
            Media
          </Typography>
          {currentConversationAttachments[0] && (
            <div>
              <Image
                alt="logo"
                width={280}
                height={50}
                className="rounded-md cursor-pointer hover:shadow-sm"
                src={currentConversationAttachments[0].file_path}
                unoptimized={true}
              />
            </div>
          )}
          <div className="py-1 grid grid-cols-4 gap-2 max-h-[200px] overflow-y-auto">
            {currentConversationAttachments.map(
              (attachment: { file_path: string }, index) => {
                if (index === 0 || index > 8) return null;
                return (
                  <Image
                    alt="logo"
                    width={60}
                    height={50}
                    className="rounded-md cursor-pointer hover:shadow-sm"
                    src={attachment.file_path}
                    unoptimized={true}
                  />
                );
              }
            )}
          </div>
        </div>
        <div className="border-[0.9px] my-2" />
        <div className="w-full">
          {ChatSidebarActions.map(({ icon, label, command }, index) => (
            <div className="my-1" key={index}>
              <button
                className="flex items-center w-full py-3 px-4 hover:bg-primary-50 rounded-md duration-300"
                onClick={() => {
                  command();
                }}
              >
                <span className="text-sm">{icon}</span>
                <Typography
                  variant="p"
                  weight="medium"
                  className="text-[#393939] text-[14px] font-medium ml-2"
                >
                  {label}
                </Typography>
              </button>
            </div>
          ))}
        </div>
        <div className="border-[0.9px] my-2" />
        <ReportClassDialog
          title="Report User"
          description="Are you sure you want to report this user?"
          ButtonAction="Report"
          ButtonCancel="Cancel"
          open={report}
          onClose={() => setReport(false)}
          onClickOk={handleReport}
        />
      </div>
    );
  };
