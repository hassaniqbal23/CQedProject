import { FC, createContext, useContext, useState } from 'react';
import { IUserInformation } from './types';
import { useQuery } from 'react-query';
import { GetUserInformation, GetUserJoinedCommunities } from '../api/auth';
import { getUserIdLocalStorage } from '../utils/encryption';

type IGlobalState = {
  isUserGetInfo: boolean;
  setIsUserGetInfo: (value: boolean) => void;
  userInformation: IUserInformation;
  setUserInformation: (value: IUserInformation) => void;
  joinedCommunities: any[];
};

export const GlobalState = createContext<IGlobalState>({
  isUserGetInfo: false as boolean,
  setIsUserGetInfo: () => {},
  userInformation: {} as IUserInformation,
  setUserInformation: () => {},
  joinedCommunities: [] as any[],
});

export const GlobalProvider: FC<any> = ({ children }) => {
  const [isUserGetInfo, setIsUserGetInfo] = useState<boolean>(true);
  const [userInformation, setUserInformation] = useState<IUserInformation>(
    {} as IUserInformation
  );
  const [joinedCommunities, setJoinedCommunities] = useState<any[]>([]);
  const userId = getUserIdLocalStorage();

  useQuery(
    ['userInformation', userId],
    () => GetUserInformation(userId as string),
    {
      enabled: userId !== 'undefined' && userId !== null ? true : false,
      onSuccess: (res) => {
        setIsUserGetInfo(false);
        setUserInformation(res.data.data);
      },
      onError: (err) => {
        setIsUserGetInfo(false);
        console.log(err, '======> ERROR');
      },
    }
  );

  useQuery(
    ['UserJoinedCommunities', userId],
    () => GetUserJoinedCommunities(userId as string),
    {
      enabled: userId !== 'undefined' && userId !== null ? true : false,
      onSuccess: (res) => {
        setJoinedCommunities(res?.data?.data || []);
      },
      onError: (err) => {
        setIsUserGetInfo(false);
        console.log(err, '======> ERROR');
      },
    }
  );

  return (
    <GlobalState.Provider
      value={{
        isUserGetInfo,
        setIsUserGetInfo,
        userInformation,
        setUserInformation,
        joinedCommunities,
      }}
    >
      {children}
    </GlobalState.Provider>
  );
};

export const useGlobalState = () => {
  return useContext(GlobalState);
};
