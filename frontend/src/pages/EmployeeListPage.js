import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
const _jsxFileName = "/Users/hidemac1/attendance-management-app/frontend/src/pages/EmployeeListPage.tsx";
import { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "../css/EmployeeList.css";
import { Alert } from "react-bootstrap";
const EmployeeListPage = () => {
    const [list, setList] = useState([]);
    const [alert, setAlert] = useState(null);
    const navigate = useNavigate();
    const fetchList = async () => {
        const response = await api.get("/employees");
        setList(response.data);
    };
    useEffect(() => {
        fetchList().catch((error) => console.error(error));
    }, []); // 空の配列を第2引数に渡すことで、初回レンダリング時のみ実行される
    const handleEdit = (id) => {
        console.log(id);
        navigate(`/employees/edit/${id}`);
    };
    const handleDelete = async (id) => {
        try {
            await api.delete(`/employees/${id}`);
            setList(list.filter((employee) => employee.id !== id));
            setAlert({ type: "success", message: "削除が成功しました" });
        }
        catch (error) {
            console.error("削除に失敗しました", error);
            setAlert({ type: "danger", message: "削除に失敗しました" });
        }
    };
    return (_jsxDEV("div", { className: "mx-3 mt-3", children: [_jsxDEV("h2", { children: "\u793E\u54E1\u4E00\u89A7" }, void 0, false, { fileName: _jsxFileName, lineNumber: 41, columnNumber: 7 }, this), alert && (_jsxDEV(Alert, { variant: alert.type, onClose: () => setAlert(null), dismissible: true, children: alert.message }, void 0, false, { fileName: _jsxFileName, lineNumber: 42, columnNumber: 18 }, this)), _jsxDEV("table", { className: "table table-hover table-striped mt-3", children: [_jsxDEV("thead", { children: _jsxDEV("tr", { className: "row", children: [_jsxDEV("th", { className: "col", children: "\u540D\u524D" }, void 0, false, { fileName: _jsxFileName, lineNumber: 51, columnNumber: 13 }, this), _jsxDEV("th", { className: "col", children: "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9" }, void 0, false, { fileName: _jsxFileName, lineNumber: 52, columnNumber: 13 }, this), _jsxDEV("th", { className: "col", children: "\u6A29\u9650" }, void 0, false, { fileName: _jsxFileName, lineNumber: 53, columnNumber: 13 }, this), _jsxDEV("th", { className: "col", children: "\u30A2\u30AF\u30B7\u30E7\u30F3" }, void 0, false, { fileName: _jsxFileName, lineNumber: 54, columnNumber: 13 }, this)] }, void 0, true, { fileName: _jsxFileName, lineNumber: 50, columnNumber: 11 }, this) }, void 0, false, { fileName: _jsxFileName, lineNumber: 49, columnNumber: 9 }, this), _jsxDEV("tbody", { children: list.map((employee) => (_jsxDEV("tr", { className: "row", children: [_jsxDEV("td", { className: "col", children: employee.name }, void 0, false, { fileName: _jsxFileName, lineNumber: 60, columnNumber: 15 }, this), _jsxDEV("td", { className: "col", children: employee.email }, void 0, false, { fileName: _jsxFileName, lineNumber: 61, columnNumber: 15 }, this), _jsxDEV("td", { className: "col", children: employee.admin ? "管理者" : "一般" }, void 0, false, { fileName: _jsxFileName, lineNumber: 62, columnNumber: 15 }, this), _jsxDEV("td", { className: "col", children: [_jsxDEV("button", { className: "btn btn-primary", onClick: () => handleEdit(employee.id), children: "\u7DE8\u96C6" }, void 0, false, { fileName: _jsxFileName, lineNumber: 64, columnNumber: 17 }, this), _jsxDEV("button", { className: "btn btn-danger mx-3", onClick: () => handleDelete(employee.id), children: "\u524A\u9664" }, void 0, false, { fileName: _jsxFileName, lineNumber: 70, columnNumber: 17 }, this)] }, void 0, true, { fileName: _jsxFileName, lineNumber: 63, columnNumber: 15 }, this)] }, employee.id, true, { fileName: _jsxFileName, lineNumber: 58, columnNumber: 46 }, this))) }, void 0, false, { fileName: _jsxFileName, lineNumber: 57, columnNumber: 9 }, this)] }, void 0, true, { fileName: _jsxFileName, lineNumber: 48, columnNumber: 7 }, this)] }, void 0, true, { fileName: _jsxFileName, lineNumber: 39, columnNumber: 11 }, this));
};
export default EmployeeListPage;
