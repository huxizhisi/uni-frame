<!--
 * @Author: 马文龙 214170716@qq.com
 * @Date: 2024-09-11 14:39:24
 * @LastEditors: 马文龙 214170716@qq.com
 * @LastEditTime: 2024-09-11 16:07:28
 * @FilePath: \uni-frame\src\App.vue
 * @Description: 
-->

<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { useAuthStore } from "@/store/";
import { getDefaultLocale } from "./i18n";
import { useGlobalStore } from "@/store";

const locale = getDefaultLocale();
const globalStore = useGlobalStore();

onLaunch((res) => {
  globalStore.setLocale(locale || "zh");
  uni.setLocale("zh");
});
onShow(() => {
  const authStore = useAuthStore();
  authStore.initToken();
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style lang="scss">
@import "@/assets/main.scss";
@import "@/assets/uni.scss";
</style>
