<!--
 * @Author: 马文龙 214170716@qq.com
 * @Date: 2024-09-11 14:39:25
 * @LastEditors: 马文龙 214170716@qq.com
 * @LastEditTime: 2024-09-13 16:33:00
 * @FilePath: \uni-frame\src\template\example\components\DatePicker.vue
 * @Description: 时间选择器组件实例
-->

<template>
  <view>
    <view class="fz-14 main-font-color mgb-10 fb">时间选择器组件</view>
    <view class="fz-12 second-font-color" @tap="showDateStyler = true">点击展示弹窗</view>
    <DatePicker
      :value="dateInitValue"
      :visible="showDateStyler"
      :model="dateModel"
      :yearsArr="yearsArr"
      @cancel="handCancel"
      @confirm="handConfirm"
    ></DatePicker>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import DatePicker from "@/components/DatePicker/index.vue";

const dateInitValue = ref<string | number | Date>(""); /** 当前选择时间 */
const showDateStyler = ref(false); /** 打开选择日期弹窗 */
const dateModel = ref(["year", "month", "day"]); /** 时间格式 */
const yearsArr = ref([1900, 2070]); /** 年数范围 */

// 取消选择回调
const handCancel = (): void => {
  showDateStyler.value = false;
  console.log("取消===>");
};

const handConfirm = (e: string | number | Date): void => {
  showDateStyler.value = false;
  console.log("回调时间===>", e);
};
</script>

<style lang="scss" scoped></style>
