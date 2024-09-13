/**
 * 深拷贝内容
 * @param obj 拷贝对象
 */
export function deepClone(obj) {
  if (typeof obj !== "object" || obj == null) {
    return obj;
  }
  let res;
  if (obj instanceof Array) {
    res = [];
  } else {
    res = {};
  }
  for (const key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      res[key] = deepClone(obj[key]);
    }
  }
  return res;
}

/**
 * 格式化数值-个位数补零
 * @param n 数值
 */
export function formatNumber(n: number | string) {
  let s = parseInt(n);
  if (isNaN(s)) {
    s = "0";
  } else {
    s = s.toString();
  }
  return s[1] ? s : `0${s}`;
}

/**
 * 格式化时间
 * @param date 时间对象
 * @param format 格式
 * @author: crlang
 */
export function formatTime(date: Date, format: string): string {
  const daDate = new Date(date.toString().length < 11 ? date * 1000 : date);
  const fromatsRule = ["y", "m", "d", "h", "i", "s"];
  let tmp = [];
  const year = daDate.getFullYear();
  const month = daDate.getMonth() + 1;
  const day = daDate.getDate();
  const hour = daDate.getHours();
  const minute = daDate.getMinutes();
  const second = daDate.getSeconds();

  if (format) {
    tmp.push(year, month, day, hour, minute, second);
    tmp = tmp.map(formatNumber);
    for (let i = 0; i < tmp.length; i++) {
      format = format.toLowerCase().replace(fromatsRule[i], tmp[i]);
    }
    return format;
  }

  return `${[year, month, day].map(formatNumber).join("/")} ${[hour, minute, second].map(formatNumber).join(":")}`;
}

/**
 * 获取某个时间范围
 *
 * @param v -1、-7、-14、-30、-60
 * @returns object {start: y-m-d,end: y-m-d}
 */
export function getRangeDate(v) {
  const now = new Date();
  const nowTime = now.getTime();
  const oneDay = 24 * 60 * 60 * 1000;
  const dateRange = { start: "", end: "" };
  const nowWeekDay = now.getDay(); // 今天本周的第几天
  const nowDay = now.getDate(); // 当前日
  const nowMonth = now.getMonth(); // 当前月
  const nowYear = now.getFullYear(); // 当前年

  /**
   * 获得某个月的天数
   * @param month 当前月份
   */
  const getMonthDays = function (month: any) {
    const monthStartDate = new Date(nowYear, month, 1) as any;
    const monthEndDate = new Date(nowYear, month + 1, 1) as any;
    const days = (monthEndDate - monthStartDate) / oneDay;
    return days;
  };

  // 昨日
  if (v === "-1") {
    dateRange.start = formatTime(new Date(nowTime - oneDay), "y-m-d");
    dateRange.end = dateRange.start;
    // 本周
  } else if (v === "-7") {
    const weekStart = new Date(nowYear, nowMonth, nowDay - nowWeekDay + 1);
    const weekEnd = new Date(nowTime + oneDay); // 今日
    dateRange.start = formatTime(weekStart, "y-m-d");
    dateRange.end = formatTime(weekEnd, "y-m-d");
    // 上周
  } else if (v === "-14") {
    const weekStart = new Date(nowYear, nowMonth, nowDay - nowWeekDay - 6);
    const weekEnd = new Date(nowYear, nowMonth, nowDay - nowWeekDay);
    dateRange.start = formatTime(weekStart, "y-m-d");
    dateRange.end = formatTime(weekEnd, "y-m-d");
    // 本月
  } else if (v === "-30") {
    const monthStart = new Date(nowYear, nowMonth, 1);
    const monthEnd = new Date(nowTime + oneDay);
    dateRange.start = formatTime(monthStart, "y-m-d");
    dateRange.end = formatTime(monthEnd, "y-m-d");
    // 上月
  } else if (v === "-60") {
    const lastMonthDate = new Date(); // 上月日期
    lastMonthDate.setDate(1);
    lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
    const lastMonth = lastMonthDate.getMonth();
    const lastMonthStart = new Date(nowYear, lastMonth, 1);
    const lastMonthEnd = new Date(nowYear, lastMonth, getMonthDays(lastMonth));
    dateRange.start = formatTime(lastMonthStart, "y-m-d");
    dateRange.end = formatTime(lastMonthEnd, "y-m-d");
  } else {
    // 传入 v 为整数是即为近 xx 天
    if (v > 0) {
      dateRange.start = formatTime(new Date(nowTime - oneDay * parseInt(v)), "y-m-d");
      dateRange.end = formatTime(new Date(nowTime - oneDay), "y-m-d"); // 不含今天
    }
  }
  return dateRange;
}
