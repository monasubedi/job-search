import { createContext, useContext, useEffect, useState } from "react";
import { getUserData } from "../utils/api";
import { UserDataType } from "../utils/types";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuth: boolean) => void;
  logout: () => void;
  userData: UserDataType;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<UserDataType>({
    userId: "",
    token: "",
    roles: [],
  });

  const logout = () => {
    localStorage.clear();
    setIsAuthenticated((prev) => !prev);
  };

  useEffect(() => {
    const data = getUserData();
    if (data) {
      setIsAuthenticated(true);
      setUserData(JSON.parse(data));
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userData, setIsAuthenticated, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("It must be wrapped by the Context Provider.");
  }
  return authContext;
};
