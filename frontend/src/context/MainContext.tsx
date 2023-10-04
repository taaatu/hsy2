import React, { useState } from 'react';
import { User } from '../interfaces/User';

type MainContextType = {
  curentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  update: number;
  setUpdate: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const MainContext = React.createContext<MainContextType>({} as MainContextType);

const MainProvider = (props: { children: React.ReactNode }) => {
  const [curentUser, setCurrentUser] = useState<User | null>(null);
  const [update, setUpdate] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <MainContext.Provider
      value={{
        curentUser,
        setCurrentUser,
        update,
        setUpdate,
        isLoading,
        setIsLoading,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};

export { MainContext, MainProvider };
