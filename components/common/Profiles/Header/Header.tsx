import React, { useState } from 'react';
import { Button, Dropdown } from '@/components/ui';
import { MapPin } from 'lucide-react';
import Image from 'next/image';
import { Avatar, AvatarImage } from '@/components/ui';
import { Typography } from '@/components/common/Typography/Typography';
import { IoChevronDown, IoChatbubbleOutline } from 'react-icons/io5';
import { getCountry } from '@/app/utils/helpers';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import CreateChatModal from '@/components/Chat/ChatContent/CreateChatModal/CreateChatModal';
import { useChatProvider } from '@/components/Chat/ChatProvider/ChatProvider';
import { useMutation, useQueryClient } from 'react-query';
import { blockUser, reportUser, unblockUser } from '@/app/api/users';
import { ReportClassDialog } from '../../DeleteClassModal/ReportClassModal';
import { useGlobalState } from '@/app/globalContext/globalContext';
import { useModule } from '@/components/ModuleProvider/ModuleProvider';

interface HeaderProps {
  name?: string;
  role?: string;
  isVisible?: boolean;
  location?: string;
  profileIcon?: string;
  subrole?: string;
  titleClass?: string;
  age?: string;
  gender?: string;
  country?: string;
  mutualFriends?: string;
  profileId?: string;
  loggedInUser?: boolean;
  buttonProps?: {
    isVisbile?: boolean;
    onClick?: () => void;
    buttonText?: string;
    isFriend?: boolean;
    isLoading?: boolean;
  };
  imageSize?: {
    height?: number;
    width?: number;
  };
}

export const ProfileHeader: React.FC<HeaderProps> = ({
  name,
  role,
  location,
  profileIcon,
  subrole,
  imageSize,
  buttonProps,
  titleClass = 'text-xl',
  age,
  gender,
  country = '',
  mutualFriends,
  profileId,
  loggedInUser,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const { module } = useModule();
  const queryClient = useQueryClient();
  const { usersIBlocked } = useGlobalState();

  const { flag = '', country: countryName = '' } = getCountry(country);
  const { setSelectedConversationId } = useChatProvider();
  const [report, setReport] = useState(false);

  const { mutate: reportUserMutation, isLoading: isReportingUser } =
    useMutation(
      ({ userId, reportText }: { userId: number; reportText: string }) =>
        reportUser(userId, reportText),
      {
        onSuccess: () => {
          console.log('User reported..!');
        },
        onError: (error) => {
          console.log('Error reporting user', error);
        },
      }
    );

  const { mutate: blockProfile } = useMutation(
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

  const { mutate: unBlockProfile } = useMutation(
    (blockedUserId: number) => unblockUser(blockedUserId),
    {
      onSuccess: () => {
        queryClient.refetchQueries('get-users-i-blocked');
      },
      onError: (error) => {
        console.log('Error unblocking user', error);
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
    const blockedUserId = getBlockedUserId(Number(profileId));
    if (blockedUserId) {
      unBlockProfile(blockedUserId);
    } else {
      blockProfile(Number(profileId));
    }
  };

  const handleReport = (reportText?: string) => {
    if (reportText) {
      reportUserMutation({
        userId: Number(profileId),
        reportText,
      });
    }
    !isReportingUser && setReport(false);
  };

  return (
    <div className="flex items-center  flex-wrap justify-between w-full bg-primary-500 rounded-2xl text-white p-3 md:p-6 shadow-md text-left md:text-left">
      <div className="flex items-center">
        <Avatar className="h-32 w-32">
          <AvatarImage src={profileIcon} alt="Profile Picture" />
        </Avatar>
        <div className="ml-6">
          {name && <h1 className={`font-bold mb-2 ${titleClass}`}>{name}</h1>}
          {role && (
            <p className="text-[#F1F1F1CC] text-sm">
              {role} at <span className="text-white ml-1">{subrole}</span>
            </p>
          )}
          {(age || gender) && (
            <p className="text-white text-base mb-2">
              {age}, <span className=" ml-1">{gender}</span>
            </p>
          )}
          {location && (
            <div className="flex items-center mt-3 md:mt-5">
              <MapPin strokeWidth={'2px'} color="#FFD249" size={16} />
              <p className="text-lg ml-2 ">{location}</p>
            </div>
          )}
          {country && (
            <div className="flex items-center">
              <Image
                src={flag}
                alt="flag"
                className="rounded-md"
                width={38}
                height={38}
                unoptimized={true}
              />
              <Typography variant="h6" weight="medium" className="ml-2 text-xl">
                {countryName}
              </Typography>
            </div>
          )}
        </div>
      </div>
      <div className="text-center">
        {profileId && (
          <Typography
            variant="p"
            weight="semibold"
            className="mb-10 text-base pt-2 "
          >
            Profile Id: {profileId}
          </Typography>
        )}
        {buttonProps?.isVisbile && (
          <>
            {buttonProps.isFriend ? (
              <div className="flex">
                <CreateChatModal
                  defaultReceiverId={Number(profileId)}
                  onChatCreated={(id) => {
                    setSelectedConversationId(id);
                    router.push(`/${module}/chats`);
                  }}
                  trigger={
                    <Button
                      onClick={() => {}}
                      icon={<IoChatbubbleOutline size={20} />}
                      iconPosition="left"
                      className={`rounded-full bg-[#ECEDF8] text-primary-500 h-10 text-base mr-2 hover: border border-white`}
                      variant={'outline'}
                      type="button"
                      size={'sm'}
                    ></Button>
                  }
                />
                <Dropdown
                  trigger={
                    <div>
                      <Button
                        onClick={() => {}}
                        iconPosition="right"
                        icon={<IoChevronDown />}
                        className={`rounded-full bg-[#ECEDF8] text-primary-500 w-36 h-10 text-base hover: border border-white`}
                        variant={'outline'}
                        type="button"
                        size={'sm'}
                      >
                        Friends
                      </Button>
                    </div>
                  }
                  options={[
                    {
                      content: (
                        <div className="text-xs" onClick={buttonProps.onClick}>
                          Unfriend
                        </div>
                      ),
                    },
                    {
                      content: (
                        <div className="text-xs" onClick={handleBlockUnblock}>
                          {isUserBlocked(Number(profileId))
                            ? 'Unblock'
                            : 'Block'}
                        </div>
                      ),
                    },
                    {
                      content: (
                        <div
                          className="text-xs text-primary-600 font-semibold"
                          onClick={() => {
                            setReport(true);
                          }}
                        >
                          Report profile
                        </div>
                      ),
                    },
                  ]}
                />
              </div>
            ) : (
              <div>
                <Button
                  onClick={buttonProps?.onClick}
                  className={`rounded-full bg-[#ECEDF8] text-primary-500 w-36 h-10 text-base hover: border border-white`}
                  variant={'outline'}
                  type="button"
                  size={'sm'}
                  loading={buttonProps?.isLoading}
                >
                  {buttonProps.buttonText}
                </Button>
                {!loggedInUser && (
                  <Typography
                    variant="p"
                    weight="semibold"
                    className="mb-1 text-xs pt-2"
                  >
                    <Link href="" className="">
                      {mutualFriends}
                    </Link>
                  </Typography>
                )}
              </div>
            )}
          </>
        )}
      </div>
      <ReportClassDialog
        title="Report User"
        description="Are you sure you want to report this user?"
        ButtonAction="Report"
        ButtonCancel="Cancel"
        open={report}
        okLoading={isReportingUser}
        onClose={() => setReport(false)}
        onClickOk={handleReport}
      />
    </div>
  );
};

ProfileHeader.displayName = 'ProfileHeader';
