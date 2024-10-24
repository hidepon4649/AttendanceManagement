"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const LoginForm_1 = __importDefault(require("./components/LoginForm"));
const RegisterEmployeeForm_1 = __importDefault(require("./components/RegisterEmployeeForm"));
const AttendanceForm_1 = __importDefault(require("./components/AttendanceForm"));
const MonthlyReport_1 = __importDefault(require("./components/MonthlyReport"));
const App = () => {
    return ((0, jsx_runtime_1.jsx)(react_router_dom_1.BrowserRouter, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "container" }, { children: [(0, jsx_runtime_1.jsx)("nav", Object.assign({ className: "navbar bg-primary" }, { children: (0, jsx_runtime_1.jsxs)("ul", Object.assign({ className: "nav nav-tabs mx-3" }, { children: [(0, jsx_runtime_1.jsx)("li", Object.assign({ className: "nav-item" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ className: "nav-link", style: { color: "white" }, to: "/" }, { children: "\u30ED\u30B0\u30A4\u30F3" })) })), (0, jsx_runtime_1.jsx)("li", Object.assign({ className: "nav-item" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ className: "nav-link", style: { color: "white" }, to: "/register" }, { children: "\u793E\u54E1\u767B\u9332" })) })), (0, jsx_runtime_1.jsx)("li", Object.assign({ className: "nav-item" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ className: "nav-link", style: { color: "white" }, to: "/attendance" }, { children: "\u51FA\u9000\u52E4\u7BA1\u7406" })) })), (0, jsx_runtime_1.jsx)("li", Object.assign({ className: "nav-item" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ className: "nav-link", style: { color: "white" }, to: "/report" }, { children: "\u6708\u672B\u5E33\u7968\u51FA\u529B" })) }))] })) })), (0, jsx_runtime_1.jsxs)(react_router_dom_1.Switch, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/", exact: true, component: LoginForm_1.default }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/register", component: RegisterEmployeeForm_1.default }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/attendance", component: AttendanceForm_1.default }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/report", component: MonthlyReport_1.default })] })] })) }));
};
exports.default = App;
