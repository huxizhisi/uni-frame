/*
 * @Author: 马文龙 214170716@qq.com
 * @Date: 2024-09-11 14:39:25
 * @LastEditors: 马文龙 214170716@qq.com
 * @LastEditTime: 2024-09-11 15:18:02
 * @FilePath: \uni-frame\src\router\index.ts
 * @Description: 路由设置
 */

/**
 * router
 * @see https://gitee.com/fant-mini/uni-mini-router
 */
import { createRouter } from "uni-mini-router";
import { App } from "vue";
import { createRouterGuard } from "@/router/guard";

const router = createRouter({
  routes: [...ROUTES], // 路由表信息
});

export function setupRouter(app: App<Element>) {
  // Configure router guard
  createRouterGuard(router);
  app.use(router);
}

export { router };
