<!--
 * @Author: 马文龙 214170716@qq.com
 * @Date: 2024-09-11 14:39:25
 * @LastEditors: 马文龙 214170716@qq.com
 * @LastEditTime: 2024-09-13 17:27:26
 * @FilePath: \uni-frame\src\template\example\components\CalenderDateCom.vue
 * @Description: 价格日历组件实例
-->

<template>
  <view>
    <view class="fz-14 main-font-color mgb-10 fb">价格日历组件实例</view>
    <view class="fz-12 second-font-color" @tap="showCalender = true">点击展示弹窗</view>
    <CalenderDate
      @selectDate="selectDate"
      :current="actDate"
      :dateJson="priceDateList"
      :visiable="showCalender"
      @close="closeCalender"
    >
      <template #top>
        <view class="calender-top relative u-flex u-row-center pd-15 pdt-20 mgb-10"> 头部信息自定义 </view>
      </template>
    </CalenderDate>
  </view>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import CalenderDate from "@/components/CalenderDate/index.vue";

const actDate = ref("");
const showCalender = ref(false);

const priceDateList = reactive([
  { date: "2024-09-01", sellingPrice: "99", discount: "折" },
  { date: "2024-09-02", sellingPrice: "99" },
  { date: "2024-09-03", sellingPrice: "99" },
  { date: "2024-09-04", sellingPrice: "100" },
]);

const selectDate = (date: string) => {
  console.log(date);
};

const closeCalender = () => {
  showCalender.value = false;
};
</script>

<style lang="scss" scoped></style>
