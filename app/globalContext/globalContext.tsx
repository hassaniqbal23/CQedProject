import { FC, createContext, useContext, useState } from 'react';
import { IUserInformation, IPenpal, ICommunityJoin } from './types';
import { useMutation, useQuery } from 'react-query';
import {
  GetUserInformation,
  GetUserJoinedCommunities,
  LoginOutUser,
  getNotifications,
} from '../api/auth';
import {
  getUserIdLocalStorage,
  removeFcmToken,
  removeToken,
  removeUserId,
} from '../utils/encryption';
import {
  myPenpals as getMyPenpals,
  pendingGlobalFriends,
} from '../api/penpals';
import { getBlockedUsers } from '../api/users';
import { pendingCommunities } from '../api/communities';
import { useRouter } from 'next/navigation';
import { INotifications } from '@/types/auth';
import axios from 'axios';

type IGlobalState = {
  isUserGetInfo: boolean;
  isFetchingMyPenPals: boolean;
  isGettingNotifications: boolean;
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
  setCountUnreadNotifications: (value: number) => void;
  setNotifications: (value: INotifications[]) => void;
  pendingCommunitiesList: any[];
  pendingGlobalFriendsList: any[];
  notifications: INotifications[];
  countUnreadNotifications: number;
};

export const GlobalState = createContext<IGlobalState>({
  isUserGetInfo: false as boolean,
  isGettingNotifications: false as boolean,
  isFetchingMyPenPals: false as boolean,
  userInformation: {} as IUserInformation,
  joinedCommunities: [] as ICommunityJoin[],
  notifications: [] as INotifications[],
  countUnreadNotifications: 0 as number,
  myPenpals: [] as IPenpal[],
  setIsUserGetInfo: () => {},
  setUserInformation: () => {},
  usersIBlocked: [] as any[],
  setIsAuthenticated: () => {},
  setCountUnreadNotifications: () => {},
  setNotifications: () => {},
  isAuthenticated: false,
  logout: () => {},
  setIsFetchingMyPenPals: () => {},
  pendingCommunitiesList: [],
  pendingGlobalFriendsList: [],
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
  const [pendingGlobalFriendsList, setPendingGlobalFriendsList] = useState<
    any[]
  >([]);
  const [countUnreadNotifications, setCountUnreadNotifications] =
    useState<number>(0);
  const [notifications, setNotifications] = useState<INotifications[]>(
    [] as INotifications[]
  );

  const userId = getUserIdLocalStorage();

  const { mutate: logoutUser, isLoading: isLogOutLoading } = useMutation(
    () => LoginOutUser(),
    {
      onSuccess: (res) => {
        const clonedUserInfo = JSON.parse(JSON.stringify(userInformation));
        setUserInformation({} as IUserInformation);
        setIsAuthenticated(false);
        setJoinedCommunities([]);
        setMyPenpals([]);
        removeToken();
        removeUserId();
        removeFcmToken();
        setUsersIBlocked([]);
        setPendingCommunitiesList([]);
        axios.post('/api/logout');

        const roleName = clonedUserInfo?.role?.name;

        if (roleName === 'student') {
          router.push('/students/sign-in');
        } else if (roleName === 'university') {
          router.push('/universities/sign-in');
        } else if (roleName === 'school') {
          router.push('/universities/sign-in');
        } else if (roleName === 'teacher') {
          router.push('/teachers/sign-in');
        } else if (roleName === '*') {
          router.push('/login');
        }
      },
      onError: (error: any) => {
        console.log(error, 'Error =====> log');
      },
    }
  );

  const logout = () => {
    logoutUser();
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
      onError: (err: { status: number | string }) => {
        setIsUserGetInfo(false);
        if (err?.status === 401) {
          removeToken();
        }
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

  useQuery(['pending-communities', userId], () => pendingCommunities(), {
    onSuccess: (res) => {
      setPendingCommunitiesList(res.data);
    },
    onError: (err) => {
      console.log(err, '======> ERROR');
    },
    enabled: userId !== 'undefined' && userId !== null ? true : false,
    retry: 100,
    retryDelay: 5000,
  });

  useQuery(['pending-friends', userId], () => pendingGlobalFriends(), {
    onSuccess: (res) => {
      setPendingGlobalFriendsList(res.data);
    },
    onError: (err) => {
      console.log(err, '======> ERROR');
    },
    enabled: userId !== 'undefined' && userId !== null ? true : false,

    retry: 100,
    retryDelay: 5000,
  });

  const { isLoading: isGettingNotifications } = useQuery(
    ['getNotifications'],
    () => getNotifications(Number(userId)),
    {
      onSuccess: (res) => {
        setNotifications(res?.notifications);
        setCountUnreadNotifications(res?.countUnreadNotifications);
      },
      onError: (err) => {
        console.log(err, '======> ERROR');
      },
      enabled: !!userId,
      retry: 100,
      retryDelay: 5000,
    }
  );

  return (
    <GlobalState.Provider
      value={{
        countUnreadNotifications,
        notifications,
        isUserGetInfo,
        isFetchingMyPenPals,
        userInformation,
        joinedCommunities,
        myPenpals,
        isAuthenticated,
        pendingCommunitiesList,
        pendingGlobalFriendsList,
        usersIBlocked,
        isGettingNotifications,
        setNotifications,
        setIsAuthenticated,
        setCountUnreadNotifications,
        logout,
        setIsUserGetInfo,
        setUserInformation,
        setIsFetchingMyPenPals,
      }}
    >
      {children}
    </GlobalState.Provider>
  );
};

export const useGlobalState = () => {
  return useContext(GlobalState);
};
