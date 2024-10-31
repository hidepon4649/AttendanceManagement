import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Employee } from '../models/Employee';

const AttendanceForm = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [employees, setEmployees] = useState([] as Employee[]);

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

  const handleClockIn = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/attendance/clock-in', { employeeId });
      console.log('Clocked in:', response.data);
    } catch (error) {
      console.error('Clock-in failed:', error);
    }
  };

  const handleClockOut = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/attendance/clock-out', { employeeId });
      console.log('Clocked out:', response.data);
    } catch (error) {
      console.error('Clock-out failed:', error);
    }
  };

  return (
    <div className="mx-3 mt-3">
      <h2>出退勤管理</h2>
      <div className="align-items-center">
        <label className="me-2" htmlFor="id">社員ID</label>
        <select className="me-2" name="id" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)}>
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
    </div>
  );
};

export default AttendanceForm;