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
      const response = await axios.post('/api/employees/register', {
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
      <div>
        <label>名前:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="名前"
        />
      </div>
      <div>
        <label>メールアドレス:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="メールアドレス"
        />
      </div>
      <div>
        <label>パスワード:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="パスワード"
        />
      </div>
      <div>
        <label>管理者権限:</label>
        <input
          type="checkbox"
          checked={isAdmin}
          onChange={(e) => setIsAdmin(e.target.checked)}
        />
      </div>
      <button onClick={handleRegister}>社員を登録</button>
    </div>
  );
};

export default RegisterEmployeeForm;
