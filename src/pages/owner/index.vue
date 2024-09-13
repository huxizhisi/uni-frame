<!--
 * @Author: 马文龙 214170716@qq.com
 * @Date: 2024-09-11 14:39:25
 * @LastEditors: 马文龙 214170716@qq.com
 * @LastEditTime: 2024-09-13 17:37:44
 * @FilePath: \uni-frame\src\pages\owner\index.vue
 * @Description: 我的页面
-->

<template>
  <Navbar :mysNavConfig="mysNavConfig"> </Navbar>

  <view class="container pd-24 align-center"> 个人中心 </view>
  <Tabbar />
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { useRouter } from "uni-mini-router";
import Navbar from "@/components/Navbar/index.vue";
import Tabbar from "@/pages/tabbar/index.vue";

const mysNavConfig = reactive({
  navPadding: true,
  navFixed: true,
  leftTrans: false,
  bgColor: "#fff",
  navTitle: "",
  searchConfig: { show: false },
});
</script>

<style lang="scss" scoped>
.btn {
  display: inline-flex;
}
</style>
