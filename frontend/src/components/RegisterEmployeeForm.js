import React, { useState } from 'react';
import axios from 'axios';

const RegisterEmployeeForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
      setErrorMessage('');
      // 入力フィールドをクリア
      setName('');
      setEmail('');
      setPassword('');
      setIsAdmin(false);
    } catch (error) {
      setErrorMessage('社員の登録に失敗しました。');
      setSuccessMessage('');
      console.error('Employee registration failed:', error);
    }
  };

  return (
    <div>
      <h2>社員登録</h2>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <div className="form-group">
        <label htmlFor="name">名前:</label>
        <input
          type="text"
          className="form-control" 
          id="name"
          autoComplete="username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="名前"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">メールアドレス:</label>
        <input
          type="email"
          className="form-control" 
          id="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="メールアドレス"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">パスワード:</label>
        <input
          type="password"
          className="form-control" 
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="パスワード"
        />
      </div>
      <div className="form-group">
        <label htmlFor="isAdmin">管理者権限:</label>
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

export default RegisterEmployeeForm;
