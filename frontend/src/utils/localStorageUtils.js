"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lsSetCsrfToken = exports.lsGetCsrfToken = exports.lsSetJwtToken = exports.lsGetJwtToken = exports.lsGetMyName = exports.lsGetMyId = exports.lsSetIsAdmin = exports.lsIsAdmin = exports.lsSetIsLoggedIn = exports.lsIsLoggedIn = exports.lsSetUser = exports.lsClear = void 0;
const KEY_IS_ADMIN = "isAdmin";
const KEY_IS_LOGGED_IN = "isLoggedIn";
const KEY_USER = "USER";
const KEY_JWT_TOKEN = "JWT-TOKEN";
const KEY_CSRF_TOKEN = "CSRF-TOKEN";
const lsClear = () => {
    localStorage.clear();
};
exports.lsClear = lsClear;
const lsSetUser = (data) => {
    const userinfo = Object.assign({}, data.employee);
    delete userinfo.password; // パスワードは保存しない
    userinfo.roles = data.roles; // ロール情報を追加
    localStorage.setItem("USER", JSON.stringify(userinfo));
};
exports.lsSetUser = lsSetUser;
const lsIsLoggedIn = () => {
    return localStorage.getItem(KEY_IS_LOGGED_IN) === "true";
};
exports.lsIsLoggedIn = lsIsLoggedIn;
const lsSetIsLoggedIn = (loggedin) => {
    localStorage.setItem(KEY_IS_LOGGED_IN, loggedin ? "true" : "false");
};
exports.lsSetIsLoggedIn = lsSetIsLoggedIn;
const lsIsAdmin = () => {
    return localStorage.getItem(KEY_IS_ADMIN) === "true";
};
exports.lsIsAdmin = lsIsAdmin;
const lsSetIsAdmin = (isAdmin) => {
    localStorage.setItem(KEY_IS_ADMIN, isAdmin ? "true" : "false");
};
exports.lsSetIsAdmin = lsSetIsAdmin;
const lsGetMyId = () => {
    const userinfo = localStorage.getItem(KEY_USER);
    const id = userinfo ? JSON.parse(userinfo).id : 0;
    return id;
};
exports.lsGetMyId = lsGetMyId;
const lsGetMyName = () => {
    const userinfo = localStorage.getItem(KEY_USER);
    const name = userinfo ? JSON.parse(userinfo).name : null;
    return name;
};
exports.lsGetMyName = lsGetMyName;
const lsGetJwtToken = () => {
    return localStorage.getItem(KEY_JWT_TOKEN);
};
exports.lsGetJwtToken = lsGetJwtToken;
const lsSetJwtToken = (token) => {
    localStorage.setItem(KEY_JWT_TOKEN, token);
};
exports.lsSetJwtToken = lsSetJwtToken;
const lsGetCsrfToken = () => {
    return localStorage.getItem(KEY_CSRF_TOKEN);
};
exports.lsGetCsrfToken = lsGetCsrfToken;
const lsSetCsrfToken = (token) => {
    localStorage.setItem(KEY_CSRF_TOKEN, token);
};
exports.lsSetCsrfToken = lsSetCsrfToken;
