<template>
  <view class="tab-list u-flex pd-15">
    <view class="model-box" :style="{ height: options && options.length ? '100%' : 'auto' }"> </view>
    <view
      class="tab u-flex u-row-center fz-12"
      v-for="(item, index) in options"
      :key="index"
      :class="[{ active: selectedTab == item.key }, `line${num}`]"
      :style="getTabItemStyle(index)"
      @click="toggleTab(item.key)"
    >
      {{ item.value }}
      <u-image
        class="act-image"
        width="22rpx"
        height="22rpx"
        src="@/static/images/home/select.png"
        v-show="selectedTab == item.key"
      ></u-image>
    </view>
  </view>
</template>
<script lang="ts">
import { defineComponent, ref, watch, computed } from "vue";
interface Option {
  key: string;
  value: string;
}
export default defineComponent({
  name: "MultiSelect",
  props: {
    optionList: {
      type: Array as () => Option[],
      required: true,
    },
    lableNum: {
      type: [String, Number],
      default: 2,
    },
    newVal: {
      type: String,
    },
  },
  emits: ["selected"],
  setup(props, { emit }) {
    const selectedTab = ref<string>();
    function toggleTab(key: string) {
      if (selectedTab.value == key) {
        selectedTab.value = "";
      } else {
        selectedTab.value = key;
      }

      console.log(key, selectedTab.value);

      emit("selected", selectedTab.value);
    }
    const getTabItemStyle = (index: number) => {
      let data = {
        width: `calc((100% - (${Number(props.lableNum) - 1} * 16rpx)) / ${Number(props.lableNum)})`,
      };
      return data;
    };
    watch(
      () => props.newVal,
      (v) => {
        selectedTab.value = v || "";
      },
      { immediate: true }
    );
    const options = computed(() => {
      return props.optionList;
    });
    const num = computed(() => {
      return props.lableNum;
    });
    return {
      selectedTab,
      options,
      num,
      getTabItemStyle,
      toggleTab,
    };
  },
});
</script>
<style lang="scss" scoped>
.tab-list {
  flex-wrap: wrap;
  position: relative;
  max-height: 20vh;
  overflow-x: hidden;
}

.model-box {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.tab {
  position: relative;
  z-index: 2;
  border-radius: 8rpx;
  background: #fcfbfb;
  height: 64rpx;
  margin-bottom: 16rpx;
  margin-right: 16rpx;
  color: $second-font-color;
  overflow: hidden;
  &.line2 {
    &:nth-child(2n + 1) {
      margin-right: 0;
    }
  }
  &.line3 {
    &:nth-child(3n + 1) {
      margin-right: 0;
    }
  }
  &.line4 {
    &:nth-child(4n + 1) {
      margin-right: 0;
    }
  }
}
.active {
  background-color: #ff663314;
  color: #ff6633;
  position: relative;
  .act-image {
    position: absolute;
    right: 0;
    bottom: 0;
  }
}
</style>
