<template>
  <view class="navBar">
    <u-navbar :is-back="goBack" :title="title" :immersive="true" @custom-back="isBack()">
      <view class="logo" v-if="logo">
        <image src="@/static/logo.png"></image>
      </view>
      <view class="slot-img">
        <view class="rightSearch" v-if="searchShow">
          <u-search
            :placeholder="placeHolderText"
            v-model="searchVal"
            :clearabled="true"
            @search="emits('send', searchVal)"
            @custom="emits('send', searchVal)"
          ></u-search>
        </view>
      </view>
    </u-navbar>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "uni-mini-router";

/* 头部导航栏内 若调用搜索框则 logo 与 返回键必须有一个为true 否则导致宽度塌陷
 * 若调用搜索框为true则需要绑定searchVal
 * 如首页tabbar内不需要返回的页面则显示logo 需要返回的则显示goBack
 * 如详情页等则显示goBack及Title
 */

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  goBack: {
    type: Boolean,
    default: true,
  },
  logo: {
    type: Boolean,
    default: false,
  },
  searchShow: {
    type: Boolean,
    default: true,
  },
  placeHolderText: {
    type: String,
    default: "",
  },
});

const title = computed(() => {
  return props.title;
});
const goBack = computed(() => {
  return props.goBack;
});
const logo = computed(() => {
  return props.logo;
});
const searchShow = computed(() => {
  return props.searchShow;
});
const placeHolderText = computed(() => {
  return props.placeHolderText;
});

const searchVal = ref<String>("");

const emits = defineEmits(["send"]);

// 返回方法
const router = useRouter();
const isBack = () => {
  router.back();
};
</script>

<style scoped>
.navBar {
  margin-bottom: 120rpx;
  padding-bottom: 60rpx;
}
.slot-wrap {
  /* display: flex; */
  align-items: center;
  /* 如果您想让slot内容占满整个导航栏的宽度 */
  /* flex: 1; */
  /* 如果您想让slot内容与导航栏左右有空隙 */
  /* padding: 0 30rpx; */
}
.rightSearch {
  text-align: center;
  text-align: right;
  padding: 0 40rpx;
}
/deep/.u-content {
  width: 400rpx;
}
.logo {
  padding: 0 30rpx;
}
.logo image {
  width: 60rpx;
  height: 60rpx;
  vertical-align: middle;
}
</style>
