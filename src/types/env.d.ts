/*
 * @Author: mawenlong
 * @LastEditors: mawenlong
 * @Date: 2023-05-18 10:42:17
 * @LastEditTime: 2023-05-18 11:41:57
 * @Description:
 */
// / <reference types="vite/client" />

declare module "*.vue" {
  import { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImportMetaEnv {
  readonly VITE_ENV: string;
  readonly VITE_APP_TITLE: string;
  readonly VITE_BASE_URL: string;
  readonly VITE_UPLOAD_URL: string;
  readonly VITE_APP_CACHE_PREFIX: string;
  readonly VITE_PORT: number;
  readonly VITE_USE_MOCK: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
