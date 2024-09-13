<!--
 * @Author: mawenlong
 * @LastEditors: 马文龙 214170716@qq.com
 * @Date: 2023-07-12 17:43:44
 * @LastEditTime: 2024-09-13 17:36:20
 * @Description: 
-->
<template>
  <view class="container">
    <!-- 底部TabBar -->
    <view class="tab-bar">
      <!-- 首页 -->
      <view class="tab-item" @click="changeTab('index')" :class="{ active: isActive('index') }">
        <!-- <zui-svg-icon icon="home" width="17px" color="#000" /> -->
        <view style="width: 34rpx; height: 34rpx" class="u-flex u-col-top">
          <u-icon :name="isActive('index') ? 'home-fill' : 'home'" />
        </view>
        <text class="tab-title">首页</text>
      </view>
      <!-- 示例页 -->
      <view class="tab-item" @click="changeTab('template')" :class="{ active: isActive('template') }">
        <view style="width: 34rpx; height: 34rpx" class="u-flex u-col-top">
          <u-icon :name="isActive('template') ? 'grid-fill' : 'grid'" />
        </view>
        <text class="tab-title">示例</text>
      </view>
      <!-- 我的中心页 -->
      <view class="tab-item" @click="changeTab('owner')" :class="{ active: isActive('owner') }">
        <view style="width: 34rpx; height: 34rpx" class="u-flex u-col-top">
          <u-icon :name="isActive('owner') ? 'account-fill' : 'account'" />
        </view>
        <text class="tab-title">我的</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "uni-mini-router";
import { onShow } from "@dcloudio/uni-app";

// 定义匹配路径的对象
const tabRoutes = {
  index: ["/pages/index/index", true],
  template: ["/template/example/index"],
  owner: ["/pages/owner/index"],
};

const actRoute = ref("/pages/index/index");

// 判断当前路由是否处于激活状态
const isActive = (tabKey: string): boolean => {
  const routes = tabRoutes[tabKey];
  if (!routes) return false;
  return routes.some((route) => actRoute.value === route);
};

const router = useRouter();
const changeTab = (tabKey: string) => {
  const routes = tabRoutes[tabKey];
  if (routes[0] === actRoute.value) return;
  router.replaceAll(routes[0]);
};

onShow(async () => {
  actRoute.value =
    `/${getCurrentPages()[getCurrentPages().length - 1]?.route}` || router.route.value.path || "/pages/index/index";
});
</script>
<style lang="scss" scoped>
.container {
  height: 100%;
}
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 150rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  z-index: 960;
  box-shadow: 0px -4rpx 24rpx 0px rgba(221, 221, 221, 0.42);
  padding: 0 70rpx;
}
.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: $second-font-color;
}
.tab-item.active {
  color: $base-color;
}
.tab-icon {
  width: 24px;
  height: 24px;
}
.tab-title {
  font-size: 12px;
  margin-top: 4px;
}
</style>
