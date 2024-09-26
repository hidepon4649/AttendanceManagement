import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      console.log('Logged in:', response.data);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <h2>ログイン</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="メールアドレス" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="パスワード" />
      <button onClick={handleLogin}>ログイン</button>
    </div>
  );
};

export default LoginForm;
