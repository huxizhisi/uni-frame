/*
 * @Author: 马文龙 214170716@qq.com
 * @Date: 2024-09-11 14:39:25
 * @LastEditors: 马文龙 214170716@qq.com
 * @LastEditTime: 2024-09-11 15:24:22
 * @FilePath: \uni-frame\src\settings\encryptionSetting.ts
 * @Description: 加密设置
 */

import { getEnvValue, getPkgVersion, isDevMode } from "@/utils/env";

// System default cache time, in seconds
export const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;
const PREFIX = getEnvValue<string>("VITE_APP_CACHE_PREFIX") || getEnvValue<string>("VITE_APP_TITLE") || "Gofun";
// export const DEFAULT_PREFIX_KEY = `${PREFIX}${getPkgVersion()}`;
export const DEFAULT_PREFIX_KEY = `${PREFIX}`;

// aes encryption key
export const cacheCipher = {
  key: "aQ0{gD1@c_0@oH5:",
  iv: "aF0#gC_$hE1$eA1!",
};

// Whether the system cache is encrypted using aes
export const enableStorageEncryption = !isDevMode();
