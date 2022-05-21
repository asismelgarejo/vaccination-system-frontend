import { useLazyQuery } from "@apollo/client";
import { createContext, useState, useContext, useEffect } from "react";
import { Me } from "../api/graphql/user";
import { IMeModel } from "../api/models/general";

interface IContext {
  setUserLogged(num: IMeModel | null): void;
  userLogged: IMeModel | null;
}

const UserLoggedContext = createContext<IContext>({
  setUserLogged: (num: any) => {},
  userLogged: null,
});

interface IUserLoggedProviderProps {
  children: React.ReactNode;
}

export const UserLoggedProvider: React.FC<IUserLoggedProviderProps> = ({
  children,
}) => {
  const [userLogged, setUserLogged] = useState<IMeModel | null>(null);
  return (
    <UserLoggedContext.Provider value={{ userLogged, setUserLogged }}>
      {children}
    </UserLoggedContext.Provider>
  );
};

export const useUserLogged = () => {
  const { userLogged, setUserLogged } = useContext(UserLoggedContext);
  return { userLogged, setUserLogged };
};

export const useRefreshContextMe = () => {
  const [execMe, { data }] = useLazyQuery(Me);
  const { setUserLogged } = useUserLogged();
  const deleteMe = () => {
    setUserLogged(null);
  };
  const updateMe = () => {
    if (data && data.me) {
      setUserLogged(data.me);
    }
  };
  useEffect(() => {
    updateMe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return { execMe, deleteMe, updateMe };
};
