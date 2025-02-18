import api from "../services/api";
import { getDefaultRecords } from "./dateTimeUtils";
export const handleApiError = (error, message) => {
    console.error(`${message}:`, error);
};
export const addRecord = async (employeeId, date) => {
    try {
        const response = await api.post(`/attendance/${employeeId}/${date}`, {
            employeeId,
            date,
        });
        console.log("Record added:", response.data);
    }
    catch (error) {
        handleApiError(error, "Failed to add record");
    }
};
export const fetchAttendanceRecords = async (employeeId, targetMonth, setAttendanceRecords, setTotalMinutes) => {
    try {
        setAttendanceRecords([]);
        setTotalMinutes(0);
        const response = await api.get(`/attendance/${employeeId}/${targetMonth}`);
        setAttendanceRecords(response.data.map((record) => ({
            ...record,
            employeeName: record.employee.name,
        })));
        console.log("Attendance records:", response.data);
    }
    catch (error) {
        handleApiError(error, "Failed to fetch attendance records");
    }
};
export const targetMonthDefaultRecords = (targetMonth, setDates) => {
    setDates(getDefaultRecords(targetMonth) || []);
};
export const updateMonth = (targetMonth, offset) => {
    const [year, month] = targetMonth.split("-").map(Number);
    const date = new Date(year, month + offset, 1);
    return date.toISOString().slice(0, 7);
};
export const isCurrentMonth = (targetMonth) => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    console.log(`currentMonth:${currentMonth}, targetMonth:${targetMonth}`);
    return currentMonth === targetMonth;
};
