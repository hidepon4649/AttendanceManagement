import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
const _jsxFileName = "/Users/hidemac1/attendance-management-app/frontend/src/pages/EmployeeListPage.tsx";
import { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "../css/EmployeeList.css";
import { Alert } from "react-bootstrap";
import SortIcon from "@mui/icons-material/Sort";
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
    const [isAscId, setIsAscId] = useState(true);
    const [isAscName, setIsAscName] = useState(true);
    const [isAscEmail, setIsAscEmail] = useState(true);
    const [isAscAdmin, setIsAscAdmin] = useState(true);
    const handleSort = (colname, asc = true) => {
        setList([...list].sort((a, b) => {
            const aValue = a[colname];
            const bValue = b[colname];
            if (typeof aValue === "string" && typeof bValue === "string") {
                return aValue.localeCompare(bValue) * (asc ? 1 : -1);
            }
            else if (typeof aValue === "number" && typeof bValue === "number") {
                return (aValue - bValue) * (asc ? 1 : -1);
            }
            else if (typeof aValue === "boolean" && typeof bValue === "boolean") {
                return (aValue === bValue ? 0 : aValue ? -1 : 1) * (asc ? 1 : -1);
            }
            return 0;
        }));
    };
    const sortById = () => {
        const current = isAscId;
        setIsAscId(!current);
        handleSort("id", !current);
    };
    const sortByName = () => {
        const current = isAscName;
        setIsAscName(!current);
        handleSort("name", !current);
    };
    const sortByEmail = () => {
        const current = isAscEmail;
        setIsAscEmail(!current);
        handleSort("email", !current);
    };
    const sortByAdmin = () => {
        const current = isAscAdmin;
        setIsAscAdmin(!current);
        handleSort("admin", !current);
    };
    return (_jsxDEV("div", { className: "mx-3 mt-3", children: [_jsxDEV("h2", { children: "\u793E\u54E1\u4E00\u89A7" }, void 0, false, { fileName: _jsxFileName, lineNumber: 86, columnNumber: 7 }, this), alert && (_jsxDEV(Alert, { variant: alert.type, onClose: () => setAlert(null), dismissible: true, children: alert.message }, void 0, false, { fileName: _jsxFileName, lineNumber: 87, columnNumber: 18 }, this)), _jsxDEV("table", { className: "table table-hover table-striped mt-3", children: [_jsxDEV("thead", { children: _jsxDEV("tr", { className: "row", children: [_jsxDEV("th", { className: "col-1", onClick: sortById, children: [_jsxDEV(SortIcon, { className: "me-2" }, void 0, false, { fileName: _jsxFileName, lineNumber: 97, columnNumber: 15 }, this), "id"] }, void 0, true, { fileName: _jsxFileName, lineNumber: 96, columnNumber: 13 }, this), _jsxDEV("th", { className: "col-2", onClick: sortByName, children: [_jsxDEV(SortIcon, { className: "me-2" }, void 0, false, { fileName: _jsxFileName, lineNumber: 101, columnNumber: 15 }, this), "\u540D\u524D"] }, void 0, true, { fileName: _jsxFileName, lineNumber: 100, columnNumber: 13 }, this), _jsxDEV("th", { className: "col-5", onClick: sortByEmail, children: [_jsxDEV(SortIcon, { className: "me-2" }, void 0, false, { fileName: _jsxFileName, lineNumber: 105, columnNumber: 15 }, this), "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9"] }, void 0, true, { fileName: _jsxFileName, lineNumber: 104, columnNumber: 13 }, this), _jsxDEV("th", { className: "col-1", onClick: sortByAdmin, children: [_jsxDEV(SortIcon, { className: "me-2" }, void 0, false, { fileName: _jsxFileName, lineNumber: 109, columnNumber: 15 }, this), "\u6A29\u9650"] }, void 0, true, { fileName: _jsxFileName, lineNumber: 108, columnNumber: 13 }, this), _jsxDEV("th", { className: "col-3", children: "\u30A2\u30AF\u30B7\u30E7\u30F3" }, void 0, false, { fileName: _jsxFileName, lineNumber: 112, columnNumber: 13 }, this)] }, void 0, true, { fileName: _jsxFileName, lineNumber: 95, columnNumber: 11 }, this) }, void 0, false, { fileName: _jsxFileName, lineNumber: 94, columnNumber: 9 }, this), _jsxDEV("tbody", { children: list.map((employee) => (_jsxDEV("tr", { className: "row", children: [_jsxDEV("td", { className: "col-1", children: employee.id }, void 0, false, { fileName: _jsxFileName, lineNumber: 118, columnNumber: 15 }, this), _jsxDEV("td", { className: "col-2", children: employee.name }, void 0, false, { fileName: _jsxFileName, lineNumber: 119, columnNumber: 15 }, this), _jsxDEV("td", { className: "col-5", children: employee.email }, void 0, false, { fileName: _jsxFileName, lineNumber: 120, columnNumber: 15 }, this), _jsxDEV("td", { className: "col-1", children: employee.admin ? "管理者" : "一般" }, void 0, false, { fileName: _jsxFileName, lineNumber: 121, columnNumber: 15 }, this), _jsxDEV("td", { className: "col-3", children: [_jsxDEV("button", { className: "btn btn-primary", onClick: () => handleEdit(employee.id), children: "\u7DE8\u96C6" }, void 0, false, { fileName: _jsxFileName, lineNumber: 123, columnNumber: 17 }, this), _jsxDEV("button", { className: "btn btn-danger mx-3", onClick: () => handleDelete(employee.id), children: "\u524A\u9664" }, void 0, false, { fileName: _jsxFileName, lineNumber: 129, columnNumber: 17 }, this)] }, void 0, true, { fileName: _jsxFileName, lineNumber: 122, columnNumber: 15 }, this)] }, employee.id, true, { fileName: _jsxFileName, lineNumber: 116, columnNumber: 46 }, this))) }, void 0, false, { fileName: _jsxFileName, lineNumber: 115, columnNumber: 9 }, this)] }, void 0, true, { fileName: _jsxFileName, lineNumber: 93, columnNumber: 7 }, this)] }, void 0, true, { fileName: _jsxFileName, lineNumber: 84, columnNumber: 11 }, this));
};
export default EmployeeListPage;
