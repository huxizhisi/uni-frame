<!--
 * @Author: 马文龙 214170716@qq.com
 * @Date: 2024-09-11 14:39:25
 * @LastEditors: 马文龙 214170716@qq.com
 * @LastEditTime: 2024-09-13 17:29:49
 * @FilePath: \uni-frame\src\pages\index\index.vue
 * @Description: 首页
-->

<template>
  <view class="container pd-24 align-center">
    <view class="fz-18 title-color mgb-20 fb"> {{ $t("common.title") }} </view>
    <view class="fz-14 main-font-color mgb-20">
      基于 Vue3 + TypeScript + Uni-app + Pinia + uni-mini-router +
      VK-Uview-Ui等进行构建的轻量级前端模板框架，适用于中小型的多端项目开发，开箱即用。
    </view>
    <view class="btn white-color black-bg radius16 pd-16 pdt-8 pdb-8 u-inline-flex" @tap="toExample">
      点击跳转到示例页面
    </view>
  </view>

  <Tabbar />
</template>

<script lang="ts" setup>
import { useRouter } from "uni-mini-router";
import Tabbar from "@/pages/tabbar/index.vue";

const router = useRouter();

const toExample = () => {
  router.push("/template/example/index");
};
</script>

<style>
page {
  min-height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>

<style lang="scss" scoped>
.btn {
  display: inline-flex;
}
</style>
