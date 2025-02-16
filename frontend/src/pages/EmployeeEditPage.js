import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
const _jsxFileName = "/Users/hidemac1/attendance-management-app/frontend/src/pages/EmployeeEditPage.tsx";
import { useEffect, useState } from "react";
import api from "../services/api";
import { useParams } from "react-router-dom";
import { Employee } from "../models/Employee";
import { Alert } from "react-bootstrap";
const EmployeeEditPage = (props) => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(new Employee(0, "", "", "", false));
    const [errors, setErrors] = useState({});
    const [alert, setAlert] = useState(null);
    useEffect(() => {
        const fetchEmployee = async () => {
            const response = await api.get(`/employees/${id}`);
            setEmployee(response.data);
        };
        fetchEmployee().catch((error) => console.error(error));
    }, [id]);
    const handleEdit = async () => {
        setErrors({});
        try {
            await api.put(`/employees/${id}`, { ...employee });
            setAlert({ type: "success", message: "編集が成功しました" });
        }
        catch (error) {
            if (error.response && error.response.data) {
                setErrors({
                    fieldErrors: error.response.data, // フィールドエラー
                });
            }
            setAlert({ type: "danger", message: "編集が失敗しました" });
        }
    };
    function handleOnChange(event) {
        const { name, value, type, checked } = event.target;
        setEmployee((prevValue) => {
            const newValue = {
                ...prevValue,
                [name]: type === "checkbox" ? checked : value,
            };
            return newValue;
        });
    }
    return (_jsxDEV("div", { className: "mx-3 mt-3", children: [_jsxDEV("h2", { children: "\u793E\u54E1\u7DE8\u96C6" }, void 0, false, { fileName: _jsxFileName, lineNumber: 56, columnNumber: 7 }, this), alert && (_jsxDEV(Alert, { variant: alert.type, onClose: () => setAlert(null), dismissible: true, children: alert.message }, void 0, false, { fileName: _jsxFileName, lineNumber: 57, columnNumber: 18 }, this)), _jsxDEV("div", { className: "mb-3 mt-3", children: [_jsxDEV("label", { className: "form-label", htmlFor: "name", children: "\u540D\u524D:" }, void 0, false, { fileName: _jsxFileName, lineNumber: 64, columnNumber: 9 }, this), _jsxDEV("input", { type: "text", className: "form-control", name: "name", autoComplete: "username", value: employee.name, onChange: handleOnChange, placeholder: "\u540D\u524D" }, void 0, false, { fileName: _jsxFileName, lineNumber: 67, columnNumber: 9 }, this), errors.fieldErrors && errors.fieldErrors.name && (_jsxDEV("p", { className: "text-danger", children: errors.fieldErrors.name }, void 0, false, { fileName: _jsxFileName, lineNumber: 76, columnNumber: 60 }, this))] }, void 0, true, { fileName: _jsxFileName, lineNumber: 63, columnNumber: 7 }, this), _jsxDEV("div", { className: "mb-3", children: [_jsxDEV("label", { className: "form-label", htmlFor: "email", children: "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9:" }, void 0, false, { fileName: _jsxFileName, lineNumber: 81, columnNumber: 9 }, this), _jsxDEV("input", { type: "email", className: "form-control", name: "email", autoComplete: "email", value: employee.email, onChange: handleOnChange, placeholder: "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9" }, void 0, false, { fileName: _jsxFileName, lineNumber: 84, columnNumber: 9 }, this), errors.fieldErrors && errors.fieldErrors.email && (_jsxDEV("p", { className: "text-danger", children: errors.fieldErrors.email }, void 0, false, { fileName: _jsxFileName, lineNumber: 93, columnNumber: 61 }, this))] }, void 0, true, { fileName: _jsxFileName, lineNumber: 80, columnNumber: 7 }, this), _jsxDEV("div", { className: "mb-3", children: [_jsxDEV("label", { className: "form-label", htmlFor: "password", children: "\u30D1\u30B9\u30EF\u30FC\u30C9:" }, void 0, false, { fileName: _jsxFileName, lineNumber: 98, columnNumber: 9 }, this), _jsxDEV("input", { type: "password", className: "form-control", name: "password", value: employee.password, onChange: handleOnChange, placeholder: "\u30D1\u30B9\u30EF\u30FC\u30C9" }, void 0, false, { fileName: _jsxFileName, lineNumber: 101, columnNumber: 9 }, this), errors.fieldErrors && errors.fieldErrors.password && (_jsxDEV("p", { className: "text-danger", children: errors.fieldErrors.password }, void 0, false, { fileName: _jsxFileName, lineNumber: 109, columnNumber: 64 }, this))] }, void 0, true, { fileName: _jsxFileName, lineNumber: 97, columnNumber: 7 }, this), _jsxDEV("div", { className: "mb-3", children: [_jsxDEV("label", { className: "form-label", htmlFor: "admin", children: "\u7BA1\u7406\u8005\u6A29\u9650:" }, void 0, false, { fileName: _jsxFileName, lineNumber: 114, columnNumber: 9 }, this), _jsxDEV("input", { type: "checkbox", name: "admin", className: "form-check-input", checked: employee.admin, onChange: handleOnChange }, void 0, false, { fileName: _jsxFileName, lineNumber: 117, columnNumber: 9 }, this)] }, void 0, true, { fileName: _jsxFileName, lineNumber: 113, columnNumber: 7 }, this), _jsxDEV("button", { className: "btn btn-primary", onClick: handleEdit, children: "\u66F4\u65B0" }, void 0, false, { fileName: _jsxFileName, lineNumber: 125, columnNumber: 7 }, this)] }, void 0, true, { fileName: _jsxFileName, lineNumber: 54, columnNumber: 11 }, this));
};
export default EmployeeEditPage;
