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
import { Typography } from '../Typography/Typography';

interface IProps {
  totalMembers: number | string;
  totalDiscussions: number;
  title: string;
  imageSrc: string;
  buttonProps?: ButtonProps;
  className?: string;
}

const Coummuntiycard: FC<IProps> = ({
  totalMembers,
  totalDiscussions,
  title,
  imageSrc,
  buttonProps,
  className = 'bg-primary-50',
}) => {
  return (
    <div>
      <Card className={` w-full mb-2 ${className}`}>
        <div className="flex items-center justify-between ">
          <div className="flex flex-row p-3">
            <div>
              <Avatar className="w-16 h-16 md:w-54 md:h-54 mr-2 rounded-full bg-lightgray  ">
                <AvatarImage src={imageSrc} alt="Profile Picture" />
              </Avatar>
            </div>
            <div className="flex ">
              <div className="flex flex-col">
                <div>
                  <Typography variant="h5" weight={'semibold'}>
                    {title}
                  </Typography>
                </div>
                <div className="flex flex-row items-center">
                  <Users size={13} className="text-[#464650] mb-1 mr-1" />
                  <CardDescription>{totalMembers} Members</CardDescription>
                </div>
                <div className="flex flex-row items-center ">
                  <MessageCircle size={13} className="text-[#464650] mr-1" />
                  <CardDescription>
                    {totalDiscussions}+ Discussions
                  </CardDescription>
                </div>
              </div>
            </div>
          </div>
          <div className="flex mr-5">
            <Button
              {...buttonProps}
              className=" h-[30px] max-w-[222px] p-4  rounded-full "
            >
              Join
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Coummuntiycard;
