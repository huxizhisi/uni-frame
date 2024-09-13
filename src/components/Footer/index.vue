<!--
 * @Author: 马文龙 214170716@qq.com
 * @Date: 2024-09-11 14:39:25
 * @LastEditors: 马文龙 214170716@qq.com
 * @LastEditTime: 2024-09-11 15:11:34
 * @FilePath: \uni-frame\src\components\Footer\index.vue
 * @Description: 底部通用
-->

<template>
  <view class="user-footer u-flex" :style="{ height: hei }">
    <view
      v-for="(item, index) in footerList"
      :key="index"
      class="footer-box u-flex u-row-center fz-14 radius8"
      :class="[
        footerList.length > 1 ? 'footer-btn-more ' : 'footer-btn-one',
        item.type === 'cancel' ? 'cancel-box' : 'submit-box',
      ]"
      @tap="tapBtn(item.type)"
    >
      {{ item.name }}
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed, PropType, ref } from "vue";
interface buttonList {
  name: string;
  type: string;
}

const props = defineProps({
  /** 价格总数 */
  button: {
    type: Array as PropType<buttonList[]>,
    default: (): buttonList[] => [],
  },
  height: {
    type: String,
    default: "180rpx",
  },
});
const hei = ref(props.height);

const emit = defineEmits(["submit", "cancel"]);

const footerList = computed(() => {
  return props.button;
});
const tapBtn = (type: string) => {
  if (type === "cancel") {
    emit("cancel");
  } else {
    emit("submit", type);
  }
};
</script>

<style lang="scss" scoped>
.user-footer {
  position: fixed;
  width: 100%;
  bottom: 0;
  background: $white-color;
  box-shadow: 0px -4rpx 24rpx 0px #dddddd6b;
  padding: 16rpx 48rpx 0;
  z-index: 99;
  .footer-box {
    flex: 1;
    height: 80rpx;
  }
  .submit-box {
    width: 100%;
    background: linear-gradient(90deg, #ff4c10 11.79%, #ff6633 43.58%, #ff800b 101.54%);
    color: $white-color;
  }
  .cancel-box {
    width: 100%;
    color: $base-color;
    background: $white-color;
    border: 2rpx solid #ff6633;
  }
  .footer-btn-more {
    &:first-child {
      margin-right: 30rpx;
    }
    .footer-submit {
      background: $base-color;
      color: $white-color;
    }
  }
}
</style>
