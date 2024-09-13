<!--
 * @Author: 马文龙 214170716@qq.com
 * @Date: 2024-09-11 14:39:25
 * @LastEditors: 马文龙 214170716@qq.com
 * @LastEditTime: 2024-09-11 15:12:43
 * @FilePath: \uni-frame\src\components\Tabs\index.vue
 * @Description: 头部标签组件
-->

<template>
  <view class="tab" :style="tabStyle">
    <view
      v-for="(tab, index) in tabs"
      :key="index"
      class="tab-item"
      :style="getTabItemStyle(index)"
      @click="selectTab(index)"
    >
      {{ tab.label }}
    </view>
  </view>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
export default defineComponent({
  name: "Tab",
  props: {
    tabs: {
      type: Array,
      required: true,
    },
    fontSize: {
      type: String,
      default: "32rpx",
    },
    tabWidth: {
      type: String,
      default: "auto",
    },
    backgroundColor: {
      type: String,
      default: "transparent",
    },
    fontColor: {
      type: String,
      default: "#323232",
    },
    selectedFontColor: {
      type: String,
      default: "#ffffff",
    },
    selectedBlockStyle: {
      type: Object,
      default() {
        return {
          background: "linear-gradient(90deg, #FF6633, #FF9B28)",
          borderRadius: "34rpx",
          fontWeight: "bold",
        };
      },
    },
    transitionDuration: {
      type: Number,
      default: 500,
    },
    throttleDelay: {
      type: Number,
      default: 200,
    },
    active: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { emit }) {
    const activeTab = ref(0);
    const isScrolling = ref(false);
    const selectTab = (index: number) => {
      if (isScrolling.value) return;
      activeTab.value = index;
      emit("tabSelected", index);
    };
    const getTabItemStyle = (index: number) => {
      let data = {
        width: props.tabWidth,
        fontSize: props.fontSize,
        color: index === activeTab.value ? props.selectedFontColor : props.fontColor,
        ...(index === activeTab.value && props.selectedBlockStyle),
      };
      return data;
    };
    const tabStyle = {
      backgroundColor: props.backgroundColor,
    };
    watch(
      () => props.active,
      () => {
        activeTab.value = props.active;
        isScrolling.value = true;
        getTabItemStyle(activeTab.value);
        setTimeout(() => {
          isScrolling.value = false;
        }, props.transitionDuration);
      },
      { immediate: true }
    );
    return {
      activeTab,
      selectTab,
      getTabItemStyle,
      tabStyle,
    };
  },
});
</script>
<style scoped>
.tab {
  display: flex;
  justify-content: space-between;
  overflow-x: scroll;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  background: #fdece79c !important ;
  border-radius: 54rpx;
  height: 64rpx;
}
.tab-item {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0 30rpx;
}
</style>
