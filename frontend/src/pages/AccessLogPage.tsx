import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { AccessLog } from 'src/models/AccessLog';
import '../css/AccessLog.css';
import { formatDateTime } from '../utils/formatTimeUtils';
import SortIcon from '@mui/icons-material/Sort';
import { getFormattedToday } from 'src/utils/dateTimeUtils';

const AccessLogPage = () => {
  const [date, setDate] = useState(getFormattedToday());
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await api.get(`/accesslogs/${date}`);
    setList(response.data);
  };

  useEffect(() => {
    fetchList().catch((error) => console.error(error));
  }, [date]);

  const logList = list.map((log: AccessLog) => (
    <tr key={log.id} className="row p-0 m-0">
      <td className="col-1">{formatDateTime(log.accessTime, 'yyyyMMdd')}</td>
      <td className="col-1">{formatDateTime(log.accessTime, 'hh:mm:ss')}</td>
      <td className="col-1">{log.username?.split('@')[0]}</td>
      <td className="col-2">{log.className?.split('.').pop()}</td>
      <td className="col-3">{log.methodName}</td>
      <td className="col-4">{log.methodParams}</td>
    </tr>
  ));

  return (
    <table className="table table-striped table-hover mt-3">
      <tbody>{logList}</tbody>
    </table>
  );
};
export default AccessLogPage;
