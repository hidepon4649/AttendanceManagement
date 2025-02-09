import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
const _jsxFileName = "/Users/hidemac1/attendance-management-app/frontend/src/context/LoginUserContext.tsx";
import { useState, createContext } from "react";
import { lsIsLoggedIn, lsSetIsLoggedIn, lsIsAdmin, lsSetIsAdmin, lsGetMyName, } from "../utils/localStorageUtils";
const LoginUserContext = createContext({});
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
        handleLoginSuccess,
        handleLogout,
    };
    return (_jsxDEV(LoginUserContext.Provider, { value: valueToShare, children: children }, void 0, false, { fileName: _jsxFileName, lineNumber: 56, columnNumber: 11 }, this));
}
export { Provider };
export default LoginUserContext;
