<!--
 * @Author: 马文龙 214170716@qq.com
 * @Date: 2024-09-11 14:39:25
 * @LastEditors: 马文龙 214170716@qq.com
 * @LastEditTime: 2024-09-13 17:27:40
 * @FilePath: \uni-frame\src\template\example\index.vue
 * @Description: 示例
-->

<template>
  <!-- 导航条展示 -->
  <Navbar :mysNavConfig="mysNavConfig">
    <template #content>
      <view class="flex-center"> 示例页 </view>
    </template>
  </Navbar>
  <view class="example-page pd-12 pdt-20 pdb-20">
    <view class="fz-18 fb title-color mgb-12">组件使用示例:</view>
    <!-- 价格日历组件 -->
    <view class="common-card mgb-20">
      <CalenderDateCom />
    </view>
    <!-- 日期选择器 -->
    <view class="common-card mgb-20">
      <DatePickerCom />
    </view>
    <!-- 步进器组件 -->
    <view class="common-card mgb-20">
      <StepperCom />
    </view>
    <!-- 评分组件 -->
    <view class="common-card mgb-20">
      <RatingCom />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { reactive, onBeforeMount } from "vue";
import { useRequest } from "alova";
import Navbar from "@/components/Navbar/index.vue";
import CalenderDateCom from "./components/CalenderDateCom.vue";
import DatePickerCom from "./components/DatePickerCom.vue";
import StepperCom from "./components/StepperCom.vue";
import RatingCom from "./components/RatingCom.vue";
import { getHttpRequest, postHttpRequest } from "@/services/api/template";

/** 请求需要单独定义 */
const { send: getRequest } = useRequest(getHttpRequest, { immediate: false }); // 有接口缓存,有缓存就直接返回缓存数据
const { send: postRequest } = useRequest(postHttpRequest, { immediate: false, force: true }); // 无接口缓存,每次都请求

const mysNavConfig = reactive({
  navPadding: true,
  navFixed: true,
  leftTrans: false,
  bgColor: "#fff",
  navTitle: "",
  searchConfig: { show: false },
});

onBeforeMount(() => {
  mockRequest();
});

const mockRequest = () => {
  getRequest();
  postRequest({
    name: "post",
  });
};
</script>

<!-- 解决样式穿透失效 -->
<script lang="ts">
export default {
  options: {
    styleIsolation: "shared",
  },
};
</script>

<style>
page {
  background-color: #f8f8f8;
}
</style>
<style lang="scss" scoped></style>
