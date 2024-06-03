import React from 'react';
import { Notification } from '../Notification';
import { Typography } from '../../common/Typography/Typography';
import { Button } from '../../ui';

interface NotificationPageProps {
  title: string;
  subTitle: string;
  buttonText: string;
  buttonOnClick: () => void;
}

export const NotificationPage: React.FC<NotificationPageProps> = ({
  title,
  subTitle,
  buttonText,
  buttonOnClick,
}) => {
  return (
    <div className="">
      <div className="px-4 flex flex-wrap items-center justify-between mb-4">
        <div>
          <Typography variant="h2" weight="bold">
            {title}
          </Typography>
          <Typography variant="p" weight="regular" className="text-gray-600">
            {subTitle}
          </Typography>
        </div>
        <div>
          <Button
            size={'md'}
            variant={'outline'}
            className=" text-primary-900 bg-[#ECEDF8] "
            onClick={buttonOnClick}
          >
            {buttonText}
          </Button>
        </div>
      </div>
      <div className="mt-14">
        <Notification
          avatar={'/avatar1.svg'}
          message={
            <>
              Your Invitation has been accepted. <b>stmaryhighschool@</b>
            </>
          }
          actions={() => (
            <span className="text-xs text-gray-500">30 Minutes ago</span>
          )}
        />
        <Notification
          avatar={'/avatar2.svg'}
          message={
            <>
              Your Invitation has been accepted.{' '}
              <b>tokyointernationalschool@</b>
            </>
          }
          actions={() => (
            <span className="text-xs text-gray-500">35 Minutes ago</span>
          )}
        />
        <Notification
          avatar={'/avatar3.svg'}
          message={
            <>
              <b>ASArtist</b> Invite you to join their group
            </>
          }
          actions={() => (
            <div className="flex items-center flex-wrap">
              <Button
                size={'md'}
                className="bg-primary-500 text-white rounded-full px-24 mb-3 md:mb-0"
              >
                Join
              </Button>
              <Button
                size={'md'}
                className="border border-solid border-primary-500 text-primary-500  px-24 rounded-full ml-4 bg-transparent"
              >
                Reject
              </Button>
            </div>
          )}
        />
        <Notification
          avatar={'/avatar1.svg'}
          message={
            <>
              Your Invitation has been accepted.{' '}
              <b>tokyointernationalschool@</b>
            </>
          }
          actions={() => (
            <span className="text-xs text-gray-500">08:20 pm</span>
          )}
        />
      </div>
    </div>
  );
};
