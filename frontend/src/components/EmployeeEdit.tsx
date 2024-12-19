import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useParams } from "react-router-dom";
import { Employee } from "../models/Employee";

const EmployeeEdit = (props: any) => {
  const { id } = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<Employee>(
    new Employee(0, "", "", "", false)
  );

  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    const fetchEmployee = async () => {
      const response = await api.get(`/employees/${id}`);
      setEmployee(response.data);
    };
    fetchEmployee();
  }, [id]);

  const handleEdit = async () => {
    try {
      const response = await api.put(`/employees/${id}`, { ...employee });
      setSuccessMessage("社員の編集が成功しました！");
      setErrors({});
    } catch (error: any) {
      if (error.response && error.response.data) {
        setErrors({
          fieldErrors: error.response.data, // フィールドエラー
          generalError: "社員の編集に失敗しました。", // 一般的なエラーメッセージ
        });
      } else {
        setErrors({
          generalError: "社員の編集に失敗しました。", // 一般的なエラーメッセージ
        });
      }
    }
  };

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = event.target;

    setEmployee((prevValue) => {
      const newValue = {
        ...prevValue,
        [name]: type === "checkbox" ? checked : value,
      } as Employee;

      return newValue;
    });
  }

  return (
    <div className="mx-3 mt-3">
      <h2>社員編集</h2>
      {successMessage && <p className="text-success">{successMessage}</p>}
      {errors.generalError && (
        <p className="text-danger">{errors.generalError}</p>
      )}
      <div className="mb-3 mt-3">
        <label className="form-label" htmlFor="name">
          名前:
        </label>
        <input
          type="text"
          className="form-control"
          name="name"
          autoComplete="username"
          value={employee.name}
          onChange={handleOnChange}
          placeholder="名前"
        />
        {errors.fieldErrors && errors.fieldErrors.name && (
          <p className="text-danger">{errors.fieldErrors.name}</p>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="email">
          メールアドレス:
        </label>
        <input
          type="email"
          className="form-control"
          name="email"
          autoComplete="email"
          value={employee.email}
          onChange={handleOnChange}
          placeholder="メールアドレス"
        />
        {errors.fieldErrors && errors.fieldErrors.email && (
          <p className="text-danger">{errors.fieldErrors.email}</p>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="password">
          パスワード:
        </label>
        <input
          type="password"
          className="form-control"
          name="password"
          value={employee.password}
          onChange={handleOnChange}
          placeholder="パスワード"
        />
        {errors.fieldErrors && errors.fieldErrors.password && (
          <p className="text-danger">{errors.fieldErrors.password}</p>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="admin">
          管理者権限:
        </label>
        <input
          type="checkbox"
          name="admin"
          className="form-check-input"
          checked={employee.admin}
          onChange={handleOnChange}
        />
      </div>
      <button className="btn btn-primary" onClick={handleEdit}>
        更新
      </button>
    </div>
  );
};

interface FieldErrors {
  [key: string]: string;
}

interface Errors {
  fieldErrors?: FieldErrors;
  generalError?: string;
}

export default EmployeeEdit;
