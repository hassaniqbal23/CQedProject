import React, { FC } from 'react';
import { Avatar, AvatarImage } from '@/components/ui';
import { Card, CardDescription } from '@/components/ui/card/card';
import { Button, ButtonProps } from '@/components/ui';
import { Users, MessageCircle } from 'lucide-react';
import { Typography } from '../Typography/Typography';
import Link from 'next/link';
import { useModule } from '@/components/ModuleProvider/ModuleProvider';

interface IProps {
  totalMembers: number | string;
  totalDiscussions: number;
  title: string;
  imageSrc: string;
  buttonProps?: ButtonProps;
  className?: string;
  id: number;
}

const Coummuntiycard: FC<IProps> = ({
  totalMembers,
  totalDiscussions,
  title,
  imageSrc,
  buttonProps,
  className = 'bg-primary-50',
  id,
}) => {
  const { module } = useModule();

  return (
    <div className="max-w-full">
      <Card className={`mb-2 ${className}`}>
        <div className="flex items-center justify-between flex-col xl:flex-row ">
          <Link href={`/${module}/cq-communities/${id}`}>
            <div className="flex flex-row p-3">
              <div>
                <Avatar className="w-16 h-16 md:w-54 md:h-54 mr-2 rounded-full bg-lightgray  ">
                  <AvatarImage src={imageSrc} alt="Profile Picture" />
                </Avatar>
              </div>
              <div className="flex flex-col">
                <div>
                  <Typography
                    variant="h5"
                    weight={'semibold'}
                    className="whitespace-nowrap"
                  >
                    {title.length > 10 ? `${title.substr(0, 10)}...` : title}
                  </Typography>
                </div>
                <div className="flex flex-row whitespace-nowrap items-center">
                  <Users size={13} className="text-[#464650] mb-1 mr-1" />
                  <CardDescription>{totalMembers} Members</CardDescription>
                </div>
                <div className="flex flex-row whitespace-nowrap items-center justify-center">
                  {totalDiscussions > 0 ? (
                    <>
                      <MessageCircle
                        size={13}
                        className="text-[#464650] mr-1"
                      />
                      <CardDescription>
                        {totalDiscussions}+ Discussions
                      </CardDescription>
                    </>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
          </Link>
          <div className="flex mr-3 mb-2">
            <Button
              {...buttonProps}
              className="mt-2 xl:mt-0 xl:ml-5 h-[30px] max-w-[222px] p-4 rounded-full"
            ></Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Coummuntiycard;
