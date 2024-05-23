import Image from 'next/image';
import React, { FC } from 'react';
import { Avatar, AvatarImage } from '@/components/ui';
import { Ellipsis } from 'lucide-react';
import { Dropdown } from '@/components/ui';

interface Iprops {
  date: string;
  userImage: string;
  content: string;
  translateImage: string;
  UserMessage: string;
  isUserMessage: boolean;
  onDeleteSubject?: (id: string) => void;
  onEditSubjectName?: (id: string, name: string) => void;
}

const ChatMessage: FC<Iprops> = ({
  date,
  userImage,
  content,
  isUserMessage,
  onDeleteSubject,
  onEditSubjectName,
}: Iprops) => {
  return (
    <div
      className={`flex flex-col m-10 gap-4 ${isUserMessage ? 'items-end' : 'items-start'}`}
    >
      <div
        className={`flex gap-4 items-start ${isUserMessage ? 'flex-row-reverse' : ''}`}
      >
        <Avatar className="w-14 h-14 rounded-full bg-lightgray">
          <AvatarImage src={userImage} alt="Profile Picture" />
        </Avatar>
        <div
          className={`flex items-center gap-2 ${isUserMessage ? 'flex-row-reverse' : 'flex-row'}`}
        >
          <h1
            className={`font-medium font-montserrat max-w-lg rounded-sm text-14 leading-26 p-3 ${isUserMessage ? 'text-[#4E5D78] bg-gray-50' : 'text-white bg-[#377DFF]'}`}
          >
            {content}
          </h1>
          <div className="relative">
            <Dropdown
              trigger={
                <div>
                  <Ellipsis className="cursor-pointer" />
                </div>
              }
              options={[
                {
                  content: (
                    <div
                      onClick={() =>
                        onDeleteSubject && onDeleteSubject('subject-id')
                      }
                    >
                      Remove Subject
                    </div>
                  ),
                },
                {
                  content: (
                    <div
                      onClick={() =>
                        onEditSubjectName &&
                        onEditSubjectName('subject-id', 'subject-name')
                      }
                    >
                      Edit Subject
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
