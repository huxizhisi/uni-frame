<!--
 * @Author: 马文龙 214170716@qq.com
 * @Date: 2024-09-11 14:39:25
 * @LastEditors: 马文龙 214170716@qq.com
 * @LastEditTime: 2024-09-13 17:01:02
 * @FilePath: \uni-frame\src\template\example\components\StepperCom.vue
 * @Description: 步进器组件实例
-->

<template>
  <view style="width: 40vw">
    <view class="fz-14 main-font-color mgb-10 fb">步进器组件</view>
    <Stepper
      v-model="quantity"
      shape="text"
      :min="1"
      :integer="true"
      :readonly="true"
      :asyncChange="true"
      @change="changeStepper"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Stepper from "@/components/Stepper/index.vue";

const quantity = ref(1);

const changeStepper = ({ value, type }: any) => {
  console.log(value, type);
  quantity.value = value;
};
</script>

<style lang="scss" scoped></style>
