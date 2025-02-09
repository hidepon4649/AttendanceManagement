import React, { useContext, useState } from "react";
import api from "../services/api";
import LoginUserContext from "src/context/LoginUserContext";
import {
  lsClear,
  lsSetCsrfToken,
  lsSetUser,
  lsSetJwtToken,
} from "src/utils/localStorageUtils";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const {
    handleLoginSuccess,
  } = useContext(LoginUserContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ログイン時には一旦 ローカルストレージ をクリアする
    lsClear();

    try {
      await fetchCsrfToken();
      await loginUser();
    } catch (error) {
      setError(
        "ログインに失敗しました。ユーザー名とパスワードを確認してください。"
      );
    }
  };
  const fetchCsrfToken = async () => {
    const responseCsrf = await api.get("/csrf/token");
    lsSetCsrfToken(responseCsrf.data.token);
  };

  const loginUser = async () => {
    const response = await api.post("/auth/login", { email, password });
    setError("");
    lsSetUser(response.data);
    lsSetJwtToken(response.data.token);

    // ログイン状態の更新
    handleLoginSuccess(response.data.roles);
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
