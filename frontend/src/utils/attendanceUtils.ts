import api from "../services/api";
import { getDefaultRecords, getYoubi } from "./dateTimeUtils";
import { Attendance } from "../models/Attendance";

export const handleApiError = (error: any, message: string) => {
  console.error(`${message}:`, error);
};

export const addRecord = async (employeeId: number, date: string) => {
  try {
    const response = await api.post(`/attendance/${employeeId}/${date}`, {
      employeeId,
      date,
    });
    console.log("Record added:", response.data);
  } catch (error) {
    handleApiError(error, "Failed to add record");
  }
};

export const fetchAttendanceRecords = async (
  employeeId: number,
  targetMonth: string,
  setAttendanceRecords: React.Dispatch<React.SetStateAction<Attendance[]>>,
  setTotalMinutes: React.Dispatch<React.SetStateAction<number>>
) => {
  try {
    setAttendanceRecords([] as Attendance[]);
    setTotalMinutes(0);

    const response = await api.get(`/attendance/${employeeId}/${targetMonth}`);
    setAttendanceRecords(
      response.data.map((record: any) => ({
        ...record,
        employeeName: record.employee.name,
      }))
    );
    console.log("Attendance records:", response.data);
  } catch (error) {
    handleApiError(error, "Failed to fetch attendance records");
  }
};

export const targetMonthDefaultRecords = (
  targetMonth: string,
  setDates: React.Dispatch<React.SetStateAction<string[]>>
) => {
  setDates(getDefaultRecords(targetMonth));
};

export const updateMonth = (targetMonth: string, offset: number) => {
  const [year, month] = targetMonth.split("-").map(Number);
  const date = new Date(year, month + offset, 1);
  return date.toISOString().slice(0, 7);
};

export const isCurrentMonth = (targetMonth: string) => {
  const currentMonth = new Date().toISOString().slice(0, 7);
  console.log(`currentMonth:${currentMonth}, targetMonth:${targetMonth}`);
  return currentMonth === targetMonth;
};
