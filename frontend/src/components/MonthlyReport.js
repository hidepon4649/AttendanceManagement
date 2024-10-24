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
const MonthlyReport = () => {
    const [report, setReport] = (0, react_1.useState)([]);
    const [month, setMonth] = (0, react_1.useState)('');
    (0, react_1.useEffect)(() => {
        const fetchReport = () => __awaiter(void 0, void 0, void 0, function* () {
            if (month) {
                const response = yield axios_1.default.get(`http://localhost:8080/api/attendance/report/${month}`);
                setReport(response.data);
            }
        });
        fetchReport();
    }, [month]);
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mx-3 mt-3" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "\u6708\u672B\u5E33\u7968\u51FA\u529B" }), (0, jsx_runtime_1.jsx)("input", { type: "month", value: month, onChange: (e) => setMonth(e.target.value) }), (0, jsx_runtime_1.jsx)("ul", { children: report.map((attendance) => ((0, jsx_runtime_1.jsxs)("li", { children: [attendance.employee.name, ": \u51FA\u52E4 ", attendance.clockInTime, ", \u9000\u52E4 ", attendance.clockOutTime] }, attendance.id))) })] })));
};
exports.default = MonthlyReport;
