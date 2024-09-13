/*
 * @Author: 马文龙 214170716@qq.com
 * @Date: 2024-09-11 14:39:25
 * @LastEditors: 马文龙 214170716@qq.com
 * @LastEditTime: 2024-09-11 15:17:46
 * @FilePath: \uni-frame\src\router\guard.ts
 * @Description: 路由守卫配置
 */

import { Router } from "uni-mini-router/lib/interfaces";
// import { useAuthStore } from "@/store/modules/auth";
// import { useGlobalStore } from "@/store/modules/globalStore";

export function createRouterGuard(router: Router) {
  createBeforeEachGuard(router); /** 路由前置守卫 */
  createAfterEachGuard(router); /** 路由后置守卫 */
}

function createBeforeEachGuard(router: Router) {
  router.beforeEach((to, _, next) => {
    // @ts-ignore
    /**
     * 是否要记录埋点信息
     * 埋点方式有许多种,这里示例的是通过pinia储存提前在路由里配置的meta选项。这样在后置的http请求中可以以请求头配置的方式通知后端。
     * 实际业务场景可以根据具体情况开发，此处仅做示例： anchor为是否埋点开关，anchorQuery为埋点参数，可自行定义
     */
    // const globalStore = useGlobalStore();
    // if (_ && _?.meta?.anchor) {
    //   globalStore.setAnchorData(_.meta.anchorQuery);
    // }

    /**
     * 鉴权部分业务也需要和实际业务情况绑定，在此不多拓展
     */
    // do something...

    /**
     * 这里可以判断通过配置白名单配合权限使用。
     */
    // if (to && to?.meta?.ignoreAuth) {
    //   // 如果目标路由忽略验证直接跳转
    //   next();
    // }
    // else if (!authStore.isLogin && to && to.name !== "Login") {
    //   // 如果没有登录且目标路由不是登录页面则跳转到登录页面
    //   // 将目标路由和参数传入登录页面，登录成功后直接跳转到目标路由，优化体验
    //   next({ name: "Login", params: { redirect: to.name!, tabBar: to?.meta?.tabBar, ...to.query }, navType: "push" });
    // }
    // else if (authStore.isLogin && to && to.name === "Login") {
    //   // 如果已经登录且目标页面是登录页面则跳转至首页
    //   next({ name: "Home", navType: "replaceAll" });
    // }
    // else {
    // next();
    // }
    next();
  });
}

function createAfterEachGuard(router: Router) {
  router.afterEach((to) => {
    // @ts-ignore
    // if (to && to?.meta?.ignoreAuth) return;
    // const authStore = useAuthStore();
    // if (!authStore.isLogin && to && to.name !== "Login") {
    //   // 如果没有登录且目标路由不是登录页面则跳转到登录页面
    //   router.push({ name: "Login", params: { tabBar: to?.meta?.tabBar, ...to.query } });
    // } else if (authStore.isLogin && to && to.name === "Login") {
    //   // 如果已经登录且目标页面是登录页面则跳转至首页
    //   router.replaceAll({ name: "Home" });
    // }
  });
}
