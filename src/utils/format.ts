/*
 * @Author: 马文龙 214170716@qq.com
 * @Date: 2024-09-11 14:39:27
 * @LastEditors: 马文龙 214170716@qq.com
 * @LastEditTime: 2024-09-11 15:51:27
 * @FilePath: \uni-frame\src\utils\format.ts
 * @Description:
 */

/** 日期改为*月*日 */
export function formDate(dateStr: string) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${month.replace(/^0/, "")}月${day.replace(/^0/, "")}日`;
}
/** 日期改为*年*月*日 */
export function formYearDate(dateStr: string) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}年${month.replace(/^0/, "")}月${day.replace(/^0/, "")}日`;
}
