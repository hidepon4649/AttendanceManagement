import React, { useState, createContext } from "react";
import {
  lsIsLoggedIn,
  lsSetIsLoggedIn,
  lsIsAdmin,
  lsSetIsAdmin,
  lsGetMyName,
} from "../utils/localStorageUtils";

interface LoginUserContextType {
  isLoggedIn: boolean;
  isAdmin: boolean;
  myName: string | null;
  handleLoginSuccess: (roles: string[]) => void;
  handleLogout: () => void;
}
const LoginUserContext = createContext<LoginUserContextType>(
  {} as LoginUserContextType
);

function Provider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => lsIsLoggedIn());
  const [isAdmin, setIsAdmin] = useState(() => lsIsAdmin());
  const [myName, setMyName] = useState(() => lsGetMyName());

  const handleLoginSuccess = (roles: string[]) => {
    const wkIsAdmin = roles.includes("ROLE_ADMIN");

    setIsLoggedIn(true);
    setIsAdmin(wkIsAdmin);
    setMyName(lsGetMyName());

    // ローカルストレージの更新
    lsSetIsLoggedIn(true);
    lsSetIsAdmin(wkIsAdmin);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setMyName("");

    // ローカルストレージの更新
    lsSetIsLoggedIn(false);
    lsSetIsAdmin(false);
  };

  const valueToShare = {
    isLoggedIn,
    isAdmin,
    myName,
    handleLoginSuccess,
    handleLogout,
  };

  return (
    <LoginUserContext.Provider value={valueToShare}>
      {children}
    </LoginUserContext.Provider>
  );
}
export { Provider };
export default LoginUserContext;
