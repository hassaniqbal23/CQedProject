'use client';
import { FC, createContext, useContext, useEffect, useState } from 'react';

type IGlobalState = {
  isUserGetInfo: boolean;
  setIsUserGetInfo: (value: boolean) => void;
};

export const GlobalState = createContext<IGlobalState>({
  isUserGetInfo: false as boolean,
  setIsUserGetInfo: () => {},
});
export const GlobalProvider: FC<any> = ({ children }) => {
  const [isUserGetInfo, setIsUserGetInfo] = useState<boolean>(false);

  return (
    <GlobalState.Provider
      value={{
        isUserGetInfo,
        setIsUserGetInfo,
      }}
    >
      {children}
    </GlobalState.Provider>
  );
};

export const useGlobalState = () => {
  return useContext(GlobalState);
};
