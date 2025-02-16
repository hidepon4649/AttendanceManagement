import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
const _jsxFileName = "/Users/hidemac1/attendance-management-app/frontend/src/pages/LoginPage.tsx";
import { useState } from "react";
import api from "../services/api";
import { lsClear, lsSetCsrfToken, lsSetUser, lsSetJwtToken, } from "src/utils/localStorageUtils";
import useLoginUserContext from "src/hooks/useLoginUserContext";
const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { handleLoginSuccess } = useLoginUserContext();
    const handleSubmit = async (e) => {
        e.preventDefault();
        // ログイン時には一旦 ローカルストレージ をクリアする
        lsClear();
        try {
            await fetchCsrfToken();
            await loginUser();
        }
        catch (error) {
            setError("ログインに失敗しました。ユーザー名とパスワードを確認してください。");
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
    return (_jsxDEV("div", { className: "mx-3 mt-3", children: [_jsxDEV("h2", { children: "\u30ED\u30B0\u30A4\u30F3" }, void 0, false, { fileName: _jsxFileName, lineNumber: 50, columnNumber: 7 }, this), _jsxDEV("form", { onSubmit: handleSubmit, children: [_jsxDEV("div", { className: "mb-3", children: [_jsxDEV("label", { className: "form-label", htmlFor: "email", children: "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9:" }, void 0, false, { fileName: _jsxFileName, lineNumber: 53, columnNumber: 11 }, this), _jsxDEV("input", { type: "email", className: "form-control", id: "email", autoComplete: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9" }, void 0, false, { fileName: _jsxFileName, lineNumber: 56, columnNumber: 11 }, this)] }, void 0, true, { fileName: _jsxFileName, lineNumber: 52, columnNumber: 9 }, this), _jsxDEV("div", { className: "mb-3", children: [_jsxDEV("label", { className: "form-label", htmlFor: "password", children: "\u30D1\u30B9\u30EF\u30FC\u30C9:" }, void 0, false, { fileName: _jsxFileName, lineNumber: 67, columnNumber: 11 }, this), _jsxDEV("input", { type: "password", className: "form-control", id: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "\u30D1\u30B9\u30EF\u30FC\u30C9" }, void 0, false, { fileName: _jsxFileName, lineNumber: 70, columnNumber: 11 }, this)] }, void 0, true, { fileName: _jsxFileName, lineNumber: 66, columnNumber: 9 }, this), error && _jsxDEV("p", { className: "text-danger", children: error }, void 0, false, { fileName: _jsxFileName, lineNumber: 79, columnNumber: 18 }, this), _jsxDEV("button", { type: "submit", className: "btn btn-primary mx-3 mt-3", children: "\u30ED\u30B0\u30A4\u30F3" }, void 0, false, { fileName: _jsxFileName, lineNumber: 80, columnNumber: 9 }, this)] }, void 0, true, { fileName: _jsxFileName, lineNumber: 51, columnNumber: 7 }, this)] }, void 0, true, { fileName: _jsxFileName, lineNumber: 48, columnNumber: 11 }, this));
};
export default LoginPage;
