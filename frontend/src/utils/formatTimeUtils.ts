export const formatTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toTimeString().split(" ")[0]; // "HH:MM:SS"形式で取得
  };
export const formatShortTime = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  const shorttime = date.toTimeString().split(" ")[0].substring(0, 5);
  // console.log("shorttime:", shorttime);
  return shorttime; // "HH:MM"形式で取得
};

export const padFrontZero = (num: number | string, size: number) => String(num).padStart(size, '0');
