import { FC, createContext, useContext, useState } from 'react';
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
  const userId = getUserIdLocalStorage();

  useQuery(
    ['userInformation', userId],
    () => GetUserInfomation(userId as string),
    {
      enabled: userId !== 'undefined' ? true : false,
      onSuccess: (res) => {
        setUserInformation(res.data.data);
      },
      onError: (err) => {
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
      }}
    >
      {children}
    </GlobalState.Provider>
  );
};

export const useGlobalState = () => {
  return useContext(GlobalState);
};
