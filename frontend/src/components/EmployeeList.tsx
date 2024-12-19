import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "../css/EmployeeList.css";
import { Employee } from "../models/Employee";
import axios from "axios";
import { Alert } from "react-bootstrap";

const EmployeeList = () => {
  const [list, setList] = useState([]);
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(
    null
  );
  const navigate = useNavigate();

  const fetchList = async () => {
    const response = await api.get("/employees");
    setList(response.data);
  };

  useEffect(() => {
    fetchList();
  }, []); // 空の配列を第2引数に渡すことで、初回レンダリング時のみ実行される

  const handleEdit = (id: number) => {
    console.log(id);
    navigate(`/employees/edit/${id}`);
  };
  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/employees/${id}`);
      setList(list.filter((employee: Employee) => employee.id !== id));
      setAlert({ type: "success", message: "削除が成功しました" });
      // ここでリストを更新するためのコードを追加することができます
    } catch (error) {
      console.error("削除に失敗しました", error);
      setAlert({ type: "danger", message: "削除に失敗しました" });
    }
  };

  return (
    <div className="mx-3 mt-3">
      <h2>社員一覧</h2>
      {alert && (
        <Alert variant={alert.type} onClose={() => setAlert(null)} dismissible>
          {alert.message}
        </Alert>
      )}

      <table className="table table-hover table-striped mt-3">
        <thead>
          <tr className="row">
            <th className="col">名前</th>
            <th className="col">メールアドレス</th>
            <th className="col">権限</th>
            <th className="col">アクション</th>
          </tr>
        </thead>
        <tbody>
          {/* {list.map((employee: { id: number; name: string; email: string; isAdmin: boolean }) => ( */}
          {list.map((employee: Employee) => (
            <tr className="row" key={employee.id}>
              <td className="col">{employee.name}</td>
              <td className="col">{employee.email}</td>
              <td className="col">{employee.admin ? "管理者" : "一般"}</td>
              <td className="col">
                <button
                  className="btn btn-primary"
                  onClick={() => handleEdit(employee.id)}
                >
                  編集
                </button>
                <button
                  className="btn btn-danger mx-3"
                  onClick={() => handleDelete(employee.id)}
                >
                  削除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
