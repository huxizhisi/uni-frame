/*
 * @Author: 马文龙 214170716@qq.com
 * @Date: 2024-09-11 14:39:27
 * @LastEditors: 马文龙 214170716@qq.com
 * @LastEditTime: 2024-09-11 15:50:58
 * @FilePath: \uni-frame\src\utils\env.ts
 * @Description: 环境变量方法配置
 */

import pkg from "../../package.json";

/**
 * @description: Generate cache key according to version
 */
export function getPkgVersion() {
  return `${`__${pkg.version}`}__`.toUpperCase();
}

/**
 * @description: Development mode
 */
export const devMode = "development";

/**
 * @description: Production mode
 */
export const prodMode = "production";

/**
 * @description: Get environment mode
 * @returns:
 * @example:
 */
export function getEnvMode(): string {
  return getEnvValue("VITE_ENV");
}

/**
 * @description: Get environment variables
 * @returns:
 * @example:
 */
export function getEnvValue<T = string>(key: keyof ImportMetaEnv): T {
  const envValue = import.meta.env[key];
  console.log(envValue, "envValue");
  return (envValue === "true" ? true : envValue === "false" ? false : envValue) as unknown as T;
}

/**
 * @description: Is it a development mode
 * @returns:
 * @example:
 */
export function isDevMode(): boolean {
  return getEnvMode() === devMode;
}

/**
 * @description: Is it a production mode
 * @returns:
 * @example:
 */
export function isProdMode(): boolean {
  return getEnvMode() === prodMode;
}

/**
 * @description: Whether to use mock data
 * @returns:
 * @example:
 */
export function isUseMock(): boolean {
  return getEnvValue("VITE_USE_MOCK");
}

/**
 * @description: Get environment VITE_BASE_URL value
 * @returns:
 * @example:
 */
export function getBaseUrl(): string {
  return getEnvValue<string>("VITE_BASE_URL");
}
