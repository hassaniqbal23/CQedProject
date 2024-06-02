import { FC, createContext, useContext, useState } from 'react';
import { IUserInformation, IPenpal, ICommunityJoin } from './types';
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
  isFetchingMyPenPals: boolean;
  userInformation: IUserInformation;
  joinedCommunities: ICommunityJoin[];
  myPenpals: IPenpal[];
  setIsUserGetInfo: (value: boolean) => void;
  setUserInformation: (value: IUserInformation) => void;
  setIsAuthenticated?: (value: boolean) => void;
  isAuthenticated?: boolean;
  logout: () => void;
  setIsFetchingMyPenPals: (value: boolean) => void;
  setIsAuthenticated?: (value: boolean) => void;
  isAuthenticated?: boolean;
  logout: () => void;
};

export const GlobalState = createContext<IGlobalState>({
  isUserGetInfo: false as boolean,
  isFetchingMyPenPals: false as boolean,
  userInformation: {} as IUserInformation,
  joinedCommunities: [] as ICommunityJoin[],
  myPenpals: [] as IPenpal[],
  setIsUserGetInfo: () => {},
  setUserInformation: () => {},
  setIsAuthenticated: () => {},
  isAuthenticated: false,
  logout: () => {},
  setIsFetchingMyPenPals: () => {},
  setIsAuthenticated: () => {},
  isAuthenticated: false,
  logout: () => {},
});

export const GlobalProvider: FC<any> = ({ children }) => {
  const [isUserGetInfo, setIsUserGetInfo] = useState<boolean>(true);
  const [isFetchingMyPenPals, setIsFetchingMyPenPals] = useState<boolean>(true);
  const [userInformation, setUserInformation] = useState<IUserInformation>(
    {} as IUserInformation
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [myPenpals, setMyPenpals] = useState<IPenpal[]>([]);
  const [joinedCommunities, setJoinedCommunities] = useState<ICommunityJoin[]>(
    []
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
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
        list.map((c: IPenpal) => {
          return {
            ...c,
            friend: c.sender.id === Number(userId) ? c.receiver : c.sender,
          };
        })
      );
      setIsFetchingMyPenPals(false);
    },

    onError: (err) => {
      setIsFetchingMyPenPals(false);
    },
    retry: 100,
    retryDelay: 5000,
  });

  return (
    <GlobalState.Provider
      value={{
        isUserGetInfo,
        isFetchingMyPenPals,
        userInformation,
        joinedCommunities,
        myPenpals,
        isAuthenticated,
        setIsAuthenticated,
        logout,
        setIsUserGetInfo,
        setUserInformation,
        setIsFetchingMyPenPals,
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
