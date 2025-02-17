import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "react/jsx-dev-runtime";
const _jsxFileName = "/Users/hidemac1/attendance-management-app/frontend/src/pages/AttendanceFormPage.tsx";
import { useState, useEffect } from "react";
import api from "../services/api";
import Button from "@mui/material/Button";
import PunchClockIcon from "@mui/icons-material/PunchClock";
import { lsGetMyId } from "../utils/localStorageUtils";
import { handleApiError, addRecord, fetchAttendanceRecords, targetMonthDefaultRecords, updateMonth, isCurrentMonth, } from "../utils/attendanceUtils";
import { Bikou } from "../components/Bikou";
import { ClockInOutEditSave } from "../components/ClockInOutEditSave";
import OutputReportButton from "../components/OutputReportButton";
import { minutesToHHMM } from "../utils/dateTimeUtils";
import MonthNavigation from "../components/MonthNavigation";
import useLoginUserContext from "src/hooks/useLoginUserContext";
import { Youbi } from "../components/Youbi";
const AttendanceFormPage = () => {
    const { isAdmin } = useLoginUserContext();
    const [employeeId, setEmployeeId] = useState(() => {
        return lsGetMyId();
    });
    const [employees, setEmployees] = useState([]);
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [targetMonth, setTargetMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM形式で年月を取得
    const [dates, setDates] = useState([]);
    const [totalMinutes, setTotalMinutes] = useState(0); // 当月作業時間の合計(分)
    useEffect(() => {
        const fetchEmployees = async () => {
            // 管理者の場合のみ社員情報を取得
            if (isAdmin) {
                try {
                    const response = await api.get("/employees");
                    setEmployees(response.data);
                }
                catch (error) {
                    handleApiError(error, "Failed to fetch employees");
                }
            }
        };
        fetchEmployees().catch((error) => console.error(error));
    }, []);
    useEffect(() => {
        fetchAttendanceRecords(employeeId, targetMonth, setAttendanceRecords, setTotalMinutes).catch((error) => console.error(error));
        targetMonthDefaultRecords(targetMonth, setDates);
    }, [employeeId, targetMonth]);
    const handleClockIn = async () => {
        if (employeeId) {
            try {
                const response = await api.post(`/attendance/${employeeId}/clock-in`, {});
                console.log("Clocked in:", response.data);
                // 出勤記録を再取得して更新
                await fetchAttendanceRecords(employeeId, targetMonth, setAttendanceRecords, setTotalMinutes);
            }
            catch (error) {
                handleApiError(error, "Clock-in failed");
            }
        }
    };
    const handleClockOut = async () => {
        if (employeeId) {
            try {
                const response = await api.post(`/attendance/${employeeId}/clock-out`, {});
                console.log("Clocked out:", response.data);
                // 出勤記録を再取得して更新
                await fetchAttendanceRecords(employeeId, targetMonth, setAttendanceRecords, setTotalMinutes);
            }
            catch (error) {
                handleApiError(error, "Clock-out failed");
            }
        }
    };
    const handleEmployeeIdChange = (e) => {
        setEmployeeId(Number(e.target.value));
    };
    const handlePrevMonth = () => {
        const newMonth = updateMonth(targetMonth, -1); // 前の月に移動
        console.log(newMonth);
        setTargetMonth(newMonth);
    };
    const handleNextMonth = () => {
        const newMonth = updateMonth(targetMonth, 1); // 次の月に移動
        console.log(newMonth);
        setTargetMonth(newMonth);
    };
    const attendanceList = dates.map((date) => {
        const record = attendanceRecords.length
            ? attendanceRecords.find((record) => record.date === date) || null
            : null;
        return (_jsxDEV("tr", { children: [_jsxDEV("td", { children: [date, _jsxDEV(Youbi, { date: date }, void 0, false, { fileName: _jsxFileName, lineNumber: 135, columnNumber: 11 }, this)] }, void 0, true, { fileName: _jsxFileName, lineNumber: 133, columnNumber: 9 }, this), _jsxDEV(ClockInOutEditSave, { record: record, callback: () => fetchAttendanceRecords(employeeId, targetMonth, setAttendanceRecords, setTotalMinutes), setTotalMinutes: setTotalMinutes, addRecord: () => addRecord(employeeId, date) }, void 0, false, { fileName: _jsxFileName, lineNumber: 137, columnNumber: 9 }, this), _jsxDEV("td", { children: _jsxDEV(Bikou, { employeeId: employeeId, date: date, initalRemarks: record ? record.remarks : "", callback: () => fetchAttendanceRecords(employeeId, targetMonth, setAttendanceRecords, setTotalMinutes) }, void 0, false, { fileName: _jsxFileName, lineNumber: 151, columnNumber: 11 }, this) }, void 0, false, { fileName: _jsxFileName, lineNumber: 150, columnNumber: 9 }, this)] }, date, true, { fileName: _jsxFileName, lineNumber: 131, columnNumber: 13 }, this));
    });
    return (_jsxDEV("div", { className: "mx-3 mt-3", children: [_jsxDEV("div", { className: "row", children: [_jsxDEV("div", { className: "col-2", children: _jsxDEV("h2", { children: "\u51FA\u9000\u52E4\u7BA1\u7406" }, void 0, false, { fileName: _jsxFileName, lineNumber: 173, columnNumber: 11 }, this) }, void 0, false, { fileName: _jsxFileName, lineNumber: 172, columnNumber: 9 }, this), _jsxDEV("div", { className: "col-3", children: _jsxDEV(MonthNavigation, { targetMonth: targetMonth, handlePrevMonth: handlePrevMonth, handleNextMonth: handleNextMonth }, void 0, false, { fileName: _jsxFileName, lineNumber: 176, columnNumber: 11 }, this) }, void 0, false, { fileName: _jsxFileName, lineNumber: 175, columnNumber: 9 }, this)] }, void 0, true, { fileName: _jsxFileName, lineNumber: 171, columnNumber: 7 }, this), _jsxDEV("div", { className: "align-items-center mt-3", children: [isAdmin && (_jsxDEV(_Fragment, { children: [_jsxDEV("label", { className: "me-2", htmlFor: "id", children: "\u793E\u54E1\u3092\u9078\u629E" }, void 0, false, { fileName: _jsxFileName, lineNumber: 187, columnNumber: 13 }, this), _jsxDEV("select", { className: "me-2", name: "id", value: employeeId, onChange: handleEmployeeIdChange, children: [_jsxDEV("option", { value: "", children: "\u793E\u54E1ID\u3092\u9078\u629E" }, void 0, false, { fileName: _jsxFileName, lineNumber: 196, columnNumber: 15 }, this), employees.map((employee) => (_jsxDEV("option", { value: employee.id, children: employee.name }, employee.id, false, { fileName: _jsxFileName, lineNumber: 197, columnNumber: 45 }, this)))] }, void 0, true, { fileName: _jsxFileName, lineNumber: 190, columnNumber: 13 }, this)] }, void 0, true, { fileName: _jsxFileName, lineNumber: 185, columnNumber: 22 }, this)), _jsxDEV(Button, { className: "mx-3 btn btn-primary", size: "large", onClick: handleClockIn, variant: "outlined", disabled: !isCurrentMonth(targetMonth), startIcon: _jsxDEV(PunchClockIcon, {}, void 0, false, { fileName: _jsxFileName, lineNumber: 211, columnNumber: 22 }, this), children: "\u51FA\u793E" }, void 0, false, { fileName: _jsxFileName, lineNumber: 205, columnNumber: 9 }, this), _jsxDEV(Button, { className: "btn btn-secondary", size: "large", onClick: handleClockOut, variant: "outlined", disabled: !isCurrentMonth(targetMonth), startIcon: _jsxDEV(PunchClockIcon, {}, void 0, false, { fileName: _jsxFileName, lineNumber: 221, columnNumber: 22 }, this), children: "\u9000\u793E" }, void 0, false, { fileName: _jsxFileName, lineNumber: 215, columnNumber: 9 }, this), _jsxDEV(OutputReportButton, { employeeId: employeeId, targetMonth: targetMonth, attendanceRecords: attendanceRecords, totalMinutes: totalMinutes }, void 0, false, { fileName: _jsxFileName, lineNumber: 225, columnNumber: 9 }, this)] }, void 0, true, { fileName: _jsxFileName, lineNumber: 183, columnNumber: 7 }, this), _jsxDEV("div", { className: "mt-3 bg-info text-body p-2", children: ["\u5F53\u6708\u4F5C\u696D\u6642\u9593\u306E\u5408\u8A08: ", minutesToHHMM(totalMinutes)] }, void 0, true, { fileName: _jsxFileName, lineNumber: 232, columnNumber: 7 }, this), _jsxDEV("table", { className: "table table-striped table-hover mt-3", children: [_jsxDEV("thead", { children: _jsxDEV("tr", { children: [_jsxDEV("th", { className: "align-middle p-0 m-0", children: "\u65E5\u4ED8" }, void 0, false, { fileName: _jsxFileName, lineNumber: 238, columnNumber: 13 }, this), _jsxDEV("th", { className: "align-middle p-0 m-0", children: "\u51FA\u52E4\u6642\u9593" }, void 0, false, { fileName: _jsxFileName, lineNumber: 239, columnNumber: 13 }, this), _jsxDEV("th", { className: "align-middle p-0 m-0", children: "\u9000\u52E4\u6642\u9593" }, void 0, false, { fileName: _jsxFileName, lineNumber: 240, columnNumber: 13 }, this), _jsxDEV("th", { className: "align-middle p-0 m-0", children: "\u4F11\u61A9(\u5206)" }, void 0, false, { fileName: _jsxFileName, lineNumber: 241, columnNumber: 13 }, this), _jsxDEV("th", { className: "align-middle p-0 m-0", children: "\u4F5C\u696D\u6642\u9593" }, void 0, false, { fileName: _jsxFileName, lineNumber: 242, columnNumber: 13 }, this), _jsxDEV("th", { className: "align-middle p-0 m-0", children: "\u64CD\u4F5C" }, void 0, false, { fileName: _jsxFileName, lineNumber: 243, columnNumber: 13 }, this), _jsxDEV("th", { className: "align-middle p-0 m-0", children: "\u5099\u8003 (\u7C21\u6F54\u306B\u5165\u529B\u3057\u3066\u4E0B\u3055\u3044)" }, void 0, false, { fileName: _jsxFileName, lineNumber: 244, columnNumber: 13 }, this)] }, void 0, true, { fileName: _jsxFileName, lineNumber: 237, columnNumber: 11 }, this) }, void 0, false, { fileName: _jsxFileName, lineNumber: 236, columnNumber: 9 }, this), _jsxDEV("tbody", { children: attendanceList }, void 0, false, { fileName: _jsxFileName, lineNumber: 249, columnNumber: 9 }, this)] }, void 0, true, { fileName: _jsxFileName, lineNumber: 235, columnNumber: 7 }, this)] }, void 0, true, { fileName: _jsxFileName, lineNumber: 169, columnNumber: 11 }, this));
};
export default AttendanceFormPage;
