import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "../css/EmployeeList.css";
import { Employee } from "../models/Employee";

const EmployeeList = () => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  const fetchList = async () => {
    const response = await api.get("/employees");
    setList(response.data);
  };

  useEffect(() => {
    fetchList();
  }, []); // 空の配列を第2引数に渡すことで、初回レンダリング時のみ実行される

  const handleClick = (id: number) => {
    console.log(id);
    navigate(`/employees/edit/${id}`);
  };

  return (
    <div className="mx-3 mt-3">
      <h2>社員一覧</h2>
      <table className="table table-hover table-striped mt-3">
        <thead>
          <tr className="row">
            <th className="col">名前</th>
            <th className="col">メールアドレス</th>
            <th className="col">権限</th>
          </tr>
        </thead>
        <tbody>
          {/* {list.map((employee: { id: number; name: string; email: string; isAdmin: boolean }) => ( */}
          {list.map((employee: Employee) => (
            <tr className="row" key={employee.id}>
              <td className="col" onClick={() => handleClick(employee.id)}>
                {employee.name}
              </td>
              <td className="col">{employee.email}</td>
              <td className="col">{employee.admin ? "管理者" : "一般"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
