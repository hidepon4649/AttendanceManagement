import React, { useState } from "react";
import api from "../services/api";

interface LoginPageProps {
  onLoginSuccess: (roles: string[]) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ログイン時には一旦 localStorage をクリアする
    localStorage.clear();

    try {
      const responseCsrf = await api.get("/csrf/token");
      console.log("CSRF token:", responseCsrf.data.token);
      localStorage.setItem("CSRF-TOKEN", responseCsrf.data.token);
      const response = await api.post("/auth/login", { email, password });

      setError("");
      console.log("Logged in:", response.data);
      localStorage.setItem("USER-NAME", response.data.username);
      localStorage.setItem("USER-ROLES", response.data.roles);
      localStorage.setItem("JWT-TOKEN", response.data.token);

      // ログイン状態の更新
      onLoginSuccess(response.data.roles);
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
