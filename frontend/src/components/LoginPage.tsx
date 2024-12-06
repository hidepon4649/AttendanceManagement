import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        { email, password }
      );
      setError("");
      console.log("Logged in:", response.data);
      localStorage.setItem("token", response.data.token);
      navigate("/attendance");
    } catch (error) {
      console.error("Login failed:", error);
      setError(
        "ログインに失敗しました。ユーザー名とパスワードを確認してください。"
      );
    }
  };

  return (
    <div className="mx-3 mt-3">
      <h2>ログイン</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="email">
            メールアドレス:
          </label>
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
        <div className="mb-3">
          <label className="form-label" htmlFor="password">
            パスワード:
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="パスワード"
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary mx-3 mt-3">
          ログイン
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
