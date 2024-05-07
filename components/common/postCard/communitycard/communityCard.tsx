import React, { FC } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/card';
import { Button, ButtonProps } from '@/components/ui';
import { Users, MessageCircle } from 'lucide-react';

interface IProps {
  totalMembers: number | string;
  totalDiscussions: number;
  title: string;
  imageSrc: string;
  buttonProps: ButtonProps;
}

const Coummuntiycard: FC<IProps> = ({
  totalMembers,
  totalDiscussions,
  title,
  imageSrc,
  buttonProps,
}) => {
  return (
    <div>
      <Card className="flex w-full p-4 items-center gap-18 rounded-10 bg-primary-50 border border-gray-800">
        <Avatar className="w-20 h-20 md:w-54 md:h-54 rounded-full bg-lightgray mb-3 border border-gray-950 ">
          <AvatarImage src={imageSrc} alt="Profile Picture" />
        </Avatar>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <div className="flex">
            <Users size={20} className="text-[#464650]" />
            <CardDescription>{totalMembers} Members</CardDescription>
          </div>
          <div className="flex">
            <MessageCircle size={20} className="text-[#464650]" />
            <CardDescription>{totalDiscussions}+ Discussions</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Button
            {...buttonProps}
            className="flex h-[30px] max-w-[222px] px-[16px] justify-center items-center rounded-xl mt-8"
          >
            {' '}
            Join
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Coummuntiycard;
