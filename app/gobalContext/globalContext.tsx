import { FC, createContext, useContext, useState } from 'react';
import { IUserInformation } from './types';
import { useQuery } from 'react-query';
import { GetUserInformation, GetUserJoinedCommunities } from '../api/auth';
import {
  getUserIdLocalStorage,
  removeToken,
  removeUserId,
} from '../utils/encryption';
import { myPenpals as getMyPenpals } from '../api/penpals';

type IGlobalState = {
  isUserGetInfo: boolean;
  setIsUserGetInfo: (value: boolean) => void;
  userInformation: IUserInformation;
  setUserInformation: (value: IUserInformation) => void;
  joinedCommunities: any[];
  myPenpals: any[];
  setIsAuthenticated?: (value: boolean) => void;
  isAuthenticated?: boolean;
  logout: () => void;
};

export const GlobalState = createContext<IGlobalState>({
  isUserGetInfo: false as boolean,
  setIsUserGetInfo: () => {},
  userInformation: {} as IUserInformation,
  setUserInformation: () => {},
  joinedCommunities: [] as any[],
  myPenpals: [] as any[],
  setIsAuthenticated: () => {},
  isAuthenticated: false,
  logout: () => {},
});

export const GlobalProvider: FC<any> = ({ children }) => {
  const [isUserGetInfo, setIsUserGetInfo] = useState<boolean>(true);
  const [userInformation, setUserInformation] = useState<IUserInformation>(
    {} as IUserInformation
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [myPenpals, setMyPenpals] = useState<any[]>([]);
  const [joinedCommunities, setJoinedCommunities] = useState<any[]>([]);
  const userId = getUserIdLocalStorage();

  const logout = () => {
    setUserInformation({} as IUserInformation);
    setIsAuthenticated(false);
    setJoinedCommunities([]);
    setMyPenpals([]);
    removeToken();
    removeUserId();
  };

  useQuery(
    ['userInformation', userId],
    () => GetUserInformation(userId as string),
    {
      enabled: userId !== 'undefined' && userId !== null ? true : false,
      retry: 100,
      retryDelay: 5000,
      onSuccess: (res) => {
        setIsUserGetInfo(false);
        setUserInformation(res.data.data);
        if (res.data?.data) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      },
      onError: (err) => {
        setIsUserGetInfo(false);
        console.log(err, '======> ERROR');
      },
    }
  );

  console.log(isAuthenticated, 'isAuthenticated');

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
      retry: 100,
      retryDelay: 5000,
    }
  );

  useQuery(['MyPenPals', userId], () => getMyPenpals(), {
    enabled: userId !== 'undefined' && userId !== null ? true : false,
    onSuccess: (res) => {
      let list = res?.data?.data || [];
      setMyPenpals(
        list.map((c: any) => {
          return {
            ...c,
            friend: c.sender.id == userId ? c.receiver : c.sender,
          };
        })
      );
    },
    onError: (err) => {},
    retry: 100,
    retryDelay: 5000,
  });

  return (
    <GlobalState.Provider
      value={{
        isUserGetInfo,
        setIsUserGetInfo,
        userInformation,
        setUserInformation,
        joinedCommunities,
        myPenpals,
        isAuthenticated,
        setIsAuthenticated,
        logout,
      }}
    >
      {children}
    </GlobalState.Provider>
  );
};

export const useGlobalState = () => {
  return useContext(GlobalState);
};
