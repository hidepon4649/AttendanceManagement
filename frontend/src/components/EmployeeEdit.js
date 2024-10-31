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
const react_router_dom_1 = require("react-router-dom");
const EmployeeEdit = (props) => {
    const { id } = (0, react_router_dom_1.useParams)();
    const [employee, setEmployee] = (0, react_1.useState)({});
    const [successMessage, setSuccessMessage] = (0, react_1.useState)('');
    const [errors, setErrors] = (0, react_1.useState)({});
    (0, react_1.useEffect)(() => {
        const fetchEmployee = () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield axios_1.default.get(`http://localhost:8080/api/employees/${id}`);
            setEmployee(response.data);
        });
        fetchEmployee();
    }, [id]);
    const handleEdit = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.post(`http://localhost:8080/api/employees/edit/${id}`, Object.assign({}, employee));
            setSuccessMessage('社員の編集が成功しました！');
            setErrors({});
            // setEmployee({} as Employee);
        }
        catch (error) {
            if (error.response && error.response.data) {
                setErrors({
                    fieldErrors: error.response.data,
                    generalError: '社員の編集に失敗しました。' // 一般的なエラーメッセージ
                });
            }
            else {
                setErrors({
                    generalError: '社員の編集に失敗しました。' // 一般的なエラーメッセージ
                });
            }
        }
    });
    function handleOnChange(event) {
        const { name, value, type, checked } = event.target;
        setEmployee((prevValue) => {
            return Object.assign(Object.assign({}, prevValue), { [name]: type === 'checkbox' ? checked : value });
        });
    }
    ;
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mx-3 mt-3" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "\u793E\u54E1\u7DE8\u96C6" }), successMessage && (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "text-success" }, { children: successMessage })), errors.generalError && (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "text-danger" }, { children: errors.generalError })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mb-3" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "form-label", htmlFor: "name" }, { children: "\u540D\u524D:" })), (0, jsx_runtime_1.jsx)("input", { type: "text", className: "form-control", name: "name", autoComplete: "username", value: employee.name, onChange: handleOnChange, placeholder: "\u540D\u524D" }), errors.fieldErrors && errors.fieldErrors.name && (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "text-danger" }, { children: errors.fieldErrors.name }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mb-3" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "form-label", htmlFor: "email" }, { children: "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9:" })), (0, jsx_runtime_1.jsx)("input", { type: "email", className: "form-control", name: "email", autoComplete: "email", value: employee.email, onChange: handleOnChange, placeholder: "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9" }), errors.fieldErrors && errors.fieldErrors.email && (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "text-danger" }, { children: errors.fieldErrors.email }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mb-3" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "form-label", htmlFor: "password" }, { children: "\u30D1\u30B9\u30EF\u30FC\u30C9:" })), (0, jsx_runtime_1.jsx)("input", { type: "password", className: "form-control", name: "password", value: employee.password, onChange: handleOnChange, placeholder: "\u30D1\u30B9\u30EF\u30FC\u30C9" }), errors.fieldErrors && errors.fieldErrors.password && (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "text-danger" }, { children: errors.fieldErrors.password }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mb-3" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "form-label", htmlFor: "isAdmin" }, { children: "\u7BA1\u7406\u8005\u6A29\u9650:" })), (0, jsx_runtime_1.jsx)("input", { type: "checkbox", name: "isAdmin", className: "form-check-input", checked: employee.isAdmin, onChange: handleOnChange })] })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "btn btn-primary", onClick: handleEdit }, { children: "\u66F4\u65B0" }))] })));
};
exports.default = EmployeeEdit;
