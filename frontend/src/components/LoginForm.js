import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // const response = await axios.post('/api/auth/login', { email, password });
      const response = await axios.post('http://localhost:8080/api/auth/login', { email, password });
      console.log('Logged in:', response.data);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="mt-3">
      <h2>ログイン</h2>
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
        <button className="btn btn-primary" onClick={handleLogin}>ログイン</button>
    </div>
  );
};

export default LoginForm;
