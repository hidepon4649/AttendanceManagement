import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { AccessLog } from 'src/models/AccessLog';
import '../css/AccessLog.css';
import SortIcon from '@mui/icons-material/Sort';

const AccessLogPage = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
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
      {/* <td className="col-1">{log.id}</td> */}
      <td className="col-1">{log.username?.split('@')[0]}</td>
      <td className="col-2">{log.className?.split('.').pop()}</td>
      <td className="col-2">{log.methodName}</td>
      <td className="col-5">{log.methodParams}</td>
      {/* <td className="col">{log.userRoles}</td> */}
      {/* <td className="col">{log.accessDate}</td> */}
      <td className="col-2">{log.accessTime}</td>
    </tr>
  ));

  return (
    <table className="table table-striped table-hover mt-3">
      <tbody>{logList}</tbody>
    </table>
  );
};
export default AccessLogPage;
