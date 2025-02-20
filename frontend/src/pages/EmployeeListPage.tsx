import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "../css/EmployeeList.css";
import { Employee } from "../models/Employee";
import { Alert } from "react-bootstrap";
import SortIcon from "@mui/icons-material/Sort";

const EmployeeListPage = () => {
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
    fetchList().catch((error) => console.error(error));
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
    } catch (error) {
      console.error("削除に失敗しました", error);
      setAlert({ type: "danger", message: "削除に失敗しました" });
    }
  };

  const [isAscId, setIsAscId] = useState(true);
  const [isAscName, setIsAscName] = useState(true);
  const [isAscEmail, setIsAscEmail] = useState(true);
  const [isAscAdmin, setIsAscAdmin] = useState(true);

  const handleSort = (colname: string, asc: boolean = true) => {
    setList(
      [...list].sort((a: Employee, b: Employee) => {
        const aValue: string | number | boolean = a[colname as keyof Employee];
        const bValue: string | number | boolean = b[colname as keyof Employee];

        if (typeof aValue === "string" && typeof bValue === "string") {
          return aValue.localeCompare(bValue) * (asc ? 1 : -1);
        } else if (typeof aValue === "number" && typeof bValue === "number") {
          return (aValue - bValue) * (asc ? 1 : -1);
        } else if (typeof aValue === "boolean" && typeof bValue === "boolean") {
          return (aValue === bValue ? 0 : aValue ? -1 : 1) * (asc ? 1 : -1);
        }
        return 0;
      })
    );
  };

  const sortById = () => {
    const current = isAscId;
    setIsAscId(!current);
    handleSort("id", !current);
  };
  const sortByName = () => {
    const current = isAscName;
    setIsAscName(!current);
    handleSort("name", !current);
  };
  const sortByEmail = () => {
    const current = isAscEmail;
    setIsAscEmail(!current);
    handleSort("email", !current);
  };
  const sortByAdmin = () => {
    const current = isAscAdmin;
    setIsAscAdmin(!current);
    handleSort("admin", !current);
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
            <th className="col-1" onClick={sortById}>
              <SortIcon className="me-2" />
              id
            </th>
            <th className="col-2" onClick={sortByName}>
              <SortIcon className="me-2" />
              名前
            </th>
            <th className="col-5" onClick={sortByEmail}>
              <SortIcon className="me-2" />
              メールアドレス
            </th>
            <th className="col-1" onClick={sortByAdmin}>
              <SortIcon className="me-2" />
              権限
            </th>
            <th className="col-3">アクション</th>
          </tr>
        </thead>
        <tbody>
          {list.map((employee: Employee) => (
            <tr className="row" key={employee.id}>
              <td className="col-1">{employee.id}</td>
              <td className="col-2">{employee.name}</td>
              <td className="col-5">{employee.email}</td>
              <td className="col-1">{employee.admin ? "管理者" : "一般"}</td>
              <td className="col-3">
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

export default EmployeeListPage;
