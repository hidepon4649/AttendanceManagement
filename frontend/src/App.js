"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const LoginPage_1 = __importDefault(require("./components/LoginPage"));
const AttendanceForm_1 = __importDefault(require("./components/AttendanceForm"));
const MonthlyReport_1 = __importDefault(require("./components/MonthlyReport"));
const EmployeeRegisterForm_1 = __importDefault(require("./components/EmployeeRegisterForm"));
const EmployeeList_1 = __importDefault(require("./components/EmployeeList"));
const EmployeeEdit_1 = __importDefault(require("./components/EmployeeEdit"));
const Button_1 = __importDefault(require("@mui/material/Button"));
const Home_1 = __importDefault(require("@mui/icons-material/Home"));
const People_1 = __importDefault(require("@mui/icons-material/People"));
const Badge_1 = __importDefault(require("@mui/icons-material/Badge"));
const PunchClock_1 = __importDefault(require("@mui/icons-material/PunchClock"));
const CalendarMonth_1 = __importDefault(require("@mui/icons-material/CalendarMonth"));
const App = () => {
    return ((0, jsx_runtime_1.jsx)(react_router_dom_1.BrowserRouter, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "container" }, { children: [(0, jsx_runtime_1.jsx)("nav", Object.assign({ className: "navbar bg-primary" }, { children: (0, jsx_runtime_1.jsxs)("ul", Object.assign({ className: "nav nav-tabs mx-3" }, { children: [(0, jsx_runtime_1.jsx)("li", Object.assign({ className: "nav-item" }, { children: (0, jsx_runtime_1.jsx)(Button_1.default, Object.assign({ className: "nav-link text-light", size: "medium", href: "/", variant: "outlined", startIcon: (0, jsx_runtime_1.jsx)(Home_1.default, {}) }, { children: "\u30DB\u30FC\u30E0" })) })), (0, jsx_runtime_1.jsx)("li", Object.assign({ className: "nav-item" }, { children: (0, jsx_runtime_1.jsx)(Button_1.default, Object.assign({ className: "nav-link text-light", size: "medium", href: "/employees/list", variant: "outlined", startIcon: (0, jsx_runtime_1.jsx)(People_1.default, {}) }, { children: "\u793E\u54E1\u4E00\u89A7" })) })), (0, jsx_runtime_1.jsx)("li", Object.assign({ className: "nav-item" }, { children: (0, jsx_runtime_1.jsx)(Button_1.default, Object.assign({ className: "nav-link text-light", size: "medium", href: "/employees/register", variant: "outlined", startIcon: (0, jsx_runtime_1.jsx)(Badge_1.default, {}) }, { children: "\u793E\u54E1\u767B\u9332" })) })), (0, jsx_runtime_1.jsx)("li", Object.assign({ className: "nav-item" }, { children: (0, jsx_runtime_1.jsx)(Button_1.default, Object.assign({ className: "nav-link text-light", size: "medium", href: "/attendance", variant: "outlined", startIcon: (0, jsx_runtime_1.jsx)(PunchClock_1.default, {}) }, { children: "\u51FA\u9000\u52E4\u7BA1\u7406" })) })), (0, jsx_runtime_1.jsx)("li", Object.assign({ className: "nav-item" }, { children: (0, jsx_runtime_1.jsx)(Button_1.default, Object.assign({ className: "nav-link text-light", size: "medium", href: "/report", variant: "outlined", startIcon: (0, jsx_runtime_1.jsx)(CalendarMonth_1.default, {}) }, { children: "\u6708\u672B\u5E33\u7968\u51FA\u529B" })) }))] })) })), (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/", element: (0, jsx_runtime_1.jsx)(LoginPage_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/employees/list", element: (0, jsx_runtime_1.jsx)(EmployeeList_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/employees/register", element: (0, jsx_runtime_1.jsx)(EmployeeRegisterForm_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/attendance", element: (0, jsx_runtime_1.jsx)(AttendanceForm_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/report", element: (0, jsx_runtime_1.jsx)(MonthlyReport_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/employees/edit/:id", element: (0, jsx_runtime_1.jsx)(EmployeeEdit_1.default, {}) })] })] })) }));
};
exports.default = App;
