import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Employee } from '../models/Employee';
import { Attendance } from '../models/Attendance';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PunchClockIcon from '@mui/icons-material/PunchClock';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const AttendanceForm = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [employees, setEmployees] = useState([] as Employee[]);
  const [attendanceRecords, setAttendanceRecords] = useState([] as Attendance[]);
  const [targetMonth, setTargetMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM形式で年月を取得

  const fetchAttendanceRecords = async () => {
    if (employeeId) {
      try {
        setAttendanceRecords([] as Attendance[]); // ID切り替え時に初期化
        const response = await axios.get(`http://localhost:8080/api/attendance/${employeeId}/${targetMonth}`);
        setAttendanceRecords(response.data);
        console.log('Attendance records:', attendanceRecords);

      } catch (error) {
        console.error('Failed to fetch attendance records:', error);
        
      }
    }
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error('Failed to fetch employees:', error);
      }
    };
    fetchEmployees();
  }, []);

  useEffect(() => {
    fetchAttendanceRecords();
  }, [employeeId, targetMonth]);

  const handleClockIn = async () => {
    if (employeeId) {
      try {
        const response = await axios.post(`http://localhost:8080/api/attendance/${employeeId}/clock-in`);
        console.log('Clocked in:', response.data);

        // 出勤記録を再取得して更新
        await fetchAttendanceRecords();

      } catch (error) {
        console.error('Clock-in failed:', error);
      }

    }
  };

  const handleClockOut = async () => {
    if (employeeId) {
      try {
        const response = await axios.post(`http://localhost:8080/api/attendance/${employeeId}/clock-out`);
        console.log('Clocked out:', response.data);

        // 出勤記録を再取得して更新
        await fetchAttendanceRecords();

      } catch (error) {
        console.error('Clock-out failed:', error);
      }

    }
  };

  const handleEmployeeIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEmployeeId(e.target.value);
  };

  const updateMonth = (offset: number) => {
    const [year, month] = targetMonth.split('-').map(Number); // 年と月を分解
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
    return date.toTimeString().split(' ')[0]; // "HH:MM:SS"形式で取得
  };

  return (
    <div className="mx-3 mt-3">
      <div className="row">
        <div className="col-2">
          <h2>出退勤管理</h2>
        </div>
        <div className="col-2">
          <h3>
            <IconButton aria-label="prev month" name="prevMonth" onClick={handlePrevMonth}><NavigateBeforeIcon /></IconButton>
            {targetMonth}
            <IconButton aria-label="next month" name="nextMonth" onClick={handleNextMonth}><NavigateNextIcon /></IconButton>
          </h3>
        </div>
      </div>
      <div className="align-items-center mt-3">
        <label className="me-2" htmlFor="id">社員ID</label>
        <select className="me-2" name="id" value={employeeId} onChange={handleEmployeeIdChange}>
          <option value="">社員IDを選択</option>
          {employees.map(employee => (
            <option key={employee.id} value={employee.id}>
              {employee.name}
            </option>
          ))}
        </select>
        <Button className="mx-3 btn btn-primary" size="large" onClick={handleClockIn} variant="outlined" startIcon={<PunchClockIcon />}>出社</Button>
        <Button className="btn btn-secondary" size="large" onClick={handleClockOut} variant="outlined" startIcon={<PunchClockIcon />}>退社</Button>
      </div>
      {attendanceRecords.length > 0 && (
        <table className="table table-striped table-hover mt-3">
          <thead>
            <tr>
              <th>日付</th>
              <th>出勤時間</th>
              <th>退勤時間</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.map(record => (
              <tr key={record.id}>
                <td>{record.date}</td>
                <td>{formatTime(record.clockInTime)}</td>
                <td>{formatTime(record.clockOutTime)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AttendanceForm;