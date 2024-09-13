/*
 * @Author: 马文龙 214170716@qq.com
 * @Date: 2024-09-11 15:18:48
 * @LastEditors: 马文龙 214170716@qq.com
 * @LastEditTime: 2024-09-13 17:18:40
 * @FilePath: \uni-frame\src\services\api\template.ts
 * @Description:
 */
import { GET, POST } from "@/utils/http/request";

const YOUR_CUSTOMER_GET = "/api/yourCustomer/get";
const YOUR_CUSTOMER_POST = "/api/yourCustomer/get";

/**
 * get请求配置
 */
export function getHttpRequest(id = "" as string) {
  return GET(`${YOUR_CUSTOMER_GET}?id=${id}`);
}

/**
 * post请求配置
 */
export function postHttpRequest(param: any) {
  return POST(`${YOUR_CUSTOMER_POST}`, param);
}
