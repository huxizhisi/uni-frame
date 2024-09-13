/*
 * @Author: 马文龙 214170716@qq.com
 * @Date: 2024-09-11 14:39:24
 * @LastEditors: 马文龙 214170716@qq.com
 * @LastEditTime: 2024-09-11 16:11:27
 * @FilePath: \uni-frame\vite.config.ts
 * @Description:
 */

import { ConfigEnv, loadEnv, UserConfig } from "vite";
import { resolve } from "path";
import uni from "@dcloudio/vite-plugin-uni";
import TransformPages from "uni-read-pages-vite";

export default ({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  return {
    base: "./",
    // 设置路径别名
    resolve: {
      alias: {
        "@": resolve("./src"),
        "#": resolve("./src/types"),
      },
      extensions: [".js", ".json", ".ts", ".vue"], // 使用路径别名时想要省略的后缀名，可以自己 增减
    },
    // 自定义全局变量
    define: {
      "process.env": {},
      ROUTES: new TransformPages().routes,
    },
    // 开发服务器配置
    server: {
      host: true,
      // open: true,
      port: env.VITE_PORT as any,
      proxy: {
        "/api": {
          target: "https://mock.apifox.cn/m1/2768690-0-default", // mock地址
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
        "/basic-api": {
          target: env.VITE_BASE_URL, // 环境变量
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/basic-api/, ""),
        },
      },
    },
    // 构建配置
    build: {
      outDir: "dist",
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name].${new Date().getTime()}.js`,
          chunkFileNames: `assets/[name].${new Date().getTime()}.js`,
          assetFileNames: `assets/[name].${new Date().getTime()}.[ext]`,
          compact: true,
        },
      },
    },
    css: {
      // 配置`scss`和`less`全局变量
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/base.scss";',
        },
      },
    },
    // 插件
    plugins: [uni()],
  };
};
