import React, { useState } from 'react';
import axios from 'axios';

const AttendanceForm = () => {
  const [employeeId, setEmployeeId] = useState('');

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
      <input type="text" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} placeholder="社員ID" />
      <button onClick={handleClockIn}>出勤</button>
      <button onClick={handleClockOut}>退勤</button>
    </div>
  );
};

export default AttendanceForm;
