"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const axios_1 = __importDefault(require("axios"));
const RegisterEmployeeForm = () => {
    const [name, setName] = (0, react_1.useState)('');
    const [email, setEmail] = (0, react_1.useState)('');
    const [password, setPassword] = (0, react_1.useState)('');
    const [isAdmin, setIsAdmin] = (0, react_1.useState)(false);
    const [successMessage, setSuccessMessage] = (0, react_1.useState)('');
    const [errors, setErrors] = (0, react_1.useState)({});
    const handleRegister = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // const response = await axios.post('/api/employees/register', {
            const response = yield axios_1.default.post('http://localhost:8080/api/employees/register', {
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
        }
        catch (error) {
            if (error.response && error.response.data) {
                setErrors({
                    fieldErrors: error.response.data,
                    generalError: '社員の登録に失敗しました。' // 一般的なエラーメッセージ
                });
            }
            else {
                setErrors({
                    generalError: '社員の登録に失敗しました。' // 一般的なエラーメッセージ
                });
            }
        }
    });
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mx-3 mt-3" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "\u793E\u54E1\u767B\u9332" }), successMessage && (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "text-success" }, { children: successMessage })), errors.generalError && (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "text-danger" }, { children: errors.generalError })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mb-3" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "form-label", htmlFor: "name" }, { children: "\u540D\u524D:" })), (0, jsx_runtime_1.jsx)("input", { type: "text", className: "form-control", id: "name", autoComplete: "username", value: name, onChange: (e) => setName(e.target.value), placeholder: "\u540D\u524D" }), errors.fieldErrors && errors.fieldErrors.name && (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "text-danger" }, { children: errors.fieldErrors.name }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mb-3" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "form-label", htmlFor: "email" }, { children: "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9:" })), (0, jsx_runtime_1.jsx)("input", { type: "email", className: "form-control", id: "email", autoComplete: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9" }), errors.fieldErrors && errors.fieldErrors.email && (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "text-danger" }, { children: errors.fieldErrors.email }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mb-3" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "form-label", htmlFor: "password" }, { children: "\u30D1\u30B9\u30EF\u30FC\u30C9:" })), (0, jsx_runtime_1.jsx)("input", { type: "password", className: "form-control", id: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "\u30D1\u30B9\u30EF\u30FC\u30C9" }), errors.fieldErrors && errors.fieldErrors.password && (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "text-danger" }, { children: errors.fieldErrors.password }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mb-3" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "form-label", htmlFor: "isAdmin" }, { children: "\u7BA1\u7406\u8005\u6A29\u9650:" })), (0, jsx_runtime_1.jsx)("input", { type: "checkbox", id: "isAdmin", className: "form-check-input", checked: isAdmin, onChange: (e) => setIsAdmin(e.target.checked) })] })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "btn btn-primary", onClick: handleRegister }, { children: "\u793E\u54E1\u3092\u767B\u9332" }))] })));
};
exports.default = RegisterEmployeeForm;
