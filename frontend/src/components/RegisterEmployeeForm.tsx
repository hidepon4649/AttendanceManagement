import React, { useState } from 'react';
import axios from 'axios';

const RegisterEmployeeForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState<Errors>({});

  const handleRegister = async () => {
    try {
      // const response = await axios.post('/api/employees/register', {
        const response = await axios.post('http://localhost:8080/api/employees/register', {
        name,
        email,
        password,
        isAdmin
      });
      setSuccessMessage('社員の登録が成功しました！');
      setErrors({});
      // 入力フィールドをクリア
      setName('');
      setEmail('');
      setPassword('');
      setIsAdmin(false);
    } catch (error: any) {
      if (error.response && error.response.data) {
        setErrors({ 
            fieldErrors: error.response.data, // フィールドエラー
            generalError: '社員の登録に失敗しました。' // 一般的なエラーメッセージ
        }); 
      } else {
        setErrors({ 
          generalError: '社員の登録に失敗しました。'  // 一般的なエラーメッセージ
        });
      }
    }
  };

  return (
    <div className="mx-3 mt-3">
      <h2>社員登録</h2>
      {successMessage && <p className="text-success">{successMessage}</p>}
      {errors.generalError && <p className="text-danger">{errors.generalError}</p>}
      <div className="mb-3">
        <label className="form-label" htmlFor="name">名前:</label>
        <input
          type="text"
          className="form-control" 
          id="name"
          autoComplete="username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="名前"
        />
        {errors.fieldErrors && errors.fieldErrors.name && <p className="text-danger">{errors.fieldErrors.name}</p>}

      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="email">メールアドレス:</label>
        <input
          type="email"
          className="form-control" 
          id="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="メールアドレス"
        />
        {errors.fieldErrors && errors.fieldErrors.email && <p className="text-danger">{errors.fieldErrors.email}</p>}

      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="password">パスワード:</label>
        <input
          type="password"
          className="form-control" 
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="パスワード"
        />
        {errors.fieldErrors && errors.fieldErrors.password && <p className="text-danger">{errors.fieldErrors.password}</p>}

      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="isAdmin">管理者権限:</label>
        <input
          type="checkbox"
          id="isAdmin"
           className="form-check-input"
          checked={isAdmin}
          onChange={(e) => setIsAdmin(e.target.checked)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleRegister}>社員を登録</button>
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

export default RegisterEmployeeForm;
