import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Dropdown } from '@/components/ui';
import { Card } from '@/components/ui';
import { Typography } from '@/components/common/Typography/Typography';
import {
  getCountry,
  getMutualFriendsText,
  truncateText,
} from '@/app/utils/helpers';
import { MessageCircle, LucideUsers, UserX } from 'lucide-react';
import { useRouter } from 'next/navigation';
import CreateChatModal from '@/components/Chat/ChatContent/CreateChatModal/CreateChatModal';
import { useChatProvider } from '@/components/Chat/ChatProvider/ChatProvider';
import { PenpalShipButtonRequest } from '../PenpalShipButtonRequest/PenpalShipButtonRequest';
import { useModule } from '@/components/ModuleProvider/ModuleProvider';
import { useGlobalState } from '@/app/globalContext/globalContext';
import useSendPenpalRequest from '@/lib/useSendPenpalRequest';
interface PenpalshipCardProps {
  title?: string;
  searchParams?: any;
  label?: string;
  imgPath: string;
  description?: string;
  countryName?: string;
  studentAge: string | number;
  mutualFriends?: number;
  showRemoveButton?: boolean;
  showIcons?: boolean;
  id?: string | number;
  pendingReq?: boolean;
  penpalStatus?: string;
  penpalId?: number;
}

const PenpalshipCard: React.FC<PenpalshipCardProps> = ({
  title,
  imgPath,
  description,
  mutualFriends = 0,
  countryName = '',
  studentAge,
  showRemoveButton = true,
  showIcons = false,
  id,
  penpalStatus = '',
  searchParams,
  penpalId,
}) => {
  const route = useRouter();
  const { setSelectedConversationId } = useChatProvider();
  const { usersIBlocked } = useGlobalState();
  const { deleteRequest } = useSendPenpalRequest();

  const { module } = useModule();

  const mutualFriend = getMutualFriendsText(mutualFriends);

  const truncatedDescription =
    (description && truncateText(description, 12)) || '';

  const { flag = '', country = '' } = getCountry(countryName);

  const handleClick = () => {
    route.push(`/${module}/profile/${id}`);
  };

  const isUserBlocked = (userId: number | string) => {
    return usersIBlocked.some(
      (blockedUser: any) => blockedUser.blockedUserId === userId
    );
  };
  const isBlocked = isUserBlocked(Number(id));

  return (
    <Card className="flex flex-col h-full">
      <div className="flex flex-col flex-grow p-2 rounded-sm">
        <div className="flex p-2 justify-between mt-2">
          <Image
            src={imgPath || '/assets/profile/profile.svg'}
            alt=""
            className="rounded-xl max-h-[52px]"
            width={70}
            height={70}
            unoptimized={true}
          />
          {showRemoveButton && (
            <PenpalShipButtonRequest
              penpalStatus={penpalStatus}
              searchParams={searchParams}
              user_id={id}
              penpalId={Number(penpalId)}
            />
          )}
          {showIcons && (
            <div className="flex gap-2 text-primary-500">
              <CreateChatModal
                defaultReceiverId={Number(id)}
                onChatCreated={(chatId) => {
                  setSelectedConversationId(chatId);
                  route.push(`/${module}/chats`);
                }}
                trigger={
                  <button
                    disabled={isBlocked}
                    className={`bg-[#ECEDF8] w-12 h-12 rounded-full flex items-center justify-center ${isBlocked && 'opacity-60'}`}
                  >
                    <MessageCircle />
                  </button>
                }
              />
              <Dropdown
                trigger={
                  <div>
                    <button className="bg-[#ECEDF8] w-12 h-12 rounded-full flex items-center justify-center">
                      {isBlocked ? <UserX /> : <LucideUsers />}
                    </button>
                  </div>
                }
                options={[
                  {
                    content: (
                      <div
                        className="font-semibold text-red-500 bg-red-50 mx-auto"
                        onClick={() =>
                          deleteRequest({ user_id: Number(penpalId) })
                        }
                      >
                        Unfriend
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          )}
        </div>
        <div className="ml-2">
          <Typography
            variant="body"
            weight="bold"
            className="text-black break-words break-all text-lg font-semibold mt-2"
          >
            <span
              className="cursor-pointer hover:text-gray-700"
              onClick={handleClick}
            >
              {title}
            </span>
          </Typography>
          {mutualFriend && (
            <Typography variant="p" weight="semibold" className="mb-1 text-xs">
              <Link href="" className="text-primary-500">
                {mutualFriend || '\u00A0'}
              </Link>
            </Typography>
          )}
          <Typography
            variant="body"
            weight="medium"
            className="text-[#131517] mt-1 leading-relaxed"
          >
            {truncatedDescription}
          </Typography>
        </div>
        <div className="mt-auto">
          <div className="block sm:flex justify-between p-2 items-center">
            <div className="flex items-center">
              <Image
                src={flag}
                alt="flag"
                className="shadow rounded"
                width={38}
                height={38}
                unoptimized={true}
              />
              <Typography variant="h6" weight="medium" className="ml-2 text-sm">
                {country}
              </Typography>
            </div>
            <div>
              <Typography
                variant="h6"
                weight="medium"
                className="flex text-sm mt-2 sm:mt-0"
              >
                {studentAge} years old
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export { PenpalshipCard };
