import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Employee } from '../models/Employee';
import { Attendance } from '../models/Attendance';

const AttendanceForm = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [employees, setEmployees] = useState([] as Employee[]);
  const [attendanceRecords, setAttendanceRecords] = useState([] as Attendance[]);

  const fetchAttendanceRecords = async () => {
    if (employeeId) {
      try {
        const date = new Date().toISOString().slice(0, 7); // YYYY-MM形式で年月を取得
        const response = await axios.get(`http://localhost:8080/api/attendance/${employeeId}/${date}`);
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
  }, [employeeId]);

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

  const formatTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toTimeString().split(' ')[0]; // "HH:MM:SS"形式で取得
  };

  return (
    <div className="mx-3 mt-3">
      <h2>出退勤管理</h2>
      <div className="align-items-center">
        <label className="me-2" htmlFor="id">社員ID</label>
        <select className="me-2" name="id" value={employeeId} onChange={handleEmployeeIdChange}>
          <option value="">社員IDを選択</option>
          {employees.map(employee => (
            <option key={employee.id} value={employee.id}>
              {employee.name}
            </option>
          ))}
        </select>
        <button className="me-2 btn btn-primary" onClick={handleClockIn}>出勤</button>
        <button className="btn btn-secondary" onClick={handleClockOut}>退勤</button>
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