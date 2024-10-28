import React, { useState,useEffect } from 'react';
import axios from 'axios';
import '../css/EmployeeList.css';

const EmployeeList = () => {

  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get('http://localhost:8080/api/employees');
    setList(response.data);
  };

  useEffect(() => {
    fetchList();
  }, []); // 空の配列を第2引数に渡すことで、初回レンダリング時のみ実行される

  return (
    <div className="mx-3 mt-3">
      <h2>社員一覧</h2>
      <table className="table table-hover table-striped">
        <thead>
          <tr className="row">
            <th className="col">名前</th>
            <th className="col">メールアドレス</th>
            <th className="col">権限</th>
          </tr>
        </thead>
        <tbody>
        {list.map((employee: { id: number; name: string; email: string; isAdmin: boolean }) => (
          <tr className="row" key={employee.id}>
            <td className="col">
              {employee.name}
            </td>
            <td className="col">
              {employee.email}
            </td>
            <td className="col">
              {employee.isAdmin ? '管理者' : '一般'}
              </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );

};


export default EmployeeList;
