import React, { useState, useEffect } from "react";
import api from "../services/api";
import { Employee } from "../models/Employee";
import { Attendance } from "../models/Attendance";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PunchClockIcon from "@mui/icons-material/PunchClock";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { lsIsAdmin, lsGetMyId } from "../utils/localStorageUtils";
import { Bikou } from "./Bikou";

const AttendanceForm = () => {
  const [isAdmin, setIsAdmin] = useState(() => {
    return lsIsAdmin();
  });

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

  const fetchAttendanceRecords = async () => {
    if (employeeId) {
      try {
        setAttendanceRecords([] as Attendance[]); // ID切り替え時に初期化
        const response = await api.get(
          `/attendance/${employeeId}/${targetMonth}`
        );
        setAttendanceRecords(response.data);
        console.log("Attendance records:", attendanceRecords);
      } catch (error) {
        console.error("Failed to fetch attendance records:", error);
      }
    }
  };

  const targetMonthDefaultRecords = async () => {
    const [year, month] = targetMonth.split("-").map(Number);
    const lastDay = new Date(year, month, 0).getDate(); // 月の最終日を取得(月は0ベース)

    // 日付の配列を作成. 1日から月末までの日付を格納.
    // ロケール指定をしなかった場合に月初日付がずれる場合があるため ja-JPを指定
    const daysArray = Array.from({ length: lastDay }, (_, i) =>
      new Date(year, month - 1, i + 1)
        .toLocaleDateString("ja-JP", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          timeZone: "Asia/Tokyo",
        })
        .replace(/\//g, "-")
    );

    setDates(daysArray);
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
    fetchEmployees();
  }, []);

  useEffect(() => {
    fetchAttendanceRecords();
    targetMonthDefaultRecords();
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

  const handlePrevMonth = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newMonth = updateMonth(-1); // 前の月に移動
    console.log(newMonth);
    setTargetMonth(newMonth);
  };

  const handleNextMonth = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newMonth = updateMonth(1); // 次の月に移動
    console.log(newMonth);
    setTargetMonth(newMonth);
  };

  const formatTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toTimeString().split(" ")[0]; // "HH:MM:SS"形式で取得
  };

  const isCurrentMonth = () => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    console.log(`currentMonth:${currentMonth}, targetMonth:${targetMonth}`);
    return currentMonth === targetMonth;
  };

  const getYoubi = (date: string) => {
    const youbi = new Date(date).getDay();
    const youbiList = ["(日)", "(月)", "(火)", "(水)", "(木)", "(金)", "(土)"];
    const colorClass =
      youbi === 0 ? "text-danger" : youbi === 6 ? "text-primary" : "text-dark";
    return <span className={colorClass}>{youbiList[youbi]}</span>;
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
      </div>
      <table className="table table-striped table-hover mt-3">
        <thead>
          <tr>
            <th>日付</th>
            <th>出勤時間</th>
            <th>退勤時間</th>
            <th>備考</th>
          </tr>
        </thead>
        <tbody>
          {dates.map((date) => {
            const record = attendanceRecords.length
              ? attendanceRecords.find((record) => record.date === date)
              : null;
            return (
              <tr key={date}>
                <td>
                  {date}
                  {getYoubi(date)}
                </td>
                <td>
                  {record
                    ? record.clockInTime
                      ? formatTime(record.clockInTime)
                      : "-"
                    : "-"}
                </td>
                <td>
                  {record
                    ? record.clockOutTime
                      ? formatTime(record.clockOutTime)
                      : "-"
                    : "-"}
                </td>
                <td>
                  <Bikou
                    employeeId={employeeId}
                    date={date}
                    remarks={record ? record.remarks : ""}
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
