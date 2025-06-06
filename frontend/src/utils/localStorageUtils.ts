const KEY_IS_ADMIN = 'isAdmin';
const KEY_IS_LOGGED_IN = 'isLoggedIn';
const KEY_USER = 'USER';
const KEY_JWT_TOKEN = 'JWT-TOKEN';
export const lsClear = (): void => {
  localStorage.clear();
};

export const lsSetUser = (data: any): void => {
  const userinfo = { ...data.employee };
  delete userinfo.password; // パスワードは保存しない
  userinfo.roles = data.roles; // ロール情報を追加
  localStorage.setItem('USER', JSON.stringify(userinfo));
};
export const lsIsLoggedIn = (): boolean => {
  return localStorage.getItem(KEY_IS_LOGGED_IN) === 'true';
};

export const lsSetIsLoggedIn = (loggedin: boolean): void => {
  localStorage.setItem(KEY_IS_LOGGED_IN, loggedin ? 'true' : 'false');
};

export const lsIsAdmin = (): boolean => {
  return localStorage.getItem(KEY_IS_ADMIN) === 'true';
};

export const lsSetIsAdmin = (isAdmin: boolean): void => {
  localStorage.setItem(KEY_IS_ADMIN, isAdmin ? 'true' : 'false');
};

export const lsGetMyId = (): number => {
  const userinfo = localStorage.getItem(KEY_USER);
  const id = userinfo ? JSON.parse(userinfo).id : 0;
  return id;
};

export const lsGetMyName = (): string | null => {
  const userinfo = localStorage.getItem(KEY_USER);
  const name = userinfo ? JSON.parse(userinfo).name : null;
  return name;
};

export const lsGetJwtToken = (): string | null => {
  return localStorage.getItem(KEY_JWT_TOKEN);
};

export const lsSetJwtToken = (token: string): void => {
  localStorage.setItem(KEY_JWT_TOKEN, token);
};
