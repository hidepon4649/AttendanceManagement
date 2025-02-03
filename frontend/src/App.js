import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "react/jsx-dev-runtime";
const _jsxFileName = "/Users/hidemac1/attendance-management-app/frontend/src/App.tsx";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import AttendanceForm from "./components/AttendanceForm";
import RegisterEmployeeForm from "./components/EmployeeRegisterForm";
import EmployeeList from "./components/EmployeeList";
import EmployeeEdit from "./components/EmployeeEdit";
import LogoutButton from "./components/LogoutButton ";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import BadgeIcon from "@mui/icons-material/Badge";
import PunchClockIcon from "@mui/icons-material/PunchClock";
import { lsIsLoggedIn, lsIsAdmin, lsGetMyName, lsSetIsLoggedIn, lsSetIsAdmin, } from "./utils/localStorageUtils";
const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return lsIsLoggedIn();
    });
    const [isAdmin, setIsAdmin] = useState(() => {
        return lsIsAdmin();
    });
    const [myName, setMyName] = useState(() => {
        return lsGetMyName();
    });
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
    console.log("App.tsx is rendered. isLoggedIn:", isLoggedIn);
    return (_jsxDEV("div", { className: "container", children: [_jsxDEV("nav", { className: "navbar bg-primary", children: _jsxDEV("ul", { className: "nav nav-tabs mx-3", children: [myName && (_jsxDEV("li", { className: "nav-item bg-light", children: _jsxDEV("span", { className: "nav-link text-primary", children: [myName, "\u3055\u3093"] }, void 0, true, { fileName: _jsxFileName, lineNumber: 64, columnNumber: 15 }, this) }, void 0, false, { fileName: _jsxFileName, lineNumber: 62, columnNumber: 23 }, this)), _jsxDEV("li", { className: "nav-item", children: _jsxDEV(Button, { className: "nav-link text-light", size: "medium", href: "/", variant: "outlined", startIcon: _jsxDEV(HomeIcon, {}, void 0, false, { fileName: _jsxFileName, lineNumber: 73, columnNumber: 26 }, this), children: "\u30DB\u30FC\u30E0" }, void 0, false, { fileName: _jsxFileName, lineNumber: 68, columnNumber: 13 }, this) }, void 0, false, { fileName: _jsxFileName, lineNumber: 67, columnNumber: 11 }, this), isLoggedIn && isAdmin && (_jsxDEV(_Fragment, { children: [_jsxDEV("li", { className: "nav-item", children: _jsxDEV(Button, { className: "nav-link text-light", size: "medium", href: "/employees/list", variant: "outlined", startIcon: _jsxDEV(PeopleIcon, {}, void 0, false, { fileName: _jsxFileName, lineNumber: 86, columnNumber: 30 }, this), children: "\u793E\u54E1\u4E00\u89A7" }, void 0, false, { fileName: _jsxFileName, lineNumber: 81, columnNumber: 17 }, this) }, void 0, false, { fileName: _jsxFileName, lineNumber: 80, columnNumber: 15 }, this), _jsxDEV("li", { className: "nav-item", children: _jsxDEV(Button, { className: "nav-link text-light", size: "medium", href: "/employees/register", variant: "outlined", startIcon: _jsxDEV(BadgeIcon, {}, void 0, false, { fileName: _jsxFileName, lineNumber: 97, columnNumber: 30 }, this), children: "\u793E\u54E1\u767B\u9332" }, void 0, false, { fileName: _jsxFileName, lineNumber: 92, columnNumber: 17 }, this) }, void 0, false, { fileName: _jsxFileName, lineNumber: 91, columnNumber: 15 }, this)] }, void 0, true, { fileName: _jsxFileName, lineNumber: 78, columnNumber: 38 }, this)), isLoggedIn && (_jsxDEV(_Fragment, { children: [_jsxDEV("li", { className: "nav-item", children: _jsxDEV(Button, { className: "nav-link text-light", size: "medium", href: "/attendance", variant: "outlined", startIcon: _jsxDEV(PunchClockIcon, {}, void 0, false, { fileName: _jsxFileName, lineNumber: 112, columnNumber: 30 }, this), children: "\u51FA\u9000\u52E4\u7BA1\u7406" }, void 0, false, { fileName: _jsxFileName, lineNumber: 107, columnNumber: 17 }, this) }, void 0, false, { fileName: _jsxFileName, lineNumber: 106, columnNumber: 15 }, this), _jsxDEV("li", { className: "nav-item", children: _jsxDEV(LogoutButton, { onLogout: handleLogout }, void 0, false, { fileName: _jsxFileName, lineNumber: 118, columnNumber: 17 }, this) }, void 0, false, { fileName: _jsxFileName, lineNumber: 117, columnNumber: 15 }, this)] }, void 0, true, { fileName: _jsxFileName, lineNumber: 104, columnNumber: 27 }, this))] }, void 0, true, { fileName: _jsxFileName, lineNumber: 61, columnNumber: 9 }, this) }, void 0, false, { fileName: _jsxFileName, lineNumber: 60, columnNumber: 7 }, this), _jsxDEV(Routes, { children: [_jsxDEV(Route, { path: "/", element: _jsxDEV(LoginPage, { onLoginSuccess: handleLoginSuccess }, void 0, false, { fileName: _jsxFileName, lineNumber: 128, columnNumber: 20 }, this) }, void 0, false, { fileName: _jsxFileName, lineNumber: 126, columnNumber: 9 }, this), isLoggedIn && (_jsxDEV(_Fragment, { children: [_jsxDEV(Route, { path: "/employees/list", element: _jsxDEV(EmployeeList, {}, void 0, false, { fileName: _jsxFileName, lineNumber: 132, columnNumber: 52 }, this) }, void 0, false, { fileName: _jsxFileName, lineNumber: 132, columnNumber: 13 }, this), _jsxDEV(Route, { path: "/employees/register", element: _jsxDEV(RegisterEmployeeForm, {}, void 0, false, { fileName: _jsxFileName, lineNumber: 135, columnNumber: 24 }, this) }, void 0, false, { fileName: _jsxFileName, lineNumber: 133, columnNumber: 13 }, this), _jsxDEV(Route, { path: "/attendance", element: _jsxDEV(AttendanceForm, {}, void 0, false, { fileName: _jsxFileName, lineNumber: 137, columnNumber: 48 }, this) }, void 0, false, { fileName: _jsxFileName, lineNumber: 137, columnNumber: 13 }, this), _jsxDEV(Route, { path: "/employees/edit/:id", element: _jsxDEV(EmployeeEdit, {}, void 0, false, { fileName: _jsxFileName, lineNumber: 138, columnNumber: 56 }, this) }, void 0, false, { fileName: _jsxFileName, lineNumber: 138, columnNumber: 13 }, this)] }, void 0, true, { fileName: _jsxFileName, lineNumber: 130, columnNumber: 25 }, this))] }, void 0, true, { fileName: _jsxFileName, lineNumber: 125, columnNumber: 7 }, this)] }, void 0, true, { fileName: _jsxFileName, lineNumber: 58, columnNumber: 11 }, this));
};
export default App;
