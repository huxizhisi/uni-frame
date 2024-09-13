/*
 * @Author: 马文龙 214170716@qq.com
 * @Date: 2024-09-11 14:39:27
 * @LastEditors: 马文龙 214170716@qq.com
 * @LastEditTime: 2024-09-11 15:49:06
 * @FilePath: \uni-frame\src\utils\http\request.ts
 * @Description: 请求方法封装
 */

import { request } from "./index";
import { useRequest, useFetcher, useWatcher } from "alova";

const GET = (url = "", options = {}) => {
  return request.Get(url, options);
};
const POST = (url = "", options = {}, config = {}) => {
  return request.Post(
    url,
    // http body数据
    options,
    config
  );
};

const PUT = (url = "", options = {}, config = {}) => {
  return request.Put(
    url,
    // http body数据
    options,
    config
  );
};

const DELETE = (url = "", options = {}, config = {}) => {
  return request.Delete(
    url,
    // http body数据
    options,
    config
  );
};

const useRequestGet = (options: any) => {
  const { newObj, otherObj }: any = forKey(options);
  return useRequest(GET(otherObj.url, newObj), options.requestOptions);
};
const useRequestPost = (options: any) => {
  const { newObj, otherObj }: any = forKey(options);
  return useRequest(POST(otherObj.url, newObj), options.requestOptions);
};
const useFetcherGet = (options: any) => {
  const { fetch } = useFetcher();
  const { newObj, otherObj }: any = forKey(options);
  return fetch(GET(otherObj.url, newObj));
};
const forKey = (obj: any) => {
  const newObj = {};
  const otherObj = {};
  for (const key in obj) {
    if (!["url", "requestOptions"].includes(key)) {
      newObj[key] = obj[key];
    } else {
      otherObj[key] = obj[key];
    }
  }
  return { newObj, otherObj };
};
export { GET, POST, PUT, DELETE, useRequestGet, useRequestPost, useFetcherGet, useRequest, useFetcher, useWatcher };
