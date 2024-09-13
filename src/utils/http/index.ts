/*
 * @Author: 马文龙 214170716@qq.com
 * @Date: 2024-09-11 14:39:27
 * @LastEditors: 马文龙 214170716@qq.com
 * @LastEditTime: 2024-09-11 15:48:01
 * @FilePath: \uni-frame\src\utils\http\index.ts
 * @Description: http请求
 */

import { createAlova } from "alova";
import AdapterUniapp from "@alova/adapter-uniapp";
import { getBaseUrl } from "@/utils/env";
import { assign } from "lodash-es";
import { useGlobalStore } from "@/store/modules/globalStore";
import { useAuthStore } from "@/store/modules/auth";
import { checkStatus } from "@/utils/http/checkStatus";
import { ContentTypeEnum, ResultEnum } from "@/enums/httpEnum";
import { Toast } from "@/utils/uniapi/prompt";
import { API } from "@/services/model/baseModel";
import { removeCache } from "@/utils/cache";
import { TOKEN_KEY } from "@/enums/cacheEnum";

/**
 * 微信小程序开发的过程中必须直接连接服务器域名，否则会报跨域错误
 * 在构建H5项目或其他需要打包的项目中,则直接获取本地环境变量配置
 */
// #ifndef MP-WEIXIN
const BASE_URL = getBaseUrl();
// #endif
// #ifdef MP-WEIXIN
const BASE_URL = "your_customer_request"; // 预发布环境
// #endif

/**
 * 基础请求头配置
 */
const HEADER = {
  "Content-Type": ContentTypeEnum.JSON,
  Accept: "application/json, text/plain, */*",
  /** 这里是为了没有灰度环境的情况下，通过请求头指向不同的服务器地址，从而实现小程序滚动发版 */
  version: "1.0",
};

/**
 * alova 请求实例
 * @link https://github.com/alovajs/alova
 */
const alovaInstance = createAlova({
  baseURL: BASE_URL, // 请求地址
  ...AdapterUniapp({}), // alova的uniapp适配器
  timeout: 30000, // 请求超时时间
  beforeRequest: async (method) => {
    let headerData = assign({}, method.config.headers, HEADER); // 默认请求头

    /**
     * 这里是配合埋点数据,通过路由里配置的埋点信息在请求头部传给服务端
     */
    // if (method.config?.anchor) {
    //   const globalStore = useGlobalStore();
    //   //   创建一个TextEncoder实例来处理Unicode字符;
    //   const textEncoder = new TextEncoder();
    //   //   将中文文本编码为Uint8Array;
    //   const utf8Bytes = textEncoder.encode(globalStore.getAnchorData);
    //   const utf8Bytes = unescape(encodeURIComponent(globalStore.getAnchorData))
    //     .split("")
    //     .map((val) => val.charCodeAt());
    //   const AnchorStr = uni.arrayBufferToBase64(utf8Bytes);
    //   const anchorData = {
    //     Anchor: AnchorStr,
    //   };
    //   headerData = assign(headerData, anchorData);
    // }

    /** 存token以及其他自定义信息,这里以phone举例 */
    const authStore = useAuthStore();
    headerData = assign(headerData, authStore.getAuthorization, authStore.getAuthorPhone);

    method.config.headers = headerData;
  },
  responsed: {
    /**
     * 请求成功的拦截器
     * 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
     * @param response
     * @param method
     */
    onSuccess: async (response, method) => {
      const authStore = useAuthStore();
      const { config } = method;
      const { enableDownload, enableUpload } = config;
      // @ts-ignore
      const { statusCode, data: rawData } = response;

      /** 这里可以通过接口配置的字段,实现在微信小程序后台检测http发起请求数据监测。
       * 这里以接口处的isLog参数举例
       */
      //   if (config?.isLog) {
      //   const logStore = useUserLog();
      //     // #ifdef MP-WEIXIN
      //     const logManager = wx.getRealtimeLogManager();
      //     const logger = logManager.tag("plugin-onUserTapSth");
      //     logger.info(config?.logName || "数据监测", {
      //       statusCode,
      //       startTime: logStore.logStartTime,
      //       endTime: Date.now() + "",
      //       data: rawData,
      //     });
      //     // #endif
      //   }
      const { code, message, data } = rawData as API;
      if (statusCode === 200) {
        if (enableDownload) {
          // 下载处理
          return rawData;
        }
        if (enableUpload) {
          // 上传处理
          return rawData;
        }
        if (code === ResultEnum.SUCCESS) {
          return data as any;
        }
        if (code === ResultEnum.TIMEOUT) {
          /** 需要重新登录 */
          removeCache(TOKEN_KEY);
          authStore.setToken("");
          authStore.setPhoneNumber("");
          //   return data as any;
          message && Toast(message);
          return Promise.reject(rawData);
        }
        message && Toast(message);
        return Promise.reject(rawData);
      }

      checkStatus(statusCode, message || "");
      return Promise.reject(rawData);
    },

    /**
     * 请求失败的拦截器，请求错误时将会进入该拦截器。
     * 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
     * @param err
     * @param method
     */
    onError: (err, method) => {
      // error('Request Error!');
      return Promise.reject({ err, method });
    },
  },
});

const request = alovaInstance;
export { request, BASE_URL };
