<!--
 * @Author: 马文龙 214170716@qq.com
 * @Date: 2024-09-11 14:39:25
 * @LastEditors: 马文龙 214170716@qq.com
 * @LastEditTime: 2024-09-11 15:12:35
 * @FilePath: \uni-frame\src\components\SwiperTabs\tabs.vue
 * @Description: tabs列表
-->

<template>
  <view :class="fixType ? 'top-fix' : ''" style="width: 100%" :style="{ paddingTop: fixType ? fixHei + 'px' : 0 }">
    <scroll-view scroll-x="true" :show-scrollbar="false" scroll-with-animation="true" style="white-space: nowrap">
      <view
        class="com-tabs-item mgr-8"
        v-for="(item, index) in tabs"
        :key="index"
        @tap="changeTab(item.key)"
        :class="[
          current == item.key ? 'com-tabs-item-act' : '',
          props.type == 'box' ? 'com-tabs-item-box' : 'com-tabs-item-line',
        ]"
      >
        {{ item.value }}
        <view v-if="props.type == 'line'" class="com-tabs-item-act-line"> </view>
      </view>
    </scroll-view>
  </view>
</template>

<script lang="ts" setup>
import { PropType, computed } from "vue";
import { listTab } from "@/enums/list";

const props = defineProps({
  tabs: {
    type: Array as PropType<listTab[]>,
    default: () => [],
  },
  type: {
    type: String,
    default: "box",
  },
  currentTab: {
    type: [Number, String],
    default: 0,
  },
  fixType: {
    type: Boolean,
    default: false,
  },
  topData: {
    type: Number,
    default: 0,
  },
});

const tabs = computed(() => {
  return props.tabs;
});

const current = computed(() => {
  return props.currentTab;
});

const fixHei = computed(() => {
  //   return props.topData - uni.upx2px(uni.getWindowInfo().statusBarHeight);
  return props.topData;
});

const emits = defineEmits(["changeCurrent"]);
const changeTab = (index: number) => {
  emits("changeCurrent", index);
};
</script>

<style lang="scss" scoped>
.com {
  width: 100%;
  &-tabs {
    width: 100%;
    &-item {
      display: inline-flex;
      align-items: center;
      padding: 0 16rpx;
      height: 60rpx;
      &-box {
        // border: 2rpx solid $seems-font-color;
        position: relative;
        &::before {
          position: absolute;
          bottom: 0;
          z-index: 1;
          width: 200%;
          height: 200%;
          content: "";
          display: block;
          border: 2rpx solid #ddd;
          border-radius: 16rpx;
          transform: scale(0.5);
          transform-origin: left bottom;
          left: 0;
        }
      }
      &-line {
        height: 60rpx;
        color: $second-font-color;
        position: relative;

        margin-right: 16rpx;
        font-size: 28rpx;

        &::before {
          position: absolute;
          bottom: 0;
          z-index: 1;
          width: 200%;
          height: 200%;
          content: "";
          display: block;
          border: 2rpx solid #999;
          border-radius: 16rpx;
          transform: scale(0.5);
          transform-origin: left bottom;
          left: 0;
        }
      }
      &-act {
        position: relative;
        color: $base-color;
        font-weight: bold;
        &::before {
          position: absolute;
          bottom: 0;
          z-index: 1;
          width: 200%;
          height: 200%;
          content: "";
          display: block;
          border: 1rpx solid $base-color;
          border-radius: 16rpx;
          transform: scale(0.5);
          transform-origin: left bottom;
          left: 0;
        }
      }
    }
  }
}
.com-tabs-item-act {
  &.com-tabs-item-line {
    position: relative;
    color: $base-color;
    &::before {
      position: absolute;
      bottom: 0;
      z-index: 1;
      width: 200%;
      height: 200%;
      content: "";
      display: block;
      border: 1rpx solid $base-color;
      border-radius: 16rpx;
      transform: scale(0.5);
      transform-origin: left bottom;
      left: 0;
    }
  }
}
.top-fix {
  position: fixed;
  width: 100%;
  //   top: calc(var(--status-bar-height));
  top: 0;
  left: 0;
  background: #fff;
  padding-top: 30rpx;
  padding-left: 30rpx;
  z-index: 999;
  padding-bottom: 20rpx;
}
</style>
