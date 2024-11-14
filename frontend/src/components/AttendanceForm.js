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
const Button_1 = __importDefault(require("@mui/material/Button"));
const PunchClock_1 = __importDefault(require("@mui/icons-material/PunchClock"));
const AttendanceForm = () => {
    const [employeeId, setEmployeeId] = (0, react_1.useState)('');
    const [employees, setEmployees] = (0, react_1.useState)([]);
    const [attendanceRecords, setAttendanceRecords] = (0, react_1.useState)([]);
    const fetchAttendanceRecords = () => __awaiter(void 0, void 0, void 0, function* () {
        if (employeeId) {
            try {
                const date = new Date().toISOString().slice(0, 7); // YYYY-MM形式で年月を取得
                const response = yield axios_1.default.get(`http://localhost:8080/api/attendance/${employeeId}/${date}`);
                setAttendanceRecords(response.data);
                console.log('Attendance records:', attendanceRecords);
            }
            catch (error) {
                console.error('Failed to fetch attendance records:', error);
            }
        }
    });
    (0, react_1.useEffect)(() => {
        const fetchEmployees = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get('http://localhost:8080/api/employees');
                setEmployees(response.data);
            }
            catch (error) {
                console.error('Failed to fetch employees:', error);
            }
        });
        fetchEmployees();
    }, []);
    (0, react_1.useEffect)(() => {
        fetchAttendanceRecords();
    }, [employeeId]);
    const handleClockIn = () => __awaiter(void 0, void 0, void 0, function* () {
        if (employeeId) {
            try {
                const response = yield axios_1.default.post(`http://localhost:8080/api/attendance/${employeeId}/clock-in`);
                console.log('Clocked in:', response.data);
                // 出勤記録を再取得して更新
                yield fetchAttendanceRecords();
            }
            catch (error) {
                console.error('Clock-in failed:', error);
            }
        }
    });
    const handleClockOut = () => __awaiter(void 0, void 0, void 0, function* () {
        if (employeeId) {
            try {
                const response = yield axios_1.default.post(`http://localhost:8080/api/attendance/${employeeId}/clock-out`);
                console.log('Clocked out:', response.data);
                // 出勤記録を再取得して更新
                yield fetchAttendanceRecords();
            }
            catch (error) {
                console.error('Clock-out failed:', error);
            }
        }
    });
    const handleEmployeeIdChange = (e) => {
        setEmployeeId(e.target.value);
    };
    const formatTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return date.toTimeString().split(' ')[0]; // "HH:MM:SS"形式で取得
    };
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mx-3 mt-3" }, { children: [(0, jsx_runtime_1.jsx)("h2", Object.assign({ className: "h2" }, { children: "\u51FA\u9000\u52E4\u7BA1\u7406" })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "align-items-center mt-3" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "me-2", htmlFor: "id" }, { children: "\u793E\u54E1ID" })), (0, jsx_runtime_1.jsxs)("select", Object.assign({ className: "me-2", name: "id", value: employeeId, onChange: handleEmployeeIdChange }, { children: [(0, jsx_runtime_1.jsx)("option", Object.assign({ value: "" }, { children: "\u793E\u54E1ID\u3092\u9078\u629E" })), employees.map(employee => ((0, jsx_runtime_1.jsx)("option", Object.assign({ value: employee.id }, { children: employee.name }), employee.id)))] })), (0, jsx_runtime_1.jsx)(Button_1.default, Object.assign({ className: "mx-3 btn btn-primary", size: "large", onClick: handleClockIn, variant: "outlined", startIcon: (0, jsx_runtime_1.jsx)(PunchClock_1.default, {}) }, { children: "\u51FA\u793E" })), (0, jsx_runtime_1.jsx)(Button_1.default, Object.assign({ className: "btn btn-secondary", size: "large", onClick: handleClockOut, variant: "outlined", startIcon: (0, jsx_runtime_1.jsx)(PunchClock_1.default, {}) }, { children: "\u9000\u793E" }))] })), attendanceRecords.length > 0 && ((0, jsx_runtime_1.jsxs)("table", Object.assign({ className: "table table-striped table-hover mt-3" }, { children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { children: "\u65E5\u4ED8" }), (0, jsx_runtime_1.jsx)("th", { children: "\u51FA\u52E4\u6642\u9593" }), (0, jsx_runtime_1.jsx)("th", { children: "\u9000\u52E4\u6642\u9593" })] }) }), (0, jsx_runtime_1.jsx)("tbody", { children: attendanceRecords.map(record => ((0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { children: record.date }), (0, jsx_runtime_1.jsx)("td", { children: formatTime(record.clockInTime) }), (0, jsx_runtime_1.jsx)("td", { children: formatTime(record.clockOutTime) })] }, record.id))) })] })))] })));
};
exports.default = AttendanceForm;
