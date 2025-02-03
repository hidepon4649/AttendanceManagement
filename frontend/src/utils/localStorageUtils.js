const KEY_IS_ADMIN = "isAdmin";
const KEY_IS_LOGGED_IN = "isLoggedIn";
const KEY_USER = "USER";
const KEY_JWT_TOKEN = "JWT-TOKEN";
const KEY_CSRF_TOKEN = "CSRF-TOKEN";
export const lsClear = () => {
    localStorage.clear();
};
export const lsSetUser = (data) => {
    const userinfo = { ...data.employee };
    delete userinfo.password; // パスワードは保存しない
    userinfo.roles = data.roles; // ロール情報を追加
    localStorage.setItem("USER", JSON.stringify(userinfo));
};
export const lsIsLoggedIn = () => {
    return localStorage.getItem(KEY_IS_LOGGED_IN) === "true";
};
export const lsSetIsLoggedIn = (loggedin) => {
    localStorage.setItem(KEY_IS_LOGGED_IN, loggedin ? "true" : "false");
};
export const lsIsAdmin = () => {
    return localStorage.getItem(KEY_IS_ADMIN) === "true";
};
export const lsSetIsAdmin = (isAdmin) => {
    localStorage.setItem(KEY_IS_ADMIN, isAdmin ? "true" : "false");
};
export const lsGetMyId = () => {
    const userinfo = localStorage.getItem(KEY_USER);
    const id = userinfo ? JSON.parse(userinfo).id : 0;
    return id;
};
export const lsGetMyName = () => {
    const userinfo = localStorage.getItem(KEY_USER);
    const name = userinfo ? JSON.parse(userinfo).name : null;
    return name;
};
export const lsGetJwtToken = () => {
    return localStorage.getItem(KEY_JWT_TOKEN);
};
export const lsSetJwtToken = (token) => {
    localStorage.setItem(KEY_JWT_TOKEN, token);
};
export const lsGetCsrfToken = () => {
    return localStorage.getItem(KEY_CSRF_TOKEN);
};
export const lsSetCsrfToken = (token) => {
    localStorage.setItem(KEY_CSRF_TOKEN, token);
};
