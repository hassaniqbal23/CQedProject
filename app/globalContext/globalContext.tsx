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
import { getBlockedUsers } from '../api/users';
import { pendingCommunities } from '../api/communities';
import { useRouter } from 'next/navigation';

type IGlobalState = {
  isUserGetInfo: boolean;
  isFetchingMyPenPals: boolean;
  userInformation: IUserInformation;
  joinedCommunities: ICommunityJoin[];
  myPenpals: IPenpal[];
  setIsUserGetInfo: (value: boolean) => void;
  setUserInformation: (value: IUserInformation) => void;
  usersIBlocked: any[];
  setIsAuthenticated?: (value: boolean) => void;
  isAuthenticated?: boolean;
  logout: () => void;
  setIsFetchingMyPenPals: (value: boolean) => void;
  pendingCommunitiesList: any[];
};

export const GlobalState = createContext<IGlobalState>({
  isUserGetInfo: false as boolean,
  isFetchingMyPenPals: false as boolean,
  userInformation: {} as IUserInformation,
  joinedCommunities: [] as ICommunityJoin[],
  myPenpals: [] as IPenpal[],
  setIsUserGetInfo: () => {},
  setUserInformation: () => {},
  usersIBlocked: [] as any[],
  setIsAuthenticated: () => {},
  isAuthenticated: false,
  logout: () => {},
  setIsFetchingMyPenPals: () => {},
  pendingCommunitiesList: [],
});

export const GlobalProvider: FC<any> = ({ children }) => {
  const router = useRouter();
  const [isUserGetInfo, setIsUserGetInfo] = useState<boolean>(true);
  const [isFetchingMyPenPals, setIsFetchingMyPenPals] = useState<boolean>(true);
  const [userInformation, setUserInformation] = useState<IUserInformation>(
    {} as IUserInformation
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [usersIBlocked, setUsersIBlocked] = useState<any[]>([]);
  const [myPenpals, setMyPenpals] = useState<IPenpal[]>([]);
  const [joinedCommunities, setJoinedCommunities] = useState<ICommunityJoin[]>(
    []
  );
  const [pendingCommunitiesList, setPendingCommunitiesList] = useState<any[]>(
    []
  );
  const userId = getUserIdLocalStorage();

  const logout = () => {
    const clonedUserInfo = JSON.parse(JSON.stringify(userInformation));
    setUserInformation({} as IUserInformation);
    setIsAuthenticated(false);
    setJoinedCommunities([]);
    setMyPenpals([]);
    removeToken();
    removeUserId();
    setUsersIBlocked([]);
    setPendingCommunitiesList([]);

    const roleName = clonedUserInfo?.role?.name;

    if (roleName === 'student') {
      router.push('/students/sign-in');
    } else if (roleName === 'university') {
      router.push('/universities/sign-in');
    } else if (roleName === 'school') {
      router.push('/schools/sign-in');
    } else if (roleName === 'teacher') {
      router.push('/teachers/sign-in');
    } else if (roleName === '*') {
      router.push('/login');
    }
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

  useQuery(['get-users-i-blocked', userId], () => getBlockedUsers(), {
    enabled: userId !== 'undefined' && userId !== null ? true : false,
    retry: 100,
    retryDelay: 5000,
    onSuccess: (res) => {
      setUsersIBlocked(res.data.data);
    },
    onError: (err) => {
      console.log(err, '======> ERROR');
    },
  });

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

  useQuery(['pending-communities'], () => pendingCommunities(), {
    onSuccess: (res) => {
      setPendingCommunitiesList(res.data);
    },
    onError: (err) => {
      console.log(err, '======> ERROR');
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
        usersIBlocked,
        logout,
        setIsUserGetInfo,
        setUserInformation,
        setIsFetchingMyPenPals,
        pendingCommunitiesList,
      }}
    >
      {children}
    </GlobalState.Provider>
  );
};

export const useGlobalState = () => {
  return useContext(GlobalState);
};
