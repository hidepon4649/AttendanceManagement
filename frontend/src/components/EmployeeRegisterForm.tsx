import React, { useState } from "react";
import api from "../services/api";
import { Employee } from "../models/Employee";
import { Alert } from "react-bootstrap";

const RegisterEmployeeForm = () => {
  const [employee, setEmployee] = useState({} as Employee);

  const [errors, setErrors] = useState<Errors>({});
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(
    null
  );

  const handleRegister = async () => {
    setErrors({});
    try {
      await api.post("/employees", { ...employee });
      setAlert({ type: "success", message: "登録が成功しました" });
      setEmployee({} as Employee);
    } catch (error: any) {
      if (error.response && error.response.data) {
        setErrors({
          fieldErrors: error.response.data, // フィールドエラー
        });
      }
      setAlert({ type: "danger", message: "登録が失敗しました" });
    }
  };

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = event.target;

    setEmployee((prevValue) => {
      return {
        ...prevValue,
        [name]: type === "checkbox" ? checked : value,
      } as Employee;
    });
  }

  return (
    <div className="mx-3 mt-3">
      <h2>社員登録</h2>
      {alert && (
        <Alert variant={alert.type} onClose={() => setAlert(null)} dismissible>
          {alert.message}
        </Alert>
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
      <button className="btn btn-primary" onClick={handleRegister}>
        社員を登録
      </button>
    </div>
  );
};

interface FieldErrors {
  [key: string]: string;
}

interface Errors {
  fieldErrors?: FieldErrors;
}

export default RegisterEmployeeForm;
