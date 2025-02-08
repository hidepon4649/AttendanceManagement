import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
const _jsxFileName = "/Users/hidemac1/attendance-management-app/frontend/src/context/LoginUserContext.tsx";
import { useState, createContext } from "react";
const LoginUserContext = createContext({});
const KEY_IS_ADMIN = "isAdmin";
const KEY_IS_LOGGED_IN = "isLoggedIn";
const KEY_USER = "USER";
const KEY_JWT_TOKEN = "JWT-TOKEN";
const KEY_CSRF_TOKEN = "CSRF-TOKEN";
const lsClear = () => {
    localStorage.clear();
};
const lsSetUser = (data) => {
    const userinfo = { ...data.employee };
    delete userinfo.password; // パスワードは保存しない
    userinfo.roles = data.roles; // ロール情報を追加
    localStorage.setItem("USER", JSON.stringify(userinfo));
};
const lsIsLoggedIn = () => {
    return localStorage.getItem(KEY_IS_LOGGED_IN) === "true";
};
const lsSetIsLoggedIn = (loggedin) => {
    localStorage.setItem(KEY_IS_LOGGED_IN, loggedin ? "true" : "false");
};
const lsIsAdmin = () => {
    return localStorage.getItem(KEY_IS_ADMIN) === "true";
};
const lsSetIsAdmin = (isAdmin) => {
    localStorage.setItem(KEY_IS_ADMIN, isAdmin ? "true" : "false");
};
const lsGetMyId = () => {
    const userinfo = localStorage.getItem(KEY_USER);
    const id = userinfo ? JSON.parse(userinfo).id : 0;
    return id;
};
const lsGetMyName = () => {
    const userinfo = localStorage.getItem(KEY_USER);
    const name = userinfo ? JSON.parse(userinfo).name : null;
    return name;
};
const lsGetJwtToken = () => {
    return localStorage.getItem(KEY_JWT_TOKEN);
};
const lsSetJwtToken = (token) => {
    localStorage.setItem(KEY_JWT_TOKEN, token);
};
const lsGetCsrfToken = () => {
    return localStorage.getItem(KEY_CSRF_TOKEN);
};
const lsSetCsrfToken = (token) => {
    localStorage.setItem(KEY_CSRF_TOKEN, token);
};
function Provider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(() => lsIsLoggedIn());
    const [isAdmin, setIsAdmin] = useState(() => lsIsAdmin());
    const [myName, setMyName] = useState(() => lsGetMyName());
    const handleLoginSuccess = (roles) => {
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
    return (_jsxDEV(LoginUserContext.Provider, { value: valueToShare, children: children }, void 0, false, { fileName: _jsxFileName, lineNumber: 123, columnNumber: 11 }, this));
}
export { Provider };
export default LoginUserContext;
