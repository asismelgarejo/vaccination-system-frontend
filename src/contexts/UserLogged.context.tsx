import { createContext, useState, useContext } from "react";

const UserLoggedContext = createContext({
  setUserLogged: (num: any) => {},
  userLogged: "",
});

interface IUserLoggedProviderProps {
  children: React.ReactNode;
}

export const UserLoggedProvider: React.FC<IUserLoggedProviderProps> = ({
  children,
}) => {
  const [userLogged, setUserLogged] = useState("");
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
