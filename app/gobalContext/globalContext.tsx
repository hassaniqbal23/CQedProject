'use client';
import { FC, createContext, useContext, useEffect, useState } from 'react';
import { IUserInformation } from './types';
import { useQuery } from 'react-query';
import { GetUserInfomation } from '../api/auth';
import { getUserIdLocalStorage } from '../utils/encryption';

type IGlobalState = {
  isUserGetInfo: boolean;
  setIsUserGetInfo: (value: boolean) => void;
  userInformation: IUserInformation;
  setUserInformation: (value: IUserInformation) => void;
};

export const GlobalState = createContext<IGlobalState>({
  isUserGetInfo: false as boolean,
  setIsUserGetInfo: () => {},
  userInformation: {} as IUserInformation,
  setUserInformation: () => {},
});

export const GlobalProvider: FC<any> = ({ children }) => {
  const [isUserGetInfo, setIsUserGetInfo] = useState<boolean>(false);
  const [userInformation, setUserInformation] = useState<IUserInformation>(
    {} as IUserInformation
  );

  const userInfo = (id: string) => {
    return useQuery(['userInformation', id], () => GetUserInfomation(id), {
      staleTime: 1000,
    });
  };
  const userId = getUserIdLocalStorage();
  const { data } = userInfo(userId as string);

  useEffect(() => {
    if (data) {
      console.log(data.data.data, 'data');
      setUserInformation(data.data.data);
    }
  }, []);

  return (
    <GlobalState.Provider
      value={{
        isUserGetInfo,
        setIsUserGetInfo,
        userInformation,
        setUserInformation,
      }}
    >
      {children}
    </GlobalState.Provider>
  );
};

export const useGlobalState = () => {
  return useContext(GlobalState);
};
