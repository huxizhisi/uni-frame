<!--
 * @Author: 马文龙 214170716@qq.com
 * @Date: 2024-09-11 14:39:25
 * @LastEditors: 马文龙 214170716@qq.com
 * @LastEditTime: 2024-09-11 15:12:59
 * @FilePath: \uni-frame\src\components\TextHidden\index.vue
 * @Description: 文字超出隐藏组件
-->

<template>
  <view class="text-view" :style="{ fontSize: fontSize + 'rpx' }">
    <view class="text" :style="{ maxHeight: textStyle.maxHeightStyle }">
      <view class="seat" :style="{ height: textStyle.seatHeight || '3rem' }"></view>

      <!-- style="position: relative; float: right; clear: both; line-height: 1"
        :style="{ top: isFirst ? '0' : '-4rpx' }" -->
      <view class="is-show fz-14" v-show="isShow && !showall" @click.stop="showClick(showall)">
        <text>..展开</text>
        <u-icon name="arrow-down" color="#181818" size="24"></u-icon>
      </view>

      <!-- <u-image
        width="60rpx"
        mode="widthFix"
        src="@/static/images/detail/selling.jpg"
        style="display: inline-flex; position: relative; vertical-align: middle"
      ></u-image> -->
      <view
        class="fz-12 white-color fb u-row-center radius2"
        style="width: 66rpx; height: 32rpx; background: #ff6633; display: inline-flex"
      >
        卖点
      </view>
      {{ content }}
      <view class="is-hidden" v-show="isShow && showall" @click.stop="showClick(showall)">
        收起 <u-icon name="arrow-up" color="#181818" size="24"></u-icon>
      </view>
    </view>
    <view class="hidden-info">{{ content }}</view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, getCurrentInstance, watch, nextTick } from "vue";
const showall = ref(false); //用来判断是否超出规定行数
const isShow = ref(false);
const isFirst = ref(false);
const instance = getCurrentInstance();
type Props = {
  isHidden: boolean; //控制展开和收起
  content: string; //内容
  lineClamp: number; //多少行显示展开按钮
  fontSize: number; //字号大小
};
const prop = withDefaults(defineProps<Props>(), {
  isHidden: true,
  content: "",
  lineClamp: 2,
  fontSize: 24, //单位：rpx
});

// watch(
//   () => prop.content,
//   (v) => {
//     if (v) {
//       setIsShow();
//     }
//   },
//   { immediate: true }
// );

onMounted(() => {
  setTimeout(() => {
    setIsShow();
  }, 1000);
});

const setIsShow = () => {
  if (!prop.isHidden) {
    return;
  }
  let textHeight: number | undefined = 0;
  // 获取所有文本在html中的高度
  let query = uni.createSelectorQuery().in(instance);
  query
    .select(".hidden-info")
    .boundingClientRect((data) => {
      textHeight = Number(data?.height);
      //行数 = 文本高度 / 行高；
      let lineNum = textHeight / rpxToPx(prop.fontSize);
      console.log(lineNum, "lineNum", textHeight, "textHeight", rpxToPx(prop.fontSize), "rpxToPx(prop.fontSize)");
      isShow.value = lineNum >= prop.lineClamp + 1.2 ? true : false;
      isFirst.value = isShow.value;
      let height = 1.43 * prop.lineClamp;
      textStyle.value.seatHeight = `${showall.value || !prop.isHidden ? "none" : height - 1.29 + "em"}`;
    })
    .exec();
};

const rpxToPx = (rpx: number) => {
  let deviceWidth = uni.getSystemInfoSync().windowWidth; //获取设备屏幕宽度
  let px = (deviceWidth / 750) * Number(rpx);
  return Math.floor(px);
};

const textStyle = computed<any>(() => {
  //   let height = 1.43 * prop.lineClamp;
  //   let style = `${showall.value || !prop.isHidden ? "none" : height + "em"}`;
  let height = 38 * prop.lineClamp;
  let style = `${showall.value || !prop.isHidden ? "none" : height + "rpx"}`;
  let seatHeight = "";
  let styleObj = {
    maxHeightStyle: style,
    seatHeight,
  };
  return styleObj;
});

const showClick = (isShowall: boolean) => {
  isFirst.value = false;
  showall.value = !isShowall;
};
</script>

<style lang="scss" scoped>
.text-view {
  display: flex;
  overflow: hidden;
  width: 100%;
  position: relative;
  line-height: 38rpx;
  white-space: unset !important;

  .text {
    position: relative;
    overflow: hidden;
    text-align: justify;
    text-overflow: ellipsis;
    word-break: break-all;
    // transition: 0.3s max-height;
  }

  .hidden-info {
    width: 100%;
    position: absolute;
    opacity: 0;
  }

  .is-hidden {
    position: relative;
    float: right;
    color: $main-font-color;
    z-index: 99;
  }

  .is-show {
    position: absolute;
    color: $main-font-color;
    right: 0;
    // #ifdef MP-WEIXIN
    bottom: 4rpx;
    /* #endif */
    // #ifndef MP-WEIXIN
    bottom: 0;
    /* #endif */
    z-index: 99;
    clear: both;
    background: linear-gradient(270deg, #ffffff 77.45%, rgba(255, 255, 255, 0.38) 88.24%);
    padding-left: 16rpx;
  }
  .seat {
    float: right;
  }
}
</style>
