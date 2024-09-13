<!--
 * @Author: 马文龙 214170716@qq.com
 * @Date: 2024-09-11 14:39:25
 * @LastEditors: 马文龙 214170716@qq.com
 * @LastEditTime: 2024-09-13 17:03:20
 * @FilePath: \uni-frame\src\template\example\components\RatingCom.vue
 * @Description: 评分组件实例
-->

<template>
  <view>
    <view class="fz-14 main-font-color mgb-10 fb">评分组件</view>

    <Rating type="star" :readonly="true" size="20" :touchable="true" v-model="score" />
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Rating from "@/components/Rating/index.vue";

const score = ref(1);
</script>

<style lang="scss" scoped></style>
