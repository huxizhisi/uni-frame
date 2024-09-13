/*
 * @Author: 马文龙 214170716@qq.com
 * @Date: 2024-09-11 14:39:24
 * @LastEditors: 马文龙 214170716@qq.com
 * @LastEditTime: 2024-09-11 16:01:45
 * @FilePath: \uni-frame\src\main.ts
 * @Description:
 */

import { createSSRApp } from "vue";
import App from "./App.vue";
import uView from "./uni_modules/vk-uview-ui";
import * as Pinia from "pinia";
import i18n from "@/i18n/index";
import { setupRouter } from "@/router";

export function createApp() {
  const app = createSSRApp(App);
  app.use(uView);
  app.use(Pinia.createPinia());
  app.use(i18n);
  // Configure router
  setupRouter(app);

  return {
    app,
  };
}
