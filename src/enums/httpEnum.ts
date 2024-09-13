/*
 * @Author: 马文龙 214170716@qq.com
 * @Date: 2024-09-11 14:39:25
 * @LastEditors: 马文龙 214170716@qq.com
 * @LastEditTime: 2024-09-11 15:14:07
 * @FilePath: \uni-frame\src\enums\httpEnum.ts
 * @Description: 请求结果枚举项
 */

/**
 * @description: 请求结果设置
 */
export enum ResultEnum {
  SUCCESS = 200,
  FAIL = 10001,
  ERROR = 1,
  TIMEOUT = 401,
  TYPE = "success",
}

/**
 * @description: contentType
 */
export enum ContentTypeEnum {
  // json
  JSON = "application/json;charset=UTF-8",
  // form-data qs
  FORM_URLENCODED = "application/x-www-form-urlencoded;charset=UTF-8",
  // form-data  upload
  FORM_DATA = "multipart/form-data;charset=UTF-8",
}
