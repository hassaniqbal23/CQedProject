'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { messaging } from '../../firebase';
import { getToken, onMessage } from 'firebase/messaging';
import { useMutation } from 'react-query';
import { getFcmTokenFromLocalStorage } from '@/app/utils/helpers';
import { useGlobalState } from '@/app/globalContext/globalContext';
import { createNotifications } from '@/app/api/auth';
import { IFcmToken } from '@/types/auth';
import { updateToken } from '@/app/utils/http';
import { getAccessToken } from '@/app/utils/encryption';
import { Avatar, AvatarImage } from '../ui';
import { Typography } from '../common/Typography/Typography';

export const GqedNotifications = () => {
  const router = useRouter();
  const { userInformation } = useGlobalState();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [fcmToken, setFcmToken] = useState(
    getFcmTokenFromLocalStorage('firebaseToken')
  );

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      updateToken(token);
    } else if (!window.location.search) {
      console.log('checking');
      //   router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    checkAndRequestFirebaseToken();
  }, [router]);

  const checkAndRequestFirebaseToken = async () => {
    const storedToken = localStorage.getItem('firebaseToken');
    if (!storedToken) {
      await requestFirebaseToken();
    }
  };

  const requestFirebaseToken = async () => {
    if (messaging) {
      try {
        const token = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
        });
        localStorage.setItem('firebaseToken', token);
        setFcmToken(token);
      } catch (error) {
        console.error('Error getting Firebase token:', error);
      }
    }
  };

  const playNotificationSound = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  useEffect(() => {
    if (messaging) {
      const onSubscribe = onMessage(messaging, (payload: any) => {
        if (payload.data) {
          const { title, body, image } = payload.data;
          toast(
            <div className="flex items-center">
              {image && (
                <Avatar className="h-12 w-12 rounded-full mr-2">
                  <AvatarImage src={image} alt="Default" />
                </Avatar>
              )}
              <div>
                <Typography variant="h5" weight="semibold">
                  {title}
                </Typography>
                <Typography variant="body" weight="medium">
                  {body}
                </Typography>
              </div>
            </div>,
            {
              icon: false,
              autoClose: 10000,
            }
          );
          playNotificationSound();
        } else {
          toast.warning('Notification received without title and body.');
          playNotificationSound();
        }
      });

      return () => {
        onSubscribe();
      };
    }
  }, [messaging]);

  const { mutate: willSendFireBaseToken } = useMutation((data: IFcmToken) =>
    createNotifications(data)
  );

  useEffect(() => {
    console.log(fcmToken, userInformation, 'fcmToken');
    if (fcmToken && userInformation?.id) {
      willSendFireBaseToken({
        token: String(fcmToken),
        userId: Number(userInformation?.id),
      });
    }
  }, [fcmToken, userInformation]);

  return (
    <>
      <ToastContainer autoClose={1000} />
      <audio ref={audioRef} src="/notification.mp3" preload="auto" />
    </>
  );
};
