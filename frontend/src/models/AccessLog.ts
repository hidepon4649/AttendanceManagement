export interface AccessLog {
  id: number;
  username: string;
  className: string;
  methodName: string;
  methodParams: string;
  errorMessage: string;
  userRoles: string;
  accessDate: string;
  accessTime: string;
}
