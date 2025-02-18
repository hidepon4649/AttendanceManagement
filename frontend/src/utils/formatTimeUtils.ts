export const formatTime = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  return date.toTimeString().split(" ")[0]; // "HH:MM:SS"形式で取得
};
export const formatShortTime = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  const shorttime = date.toTimeString().split(" ")[0].substring(0, 5);
  return shorttime; // "HH:MM"形式で取得
};
export const padFrontZero = (num: number, size: number) =>
  String(num).padStart(size, "0");

export const formatDBStyle = (value: any) => {
  const d = new Date(value.$d);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0"); // 月は0始まりなので+1
  const dd = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  const myTime = `${yyyy}-${mm}-${dd}T${hh}:${mi}:${ss}`;
  return myTime;
};
