/*
 * @Author: 马文龙 214170716@qq.com
 * @Date: 2024-09-11 14:39:27
 * @LastEditors: 马文龙 214170716@qq.com
 * @LastEditTime: 2024-09-11 15:39:33
 * @FilePath: \uni-frame\src\utils\common\useLocale.ts
 * @Description: 国际化使用工具
 */

import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { LOCALE } from "@/enums/i18nConstant";

export default function useLocale() {
  const i18n = useI18n(); // 实例化i18n

  const currentLocale = computed(() => {
    return i18n.locale.value; // 固定写法 获取当前语言设置
  });

  // 切换语言
  const changeLocale = (value: string) => {
    i18n.locale.value = value; // 赋值切换语言
    uni.setStorageSync(LOCALE, value || "");
  };

  return {
    i18n,
    currentLocale,
    changeLocale,
  };
}
