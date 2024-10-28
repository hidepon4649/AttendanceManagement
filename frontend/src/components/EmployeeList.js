"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const axios_1 = __importDefault(require("axios"));
require("../css/EmployeeList.css");
const EmployeeList = () => {
    const [list, setList] = (0, react_1.useState)([]);
    const fetchList = () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios_1.default.get('http://localhost:8080/api/employees');
        setList(response.data);
    });
    (0, react_1.useEffect)(() => {
        fetchList();
    }, []); // 空の配列を第2引数に渡すことで、初回レンダリング時のみ実行される
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mx-3 mt-3" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "\u793E\u54E1\u4E00\u89A7" }), (0, jsx_runtime_1.jsxs)("table", Object.assign({ className: "table table-hover table-striped" }, { children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", Object.assign({ className: "row" }, { children: [(0, jsx_runtime_1.jsx)("th", Object.assign({ className: "col" }, { children: "\u540D\u524D" })), (0, jsx_runtime_1.jsx)("th", Object.assign({ className: "col" }, { children: "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9" })), (0, jsx_runtime_1.jsx)("th", Object.assign({ className: "col" }, { children: "\u6A29\u9650" }))] })) }), (0, jsx_runtime_1.jsx)("tbody", { children: list.map((employee) => ((0, jsx_runtime_1.jsxs)("tr", Object.assign({ className: "row" }, { children: [(0, jsx_runtime_1.jsx)("td", Object.assign({ className: "col" }, { children: employee.name })), (0, jsx_runtime_1.jsx)("td", Object.assign({ className: "col" }, { children: employee.email })), (0, jsx_runtime_1.jsx)("td", Object.assign({ className: "col" }, { children: employee.isAdmin ? '管理者' : '一般' }))] }), employee.id))) })] }))] })));
};
exports.default = EmployeeList;
