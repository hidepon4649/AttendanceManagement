export const formatTime = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  return date.toTimeString().split(' ')[0]; // "HH:MM:SS"形式で取得
};
export const formatShortTime = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  const shorttime = date.toTimeString().split(' ')[0].substring(0, 5);
  return shorttime; // "HH:MM"形式で取得
};

export const padFrontZero = (num: number | string, size: number) =>
  String(num).padStart(size, '0');

const youbiList = ['(日)', '(月)', '(火)', '(水)', '(木)', '(金)', '(土)'];
export const getYoubi = (date: string) => {
  const youbi = new Date(date).getDay();
  return youbiList[youbi];
};

export const getDefaultRecords = (targetMonth: string) => {
  const [year, month] = targetMonth.split('-').map(Number);
  const lastDay = new Date(year, month, 0).getDate(); // 月の最終日を取得(月は0ベース)

  // 日付の配列を作成. 1日から月末までの日付を格納.
  // ロケール指定をしなかった場合に月初日付がずれる場合があるため ja-JPを指定
  const daysArray = Array.from({ length: lastDay }, (_, i) =>
    new Date(year, month - 1, i + 1)
      .toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: 'Asia/Tokyo',
      })
      .replace(/\//g, '-')
  );

  return daysArray;
};

export const getYearMonthForPrint = (targetMonth: string) => {
  const [year, month] = targetMonth.split('-').map(Number);
  const dispYear = padFrontZero(year, 4);
  const dispMonth = padFrontZero(month, 2);
  return `${dispYear}年${dispMonth}月`;
};

export const getStartEndGap = (
  start: string,
  end: string,
  breakMinutes: number = 0
) => {
  if (typeof breakMinutes === 'string') {
    breakMinutes = parseInt(breakMinutes);
  }
  const clockInTime = new Date(start);
  const clockOutTime = new Date(end);

  // 秒とミリ秒を0にリセット(秒までは計上しない)
  clockInTime.setSeconds(0, 0);
  clockOutTime.setSeconds(0, 0);

  const timeDifference = clockOutTime.getTime() - clockInTime.getTime();
  const totalMinutes = Math.floor(timeDifference / (1000 * 60)) - breakMinutes;
  const hours = padFrontZero(Math.floor(totalMinutes / 60), 2);
  const minutes = padFrontZero(totalMinutes % 60, 2);
  const formattedTimeDifference = `${hours}:${minutes}`;
  return { minutes: totalMinutes, hhmm: formattedTimeDifference };
};

export const minutesToHHMM = (minutes: number) => {
  const hours = padFrontZero(Math.floor(minutes / 60), 2);
  const mins = padFrontZero(minutes % 60, 2);
  return `${hours}:${mins}`;
};

export const getFormattedToday = () => {
  return new Date()
    .toLocaleDateString('ja-JP', {
      timeZone: 'Asia/Tokyo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\//g, '-');
};
