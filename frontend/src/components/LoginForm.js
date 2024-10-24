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
const LoginForm = () => {
    const [email, setEmail] = (0, react_1.useState)('');
    const [password, setPassword] = (0, react_1.useState)('');
    const handleLogin = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // const response = await axios.post('/api/auth/login', { email, password });
            const response = yield axios_1.default.post('http://localhost:8080/api/auth/login', { email, password });
            console.log('Logged in:', response.data);
        }
        catch (error) {
            console.error('Login failed:', error);
        }
    });
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mx-3 mt-3" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "\u30ED\u30B0\u30A4\u30F3" }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mb-3" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "form-label", htmlFor: "email" }, { children: "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9:" })), (0, jsx_runtime_1.jsx)("input", { type: "email", className: "form-control", id: "email", autoComplete: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9" })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mb-3" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "form-label", htmlFor: "password" }, { children: "\u30D1\u30B9\u30EF\u30FC\u30C9:" })), (0, jsx_runtime_1.jsx)("input", { type: "password", className: "form-control", id: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "\u30D1\u30B9\u30EF\u30FC\u30C9" })] })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "btn btn-primary mx-3 mt-3", onClick: handleLogin }, { children: "\u30ED\u30B0\u30A4\u30F3" }))] })));
};
exports.default = LoginForm;
