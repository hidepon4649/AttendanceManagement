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
const AttendanceForm = () => {
    const [employeeId, setEmployeeId] = (0, react_1.useState)('');
    const [employees, setEmployees] = (0, react_1.useState)([]);
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
    const handleClockIn = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.post('http://localhost:8080/api/attendance/clock-in', { employeeId });
            console.log('Clocked in:', response.data);
        }
        catch (error) {
            console.error('Clock-in failed:', error);
        }
    });
    const handleClockOut = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.post('http://localhost:8080/api/attendance/clock-out', { employeeId });
            console.log('Clocked out:', response.data);
        }
        catch (error) {
            console.error('Clock-out failed:', error);
        }
    });
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mx-3 mt-3" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "\u51FA\u9000\u52E4\u7BA1\u7406" }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "align-items-center" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "me-2", htmlFor: "id" }, { children: "\u793E\u54E1ID" })), (0, jsx_runtime_1.jsxs)("select", Object.assign({ className: "me-2", name: "id", value: employeeId, onChange: (e) => setEmployeeId(e.target.value) }, { children: [(0, jsx_runtime_1.jsx)("option", Object.assign({ value: "" }, { children: "\u793E\u54E1ID\u3092\u9078\u629E" })), employees.map(employee => ((0, jsx_runtime_1.jsx)("option", Object.assign({ value: employee.id }, { children: employee.name }), employee.id)))] })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "me-2 btn btn-primary", onClick: handleClockIn }, { children: "\u51FA\u52E4" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "btn btn-secondary", onClick: handleClockOut }, { children: "\u9000\u52E4" }))] }))] })));
};
exports.default = AttendanceForm;
