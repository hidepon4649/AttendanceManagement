import React, { useState, createContext } from "react";

interface LoginUserContextType {
  isLoggedIn: boolean;
  isAdmin: boolean;
  myName: string | null;
  lsClear: () => void;
  lsSetUser: (data: any) => void;
  lsIsLoggedIn: () => boolean;
  lsSetIsLoggedIn: (loggedin: boolean) => void;
  lsIsAdmin: () => boolean;
  lsSetIsAdmin: (isAdmin: boolean) => void;
  lsGetMyId: () => number;
  lsGetMyName: () => string | null;
  lsGetJwtToken: () => string | null;
  lsSetJwtToken: (token: string) => void;
  lsGetCsrfToken: () => string | null;
  lsSetCsrfToken: (token: string) => void;
  handleLoginSuccess: (roles: string[]) => void;
  handleLogout: () => void;
}
const LoginUserContext = createContext<LoginUserContextType>(
  {} as LoginUserContextType
);

const KEY_IS_ADMIN = "isAdmin";
const KEY_IS_LOGGED_IN = "isLoggedIn";
const KEY_USER = "USER";
const KEY_JWT_TOKEN = "JWT-TOKEN";
const KEY_CSRF_TOKEN = "CSRF-TOKEN";

const lsClear = (): void => {
  localStorage.clear();
};
const lsSetUser = (data: any): void => {
  const userinfo = { ...data.employee };
  delete userinfo.password; // パスワードは保存しない
  userinfo.roles = data.roles; // ロール情報を追加
  localStorage.setItem("USER", JSON.stringify(userinfo));
};
const lsIsLoggedIn = (): boolean => {
  return localStorage.getItem(KEY_IS_LOGGED_IN) === "true";
};
const lsSetIsLoggedIn = (loggedin: boolean): void => {
  localStorage.setItem(KEY_IS_LOGGED_IN, loggedin ? "true" : "false");
};
const lsIsAdmin = (): boolean => {
  return localStorage.getItem(KEY_IS_ADMIN) === "true";
};
const lsSetIsAdmin = (isAdmin: boolean): void => {
  localStorage.setItem(KEY_IS_ADMIN, isAdmin ? "true" : "false");
};
const lsGetMyId = (): number => {
  const userinfo = localStorage.getItem(KEY_USER);
  const id = userinfo ? JSON.parse(userinfo).id : 0;
  return id;
};
const lsGetMyName = (): string | null => {
  const userinfo = localStorage.getItem(KEY_USER);
  const name = userinfo ? JSON.parse(userinfo).name : null;
  return name;
};
const lsGetJwtToken = (): string | null => {
  return localStorage.getItem(KEY_JWT_TOKEN);
};
const lsSetJwtToken = (token: string): void => {
  localStorage.setItem(KEY_JWT_TOKEN, token);
};
const lsGetCsrfToken = (): string | null => {
  return localStorage.getItem(KEY_CSRF_TOKEN);
};
const lsSetCsrfToken = (token: string): void => {
  localStorage.setItem(KEY_CSRF_TOKEN, token);
};

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
    lsClear,
    lsSetUser,
    lsIsLoggedIn,
    lsSetIsLoggedIn,
    lsIsAdmin,
    lsSetIsAdmin,
    lsGetMyId,
    lsGetMyName,
    lsGetJwtToken,
    lsSetJwtToken,
    lsGetCsrfToken,
    lsSetCsrfToken,
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
