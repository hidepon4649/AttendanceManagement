import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Employee } from '../models/Employee';
import { Attendance } from '../models/Attendance';
import Button from '@mui/material/Button';
import PunchClockIcon from '@mui/icons-material/PunchClock';
import { lsGetMyId } from '../utils/localStorageUtils';
import {
  handleApiError,
  addRecord,
  fetchAttendanceRecords,
  targetMonthDefaultRecords,
  updateMonth,
  isCurrentMonth,
} from '../utils/attendanceUtils';
import { Bikou } from '../components/Bikou';
import { ClockInOutEditSave } from '../components/ClockInOutEditSave';
import OutputReportButton from '../components/OutputReportButton';
import { getFormattedToday, minutesToHHMM } from '../utils/dateTimeUtils';
import MonthNavigation from '../components/MonthNavigation';
import useLoginUserContext from 'src/hooks/useLoginUserContext';
import { Youbi } from '../components/Youbi';

const AttendanceFormPage = () => {
  const { isAdmin } = useLoginUserContext();

  const [employeeId, setEmployeeId] = useState(() => {
    return lsGetMyId();
  });
  const [employees, setEmployees] = useState([] as Employee[]);
  const [attendanceRecords, setAttendanceRecords] = useState(
    [] as Attendance[]
  );
  const [targetMonth, setTargetMonth] = useState(
    getFormattedToday().slice(0, 7)
  ); // YYYY-MM形式で年月を取得
  const [dates, setDates] = useState<string[]>([]);

  const [totalMinutes, setTotalMinutes] = useState(0); // 当月作業時間の合計(分)

  useEffect(() => {
    const fetchEmployees = async () => {
      // 管理者の場合のみ社員情報を取得
      if (isAdmin) {
        try {
          const response = await api.get('/employees');
          setEmployees(response.data);
        } catch (error) {
          handleApiError(error, 'Failed to fetch employees');
        }
      }
    };
    fetchEmployees().catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetchAttendanceRecords(
      employeeId,
      targetMonth,
      setAttendanceRecords,
      setTotalMinutes
    ).catch((error) => console.error(error));
    targetMonthDefaultRecords(targetMonth, setDates);
  }, [employeeId, targetMonth]);

  const handleClockIn = async () => {
    if (employeeId) {
      try {
        const response = await api.post(
          `/attendance/${employeeId}/clock-in`,
          {}
        );

        console.log(`Clocked in:${response.data}`);

        // 出勤記録を再取得して更新
        await fetchAttendanceRecords(
          employeeId,
          targetMonth,
          setAttendanceRecords,
          setTotalMinutes
        );
      } catch (error) {
        handleApiError(error, 'Clock-in failed');
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
        console.log(`Clocked out:${response.data}`);

        // 出勤記録を再取得して更新
        await fetchAttendanceRecords(
          employeeId,
          targetMonth,
          setAttendanceRecords,
          setTotalMinutes
        );
      } catch (error) {
        handleApiError(error, 'Clock-out failed');
      }
    }
  };

  const handleEmployeeIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEmployeeId(Number(e.target.value));
  };

  const handlePrevMonth = () => {
    const newMonth = updateMonth(targetMonth, -1); // 前の月に移動
    console.log(`${newMonth}`);
    setTargetMonth(newMonth);
  };

  const handleNextMonth = () => {
    const newMonth = updateMonth(targetMonth, 1); // 次の月に移動
    console.log(`${newMonth}`);
    setTargetMonth(newMonth);
  };

  const attendanceList = dates.map((date) => {
    const record: Attendance | null = attendanceRecords.length
      ? attendanceRecords.find((record) => record.date === date) || null
      : null;
    return (
      <tr key={date}>
        <td>
          {date}
          <Youbi date={date} />
        </td>
        <ClockInOutEditSave
          record={record}
          callback={() =>
            fetchAttendanceRecords(
              employeeId,
              targetMonth,
              setAttendanceRecords,
              setTotalMinutes
            )
          }
          setTotalMinutes={setTotalMinutes}
          addRecord={() => addRecord(employeeId, date)}
        />
        <td>
          <Bikou
            employeeId={employeeId}
            date={date}
            initalRemarks={record ? record.remarks : ''}
            callback={() =>
              fetchAttendanceRecords(
                employeeId,
                targetMonth,
                setAttendanceRecords,
                setTotalMinutes
              )
            }
          />
        </td>
      </tr>
    );
  });

  return (
    <div className="mx-3 mt-3">
      <div className="row">
        <div className="col-2">
          <h2>出退勤管理</h2>
        </div>
        <div className="col-3">
          <MonthNavigation
            targetMonth={targetMonth}
            handlePrevMonth={handlePrevMonth}
            handleNextMonth={handleNextMonth}
          />
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
          disabled={!isCurrentMonth(targetMonth)}
          startIcon={<PunchClockIcon />}
        >
          出社
        </Button>
        <Button
          className="btn btn-secondary"
          size="large"
          onClick={handleClockOut}
          variant="outlined"
          disabled={!isCurrentMonth(targetMonth)}
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
            <th className="align-middle p-0 m-0">日付</th>
            <th className="align-middle p-0 m-0">出勤時間</th>
            <th className="align-middle p-0 m-0">退勤時間</th>
            <th className="align-middle p-0 m-0">休憩(分)</th>
            <th className="align-middle p-0 m-0">作業時間</th>
            <th className="align-middle p-0 m-0">操作</th>
            <th className="align-middle p-0 m-0">
              備考 (簡潔に入力して下さい)
            </th>
          </tr>
        </thead>
        <tbody>{attendanceList}</tbody>
      </table>
    </div>
  );
};

export default AttendanceFormPage;
