import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
const _jsxFileName = "/Users/hidemac1/attendance-management-app/frontend/src/pages/EmployeeRegisterFormPage.tsx";
import { useState } from "react";
import api from "../services/api";
import { Alert } from "react-bootstrap";
const RegisterEmployeeFormPage = () => {
    const [employee, setEmployee] = useState({});
    const [errors, setErrors] = useState({});
    const [alert, setAlert] = useState(null);
    const handleRegister = async () => {
        setErrors({});
        try {
            await api.post("/employees", { ...employee });
            setAlert({ type: "success", message: "登録が成功しました" });
            setEmployee({});
        }
        catch (error) {
            if (error.response && error.response.data) {
                setErrors({
                    fieldErrors: error.response.data, // フィールドエラー
                });
            }
            setAlert({ type: "danger", message: "登録が失敗しました" });
        }
    };
    function handleOnChange(event) {
        const { name, value, type, checked } = event.target;
        setEmployee((prevValue) => {
            return {
                ...prevValue,
                [name]: type === "checkbox" ? checked : value,
            };
        });
    }
    return (_jsxDEV("div", { className: "mx-3 mt-3", children: [_jsxDEV("h2", { children: "\u793E\u54E1\u767B\u9332" }, void 0, false, { fileName: _jsxFileName, lineNumber: 43, columnNumber: 7 }, this), alert && (_jsxDEV(Alert, { variant: alert.type, onClose: () => setAlert(null), dismissible: true, children: alert.message }, void 0, false, { fileName: _jsxFileName, lineNumber: 44, columnNumber: 18 }, this)), _jsxDEV("div", { className: "mb-3 mt-3", children: [_jsxDEV("label", { className: "form-label", htmlFor: "name", children: "\u540D\u524D:" }, void 0, false, { fileName: _jsxFileName, lineNumber: 51, columnNumber: 9 }, this), _jsxDEV("input", { type: "text", className: "form-control", name: "name", autoComplete: "username", value: employee.name, onChange: handleOnChange, placeholder: "\u540D\u524D" }, void 0, false, { fileName: _jsxFileName, lineNumber: 54, columnNumber: 9 }, this), errors.fieldErrors && errors.fieldErrors.name && (_jsxDEV("p", { className: "text-danger", children: errors.fieldErrors.name }, void 0, false, { fileName: _jsxFileName, lineNumber: 63, columnNumber: 60 }, this))] }, void 0, true, { fileName: _jsxFileName, lineNumber: 50, columnNumber: 7 }, this), _jsxDEV("div", { className: "mb-3", children: [_jsxDEV("label", { className: "form-label", htmlFor: "email", children: "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9:" }, void 0, false, { fileName: _jsxFileName, lineNumber: 68, columnNumber: 9 }, this), _jsxDEV("input", { type: "email", className: "form-control", name: "email", autoComplete: "email", value: employee.email, onChange: handleOnChange, placeholder: "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9" }, void 0, false, { fileName: _jsxFileName, lineNumber: 71, columnNumber: 9 }, this), errors.fieldErrors && errors.fieldErrors.email && (_jsxDEV("p", { className: "text-danger", children: errors.fieldErrors.email }, void 0, false, { fileName: _jsxFileName, lineNumber: 80, columnNumber: 61 }, this))] }, void 0, true, { fileName: _jsxFileName, lineNumber: 67, columnNumber: 7 }, this), _jsxDEV("div", { className: "mb-3", children: [_jsxDEV("label", { className: "form-label", htmlFor: "password", children: "\u30D1\u30B9\u30EF\u30FC\u30C9:" }, void 0, false, { fileName: _jsxFileName, lineNumber: 85, columnNumber: 9 }, this), _jsxDEV("input", { type: "password", className: "form-control", name: "password", value: employee.password, onChange: handleOnChange, placeholder: "\u30D1\u30B9\u30EF\u30FC\u30C9" }, void 0, false, { fileName: _jsxFileName, lineNumber: 88, columnNumber: 9 }, this), errors.fieldErrors && errors.fieldErrors.password && (_jsxDEV("p", { className: "text-danger", children: errors.fieldErrors.password }, void 0, false, { fileName: _jsxFileName, lineNumber: 96, columnNumber: 64 }, this))] }, void 0, true, { fileName: _jsxFileName, lineNumber: 84, columnNumber: 7 }, this), _jsxDEV("div", { className: "mb-3", children: [_jsxDEV("label", { className: "form-label", htmlFor: "admin", children: "\u7BA1\u7406\u8005\u6A29\u9650:" }, void 0, false, { fileName: _jsxFileName, lineNumber: 101, columnNumber: 9 }, this), _jsxDEV("input", { type: "checkbox", name: "admin", className: "form-check-input", checked: employee.admin, onChange: handleOnChange }, void 0, false, { fileName: _jsxFileName, lineNumber: 104, columnNumber: 9 }, this)] }, void 0, true, { fileName: _jsxFileName, lineNumber: 100, columnNumber: 7 }, this), _jsxDEV("button", { className: "btn btn-primary", onClick: handleRegister, children: "\u793E\u54E1\u3092\u767B\u9332" }, void 0, false, { fileName: _jsxFileName, lineNumber: 112, columnNumber: 7 }, this)] }, void 0, true, { fileName: _jsxFileName, lineNumber: 41, columnNumber: 11 }, this));
};
export default RegisterEmployeeFormPage;
