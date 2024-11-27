import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MonthlyReport = () => {
  const [report, setReport] = useState([]);
  const [month, setMonth] = useState('');

  useEffect(() => {
    const fetchReport = async () => {
      if (month) {
        const response = await axios.get(`http://localhost:8080/api/attendance/report/${month}`);
        setReport(response.data);
      }
    };

    fetchReport();
  }, [month]);

  return (
    <div className="mx-3 mt-3">
      <h2>月末帳票出力</h2>
      <div className="mt-3">
        <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} />
        <ul>
          {report.map((attendance: {
            id: number;
            employee: { name: string };
            clockInTime: string;
            clockOutTime: string;
          }) => (

            <li key={attendance.id}>
              {attendance.employee.name}: 出勤 {attendance.clockInTime}, 退勤 {attendance.clockOutTime}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MonthlyReport;
