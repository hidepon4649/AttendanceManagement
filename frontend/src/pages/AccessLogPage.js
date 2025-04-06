import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
const _jsxFileName = "/Users/hidemac1/attendance-management-app/frontend/src/pages/AccessLogPage.tsx";
import { useState, useEffect } from 'react';
import api from '../services/api';
import '../css/AccessLog.css';
const AccessLogPage = () => {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [list, setList] = useState([]);
    const fetchList = async () => {
        const response = await api.get(`/accesslogs/${date}`);
        setList(response.data);
    };
    useEffect(() => {
        fetchList().catch((error) => console.error(error));
    }, [date]);
    const logList = list.map((log) => (_jsxDEV("tr", { className: "row p-0 m-0", children: [_jsxDEV("td", { className: "col-1", children: log.username?.split('@')[0] }, void 0, false, { fileName: _jsxFileName, lineNumber: 23, columnNumber: 7 }, this), _jsxDEV("td", { className: "col-2", children: log.className?.split('.').pop() }, void 0, false, { fileName: _jsxFileName, lineNumber: 24, columnNumber: 7 }, this), _jsxDEV("td", { className: "col-2", children: log.methodName }, void 0, false, { fileName: _jsxFileName, lineNumber: 25, columnNumber: 7 }, this), _jsxDEV("td", { className: "col-5", children: log.methodParams }, void 0, false, { fileName: _jsxFileName, lineNumber: 26, columnNumber: 7 }, this), _jsxDEV("td", { className: "col-2", children: log.accessTime }, void 0, false, { fileName: _jsxFileName, lineNumber: 29, columnNumber: 7 }, this)] }, log.id, true, { fileName: _jsxFileName, lineNumber: 20, columnNumber: 49 }, this)));
    return (_jsxDEV("table", { className: "table table-striped table-hover mt-3", children: _jsxDEV("tbody", { children: logList }, void 0, false, { fileName: _jsxFileName, lineNumber: 35, columnNumber: 7 }, this) }, void 0, false, { fileName: _jsxFileName, lineNumber: 33, columnNumber: 11 }, this));
};
export default AccessLogPage;
