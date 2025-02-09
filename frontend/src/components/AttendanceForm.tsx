import React, { useState, useEffect, useContext } from "react";
import api from "../services/api";
import { Employee } from "../models/Employee";
import { Attendance } from "../models/Attendance";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PunchClockIcon from "@mui/icons-material/PunchClock";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { lsGetMyId } from "../utils/localStorageUtils";

import { Bikou } from "./Bikou";
import { ClockInOutEditSave } from "./ClockInOutEditSave";
import OutputReportButton from "./OutputReportButton";
import {
  getYoubi,
  getDefaultRecords,
  minutesToHHMM,
} from "../utils/dateTimeUtils";
import LoginUserContext from "src/context/LoginUserContext";

const AttendanceForm = () => {
  const { isAdmin } = useContext(LoginUserContext);

  const [employeeId, setEmployeeId] = useState(() => {
    return lsGetMyId();
  });
  const [employees, setEmployees] = useState([] as Employee[]);
  const [attendanceRecords, setAttendanceRecords] = useState(
    [] as Attendance[]
  );
  const [targetMonth, setTargetMonth] = useState(
    new Date().toISOString().slice(0, 7)
  ); // YYYY-MM形式で年月を取得
  const [dates, setDates] = useState<string[]>([]);

  const [totalMinutes, setTotalMinutes] = useState(0); // 当月作業時間の合計(分)

  const fetchAttendanceRecords = async () => {
    if (employeeId) {
      try {
        // 初期化
        setAttendanceRecords([] as Attendance[]);
        setTotalMinutes(0);

        const response = await api.get(
          `/attendance/${employeeId}/${targetMonth}`
        );
        setAttendanceRecords(
          response.data.map((record: any) => ({
            ...record,
            employeeName: record.employee.name,
          }))
        );
        console.log("Attendance records:", response.data);
      } catch (error) {
        console.error("Failed to fetch attendance records:", error);
      }
    }
  };

  const targetMonthDefaultRecords = async () => {
    setDates(getDefaultRecords(targetMonth));
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      // 管理者の場合のみ社員情報を取得
      if (isAdmin) {
        try {
          const response = await api.get("/employees");
          setEmployees(response.data);
        } catch (error) {
          console.error("Failed to fetch employees:", error);
        }
      }
    };
    fetchEmployees().catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetchAttendanceRecords().catch((error) => console.error(error));
    targetMonthDefaultRecords().catch((error) => console.error(error));
  }, [employeeId, targetMonth]);

  const handleClockIn = async () => {
    if (employeeId) {
      try {
        const response = await api.post(
          `/attendance/${employeeId}/clock-in`,
          {}
        );

        console.log("Clocked in:", response.data);

        // 出勤記録を再取得して更新
        await fetchAttendanceRecords();
      } catch (error) {
        console.error("Clock-in failed:", error);
      }
    }
  };

  const handleClockOut = async () => {
    if (employeeId) {
      try {
        const response = await api.post(
          `/attendance/${employeeId}/clock-out`,
          {}
        );
        console.log("Clocked out:", response.data);

        // 出勤記録を再取得して更新
        await fetchAttendanceRecords();
      } catch (error) {
        console.error("Clock-out failed:", error);
      }
    }
  };

  const handleEmployeeIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEmployeeId(Number(e.target.value));
  };

  const updateMonth = (offset: number) => {
    const [year, month] = targetMonth.split("-").map(Number); // 年と月を分解
    const date = new Date(year, month + offset, 1); // 日付オブジェクト作成（0ベースの月）
    return date.toISOString().slice(0, 7); // YYYY-MM形式で返す
  };

  const handlePrevMonth = () => {
    const newMonth = updateMonth(-1); // 前の月に移動
    console.log(newMonth);
    setTargetMonth(newMonth);
  };

  const handleNextMonth = () => {
    const newMonth = updateMonth(1); // 次の月に移動
    console.log(newMonth);
    setTargetMonth(newMonth);
  };

  const isCurrentMonth = () => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    console.log(`currentMonth:${currentMonth}, targetMonth:${targetMonth}`);
    return currentMonth === targetMonth;
  };

  const getYoubiHtml = (date: string) => {
    const youbi = new Date(date).getDay();
    const colorClass =
      youbi === 0 ? "text-danger" : youbi === 6 ? "text-primary" : "text-dark";
    return <span className={colorClass}>{getYoubi(date)}</span>;
  };

  return (
    <div className="mx-3 mt-3">
      <div className="row">
        <div className="col-2">
          <h2>出退勤管理</h2>
        </div>
        <div className="col-3">
          <h3 className="d-inline-flex align-items-center">
            <IconButton
              aria-label="prev month"
              name="prevMonth"
              onClick={handlePrevMonth}
            >
              <NavigateBeforeIcon />
            </IconButton>
            {targetMonth}
            <IconButton
              aria-label="next month"
              name="nextMonth"
              onClick={handleNextMonth}
            >
              <NavigateNextIcon />
            </IconButton>
          </h3>
        </div>
      </div>
      <div className="align-items-center mt-3">
        {/* 管理者の場合、出退勤管理する社員を選択可能 */}
        {isAdmin && (
          <>
            <label className="me-2" htmlFor="id">
              社員を選択
            </label>
            <select
              className="me-2"
              name="id"
              value={employeeId}
              onChange={handleEmployeeIdChange}
            >
              <option value="">社員IDを選択</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))}
            </select>
          </>
        )}
        <Button
          className="mx-3 btn btn-primary"
          size="large"
          onClick={handleClockIn}
          variant="outlined"
          disabled={!isCurrentMonth()}
          startIcon={<PunchClockIcon />}
        >
          出社
        </Button>
        <Button
          className="btn btn-secondary"
          size="large"
          onClick={handleClockOut}
          variant="outlined"
          disabled={!isCurrentMonth()}
          startIcon={<PunchClockIcon />}
        >
          退社
        </Button>
        <OutputReportButton
          employeeId={employeeId}
          targetMonth={targetMonth}
          attendanceRecords={attendanceRecords}
          totalMinutes={totalMinutes}
        />
      </div>
      <div className="mt-3 bg-info text-body p-2">
        当月作業時間の合計: {minutesToHHMM(totalMinutes)}
      </div>
      <table className="table table-striped table-hover mt-3">
        <thead>
          <tr>
            <th>日付</th>
            <th>出勤時間</th>
            <th>退勤時間</th>
            <th>休憩(分)</th>
            <th>作業時間</th>
            <th>備考 (簡潔に入力して下さい)</th>
          </tr>
        </thead>
        <tbody>
          {dates.map((date) => {
            const record: Attendance | null = attendanceRecords.length
              ? attendanceRecords.find((record) => record.date === date) || null
              : null;
            return (
              <tr key={date}>
                <td>
                  {date}
                  {getYoubiHtml(date)}
                </td>
                <ClockInOutEditSave
                  isAdmin={isAdmin}
                  record={record}
                  callback={fetchAttendanceRecords}
                  setTotalMinutes={setTotalMinutes}
                />
                <td>
                  <Bikou
                    employeeId={employeeId}
                    date={date}
                    initalRemarks={record ? record.remarks : ""}
                    callback={fetchAttendanceRecords}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceForm;
