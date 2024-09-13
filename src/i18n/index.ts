/*
 * @Author: 马文龙 214170716@qq.com
 * @Date: 2024-09-11 14:39:25
 * @LastEditors: 马文龙 214170716@qq.com
 * @LastEditTime: 2024-09-11 14:58:08
 * @FilePath: \uni-frame\src\i18n\index.ts
 * @Description:
 */

import { createI18n } from "vue-i18n";
import { LOCALE, LOCALE_MESSAGES } from "@/enums/i18nConstant";
import { useGlobalStore } from "@/store";
import en from "../locale/en.json";
import zh from "../locale/zh.json";
import langs from "./langs.json";

export function getLanguagePrefix(lang: string) {
  if (!lang) {
    return "";
  }
  if (lang.includes("_")) {
    return lang.split("_")[0];
  }
  if (lang.includes("-")) {
    return lang.split("-")[0];
  }
  return lang;
}

export function existsLang(lang: string) {
  const prefix = getLanguagePrefix(lang) as string;
  return langs.filter((obj) => obj.c.includes(prefix)).length > 0;
}

// json 格式，其余国际化文件由后端提供
const messages = {
  en,
  zh,
};

export function getDefaultLocale() {
  let tempLocale = "";

  // 默认读取本地存储语言设置
  // #ifndef APP-PLUS
  tempLocale = getLanguagePrefix(uni.getStorageSync(LOCALE) as string);
  // #endif

  if (!tempLocale) {
    const { osLanguage } = uni.getSystemInfoSync();
    if (existsLang(osLanguage)) {
      tempLocale = getLanguagePrefix(osLanguage || "zh");
    } else {
      tempLocale = "en";
    }
    console.log("osLanguage", osLanguage, existsLang(osLanguage), tempLocale);
  }

  uni.setStorageSync(LOCALE, tempLocale);
  console.log("default locale", tempLocale);

  return tempLocale;
}

const defaultLocale = getDefaultLocale();
// 这个类型可以自己配置
const i18n: any = createI18n({
  legacy: false, // 使用 Composition API 模式，则需要将其设置为false
  globalInjection: true, // 全局生效$t
  locale: defaultLocale,
  messages,
});

export const { t } = i18n.global;

export default i18n;

export function setI18nLocalMessages(local, localMessages) {
  i18n.global.setLocaleMessage(local, localMessages);
  uni.setStorageSync(LOCALE_MESSAGES, localMessages);
}

export async function setI18nLocal(locale) {
  uni.setStorageSync(LOCALE, locale);
  useGlobalStore().setLocale(locale);
  uni.showLoading({
    title: "Loading...",
    mask: true,
  });
  try {
    i18n.global.locale.value = locale;
  } catch (e) {
    console.log(e);
  } finally {
    uni.hideLoading();
  }
}
