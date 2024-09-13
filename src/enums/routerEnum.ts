/*
 * @Author: 马文龙 214170716@qq.com
 * @Date: 2024-09-11 14:39:25
 * @LastEditors: 马文龙 214170716@qq.com
 * @LastEditTime: 2024-09-11 15:17:18
 * @FilePath: \uni-frame\src\enums\routerEnum.ts
 * @Description: 路由枚举项
 */

export enum NAVIGATE_TYPE {
  NAVIGATE_TO = "navigateTo",
  REDIRECT_TO = "redirectTo",
  RE_LAUNCH = "reLaunch",
  SWITCH_TAB = "switchTab",
  NAVIGATE_BACK = "navigateBack",
}

export const NAVIGATE_TYPE_LIST = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];

export const HOME_PAGE = "/pages/index/index";
export const LOGIN_PAGE = "/pages/login/index";
