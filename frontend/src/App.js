"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const LoginPage_1 = __importDefault(require("./components/LoginPage"));
const AttendanceForm_1 = __importDefault(require("./components/AttendanceForm"));
const EmployeeRegisterForm_1 = __importDefault(require("./components/EmployeeRegisterForm"));
const EmployeeList_1 = __importDefault(require("./components/EmployeeList"));
const EmployeeEdit_1 = __importDefault(require("./components/EmployeeEdit"));
const LogoutButton_1 = __importDefault(require("./components/LogoutButton "));
const Button_1 = __importDefault(require("@mui/material/Button"));
const Home_1 = __importDefault(require("@mui/icons-material/Home"));
const People_1 = __importDefault(require("@mui/icons-material/People"));
const Badge_1 = __importDefault(require("@mui/icons-material/Badge"));
const PunchClock_1 = __importDefault(require("@mui/icons-material/PunchClock"));
const localStorageUtils_1 = require("./utils/localStorageUtils");
const App = () => {
    const [isLoggedIn, setIsLoggedIn] = (0, react_1.useState)(() => {
        return (0, localStorageUtils_1.lsIsLoggedIn)();
    });
    const [isAdmin, setIsAdmin] = (0, react_1.useState)(() => {
        return (0, localStorageUtils_1.lsIsAdmin)();
    });
    const [myName, setMyName] = (0, react_1.useState)(() => {
        return (0, localStorageUtils_1.lsGetMyName)();
    });
    const handleLoginSuccess = (roles) => {
        const wkIsAdmin = roles.includes("ROLE_ADMIN");
        setIsLoggedIn(true);
        setIsAdmin(wkIsAdmin);
        setMyName((0, localStorageUtils_1.lsGetMyName)());
        // ローカルストレージの更新
        (0, localStorageUtils_1.lsSetIsLoggedIn)(true);
        (0, localStorageUtils_1.lsSetIsAdmin)(wkIsAdmin);
    };
    const handleLogout = () => {
        setIsLoggedIn(false);
        setIsAdmin(false);
        setMyName("");
        // ローカルストレージの更新
        (0, localStorageUtils_1.lsSetIsLoggedIn)(false);
        (0, localStorageUtils_1.lsSetIsAdmin)(false);
    };
    console.log("App.tsx is rendered. isLoggedIn:", isLoggedIn);
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "container" }, { children: [(0, jsx_runtime_1.jsx)("nav", Object.assign({ className: "navbar bg-primary" }, { children: (0, jsx_runtime_1.jsxs)("ul", Object.assign({ className: "nav nav-tabs mx-3" }, { children: [myName && ((0, jsx_runtime_1.jsx)("li", Object.assign({ className: "nav-item bg-light" }, { children: (0, jsx_runtime_1.jsxs)("span", Object.assign({ className: "nav-link text-primary" }, { children: [myName, "\u3055\u3093"] })) }))), (0, jsx_runtime_1.jsx)("li", Object.assign({ className: "nav-item" }, { children: (0, jsx_runtime_1.jsx)(Button_1.default, Object.assign({ className: "nav-link text-light", size: "medium", href: "/", variant: "outlined", startIcon: (0, jsx_runtime_1.jsx)(Home_1.default, {}) }, { children: "\u30DB\u30FC\u30E0" })) })), isLoggedIn && isAdmin && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("li", Object.assign({ className: "nav-item" }, { children: (0, jsx_runtime_1.jsx)(Button_1.default, Object.assign({ className: "nav-link text-light", size: "medium", href: "/employees/list", variant: "outlined", startIcon: (0, jsx_runtime_1.jsx)(People_1.default, {}) }, { children: "\u793E\u54E1\u4E00\u89A7" })) })), (0, jsx_runtime_1.jsx)("li", Object.assign({ className: "nav-item" }, { children: (0, jsx_runtime_1.jsx)(Button_1.default, Object.assign({ className: "nav-link text-light", size: "medium", href: "/employees/register", variant: "outlined", startIcon: (0, jsx_runtime_1.jsx)(Badge_1.default, {}) }, { children: "\u793E\u54E1\u767B\u9332" })) }))] })), isLoggedIn && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("li", Object.assign({ className: "nav-item" }, { children: (0, jsx_runtime_1.jsx)(Button_1.default, Object.assign({ className: "nav-link text-light", size: "medium", href: "/attendance", variant: "outlined", startIcon: (0, jsx_runtime_1.jsx)(PunchClock_1.default, {}) }, { children: "\u51FA\u9000\u52E4\u7BA1\u7406" })) })), (0, jsx_runtime_1.jsx)("li", Object.assign({ className: "nav-item" }, { children: (0, jsx_runtime_1.jsx)(LogoutButton_1.default, { onLogout: handleLogout }) }))] }))] })) })), (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/", element: (0, jsx_runtime_1.jsx)(LoginPage_1.default, { onLoginSuccess: handleLoginSuccess }) }), isLoggedIn && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/employees/list", element: (0, jsx_runtime_1.jsx)(EmployeeList_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/employees/register", element: (0, jsx_runtime_1.jsx)(EmployeeRegisterForm_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/attendance", element: (0, jsx_runtime_1.jsx)(AttendanceForm_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/employees/edit/:id", element: (0, jsx_runtime_1.jsx)(EmployeeEdit_1.default, {}) })] }))] })] })));
};
exports.default = App;
