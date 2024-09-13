<template>
  <view class="nav" id="nav">
    <!-- 撑开高度 -->
    <view
      class="nv_padding"
      v-if="!!mysNavConfig.navPadding"
      :style="{
        height: navBarHeight,
      }"
    ></view>
    <!-- 背景层 -->
    <view
      class="bg_box"
      :style="{
        backgroundColor: mysNavConfig.bgColor,
        backgroundImage: mysNavConfig.bgImage,
        paddingTop: navBarTop,
        height: navBarHeight,
        opacity: opacity,
      }"
      :class="{ fixed: mysNavConfig.navFixed, customerShadow: mysNavConfig.customerShadow }"
    ></view>
    <view
      class="mys_navBar"
      :style="{
        paddingTop: navBarTop,
        height: navBarHeight,
        paddingRight: navBarRight,
      }"
      :class="{ fixed: mysNavConfig.navFixed }"
    >
      <!-- 左侧单图标 + text 用于返回home和back -->
      <view class="my_left_box u-flex-1" :style="{ height: btnHeight }" style="flex: 0.5">
        <view
          class="my_left_icon"
          @tap="onLeftHome"
          :style="{ height: btnHeight, paddingLeft: navBarLeft }"
          v-if="isHome && route !== '/pages/index/index'"
        >
          <u-icon name="home" size="28"></u-icon>
        </view>
        <!-- 这里单独区分btn是否是带透明套 -->
        <view
          class="my_left_icon"
          @tap="onLeftClick"
          v-if="mysNavConfig.leftTrans && mysNavConfig.btnType !== 'type2' && !isHome && route !== '/pages/index/index'"
          :style="{ height: btnHeight, paddingLeft: navBarLeft }"
        >
          <image
            id="leftIcon"
            style="width: 2rem"
            mode="widthFix"
            name="leftIcon"
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzMiIHZpZXdCb3g9IjAgMCAzMiAzMyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB5PSIuMDE4IiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHJ4PSIxNiIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIuNCIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjAgMjMuMDE4bC0uOTMgMS02LjgwMy03LjMyYTEgMSAwIDAgMSAwLTEuMzZsNi44MDMtNy4zMi45MyAxLTYuNTA3IDcgNi41MDcgN3oiIGZpbGw9IiNmZmYiLz48L3N2Zz4="
          />
          <!-- <u-image src="@/static/images/detail/back-circle.png" width="2rem" mode="widthFix" /> -->
          <view
            class="leftText"
            :style="{ height: btnHeight }"
            v-if="!!mysNavConfig.leftText && mysNavConfig.btnType !== 'type2'"
          >
            <text
              :style="{
                color: mysNavConfig.leftText.color,
                fontSize: mysNavConfig.leftText.fontSize,
                fontWeight: mysNavConfig.leftText.fontWeight,
              }"
            >
              {{ mysNavConfig.leftText.text }}
            </text>
          </view>
        </view>
        <view
          class="my_left_icon"
          v-if="!mysNavConfig.leftTrans && mysNavConfig.btnType !== 'type2' && !isHome && !isRouteExcluded"
          :style="{ height: btnHeight, paddingLeft: navBarLeft }"
        >
          <view
            class="u-flex u-row-center u-col-center radius16 pd-12"
            style="border: 2rpx solid #d1d1d1; height: 60rpx"
          >
            <image
              @tap="onLeftClick"
              id="leftIcon"
              style="width: 26rpx; transform: rotate(90deg)"
              mode="widthFix"
              name="leftIcon"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMC4wMTgiIGhlaWdodD0iMzAuMDE4IiB2aWV3Qm94PSIwIDAgMzAuMDE4IDMwLjAxOCI+PHBhdGggZD0iTTI3LjE5IDE1LjA0NUwxNS4wNDQgMjcuMTg5IDIuODI4IDE0Ljk3MyIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS13aWR0aD0iNCIvPjwvc3ZnPg=="
            />
            <view style="width: 2rpx; background: #d1d1d1; height: 32rpx" class="mg-4"></view>
            <image
              @tap="onLeftHome"
              id="homeFill"
              style="width: 34rpx"
              mode="widthFix"
              name="leftIcon"
              class="mgl-6"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1OC44MTMiIGhlaWdodD0iNTkuMzA4IiB2aWV3Qm94PSIwIDAgNTguODEzIDU5LjMwOCI+PHBhdGggZD0iTTI4Ljk4Ni4wMTdjMS4zIDAgMS4yODgtLjMgMy40MTMgMS42NjFhNjIyNzkuODMgNjIyNzkuODMgMCAwIDEgMjUuMDc0IDIzLjIgMy40NDIgMy40NDIgMCAwIDEgMS4wNDYgMS4yOTUgMi44ODggMi44ODggMCAwIDEgLjI5MyAxLjY4djMwLjI3MWMwIC41MzcuMDIxLjYzNC0uMjI0LjkyNWEuOTc0Ljk3NCAwIDAgMS0uNzUyLjI0aC0xOS43YTEuOTgzIDEuOTgzIDAgMCAxLTEuNDY1LS4zNiAxLjUxOCAxLjUxOCAwIDAgMS0uNDA2LTEuMTJsLS4wMi0yMy4wOTJhMS4zNzkgMS4zNzkgMCAwIDAtLjI1NS0xLjA0M2MtLjM1Ny0uMzQtLjQ3Mi0uMzE0LTEuMTc3LS4zMTRIMjQuMjNjLS43NSAwLS44NC4wMjQtMS4yMjUuMzY0YTEuMjkyIDEuMjkyIDAgMCAwLS4zMTQuOTkzdjIyLjQzNWEyLjg2MiAyLjg2MiAwIDAgMS0uMzE5IDEuNzA3IDEuODc5IDEuODc5IDAgMCAxLTEuNDQxLjQzMWgtMTguN3MtMS40LjEwNi0xLjgtLjI1NmMtLjUzMy0uMzA4LS40MjUtMS43LS40MjUtMS43VjI5LjA1NWMwLTMuMjU3LS4wMTYtMi45MiAxLjY3LTQuNDY4bDYuMTUyLTUuNjUyIDE4Ljc0LTE3LjI1N1MyOC4wNDYuMDE3IDI4Ljk4Ni4wMTd6Ii8+PC9zdmc+"
            />
            <!-- <u-icon name="arrow-left" size="40" :color="mysNavConfig.leftColor"></u-icon> -->
          </view>

          <!-- <u-image src="@/static/images/detail/back-circle.png" width="2rem" mode="widthFix" /> -->
          <view
            class="leftText"
            :style="{ height: btnHeight }"
            v-if="!!mysNavConfig.leftText && mysNavConfig.btnType !== 'type2'"
          >
            <text
              :style="{
                color: mysNavConfig.leftText.color,
                fontSize: mysNavConfig.leftText.fontSize,
                fontWeight: mysNavConfig.leftText.fontWeight,
              }"
            >
              {{ mysNavConfig.leftText.text }}
            </text>
          </view>
        </view>
      </view>
      <!-- 左slot -->
      <view class="my_left_custom" :style="{ height: btnHeight }">
        <slot name="left"></slot>
      </view>

      <view class="btn_type" :style="{ height: btnHeight }">
        <view
          class="btn_box nav_btn_t1"
          :style="{
            width: btnWidth,
            height: btnHeight,
            marginLeft: navBarLeft,
            borderRadius: mysNavConfig.type2Config.radius,
          }"
          v-if="mysNavConfig.btnType == 'type2' && !isHome"
        >
          <view class="btn_back" @tap="onLeftClick">
            <u-icon :name="mysNavConfig.type2Config.leftPath" :size="mysNavConfig.type2Config.leftSize"></u-icon>
          </view>
          <view class="line"></view>
          <view class="btn_home" @tap="onLeftHome">
            <u-icon :name="mysNavConfig.type2Config.rightPath" :size="mysNavConfig.type2Config.rightSize"></u-icon>
          </view>
        </view>

        <!-- 中间slot -->
        <view class="my_custom_box" :style="{ height: btnHeight }">
          <!-- 搜索框 -->
          <view
            class="nv_search_box"
            v-if="!!mysNavConfig.searchConfig.show"
            :style="{
              height: inputHeight,
              backgroundColor: mysNavConfig.searchConfig.bgColor,
              marginRight: mysNavConfig.searchConfig.marginRight,
              marginLeft: mysNavConfig.searchConfig.marginLeft,
            }"
          >
            <u-icon name="search" size="28"></u-icon>
            <u-input
              type="text"
              v-model="inputValue"
              :placeholder="mysNavConfig.searchConfig.placeholder"
              :disabled="mysNavConfig.searchConfig.disabled"
              @tap="clickInput"
              @input="changeInput"
              @confirm="submitInput"
              @confirm-type="mysNavConfig.searchConfig.ctype || 'search'"
              :placeholder-style="mysNavConfig.searchConfig.placeholderStyle || ''"
              class="nv_input"
            />
            <view class="close" @tap="clearInput" :style="{ height: inputHeight }">
              <u-icon v-show="inputValue !== ''" name="close-circle" size="28"></u-icon>
            </view>
          </view>
          <slot name="center1"> 默认展示 </slot>
        </view>
      </view>

      <!-- 标题 -->
      <view class="title_container" v-if="!mysNavConfig.searchConfig" :style="{ top: navBarTop, height: btnHeight }">
        <text
          class="title_text"
          v-if="!!mysNavConfig.navTitle"
          :style="{
            color: mysNavConfig.navTitle.color,
            fontSize: mysNavConfig.navTitle.fontSize,
            fontWeight: mysNavConfig.navTitle.fontWeight,
          }"
        >
          {{ mysNavConfig.navTitle.text }}</text
        >
        <slot name="center2"></slot>
      </view>

      <!-- 右边slot -->
      <view class="my_right_icon" :style="{ height: btnHeight }" v-if="mysNavConfig.rightIconPath">
        <image @tap="onRightClick" class="nv_icon" :src="mysNavConfig.rightIconPath" />
        <slot name="right"></slot>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
/* 默认首页路径 */
import { computed, watch, ref, onBeforeMount } from "vue";
import { useGlobalStore } from "@/store/modules/globalStore";
import { useRouter } from "uni-mini-router";
const globalStore = useGlobalStore();

const props = defineProps({
  mysNavConfig: {
    type: Object,
    default() {
      return {
        /* 固定导航 */
        navFixed: true,
        /* 开启单页显示首页图标 */
        isHome: true,
        /* 占位开启 */
        navPadding: true,
        /* 背景 */
        bgColor: "#fff",
        /** 底部阴影 */
        customerShadow: false,
        /* 渐变色 */
        opacity: 1,
        /* 渐变开启 */
        isOpacity: false,
        /* 渐变延时效果 */
        opacityTime: 100,
        /* 左侧按钮样式 可选 type1 type2 （type2根据小程序胶囊位置调整） */
        btnType: "type1",
        /** 左侧按钮是否要隐形套 */
        leftTrans: true,
        /** 左侧按钮颜色 */
        leftColor: "#000",
        /* type1 左侧文字配置 */
        leftText: {
          text: "",
          color: "",
          fontSize: "16px", // px upx rpx
          fontWeight: "", // blod
        },
        /* 标题 */
        navTitle: {
          text: "",
          color: "",
          fontSize: "", // px upx rpx
          fontWeight: "", // blod
        },
        /* type2 按钮 */
        type2Config: {
          // 左图标
          leftPath: "search",
          // 右图标
          rightPath: "setting",
          leftSize: "28",
          rightSize: "28",
          // 圆角
          radius: "40rpx",
        },
        /* 搜索框配置 */
        searchConfig: {
          show: false,
          //   value: "",
          //   confirmType: "search",
          //   placeholder: "",
          //   disabled: false,
          //   placeholderStyle: "",
          //   marginRight: "",
          //   marginLeft: "",
        },
        /* 自定义事件开启 */
        isCustomFn: false,
        /* 定义左侧图标 （大小是固定的16px ,想改变大小通过 slot 或 css  ） */
        // leftIconPath: "/static/back_b.png",
        /* 定义右侧图标 */
        // rightIconPath: "/static/home.png",
      };
    },
  },
  scrollTop: {
    type: Number,
    default: function () {
      return 0;
    },
  },
});

const iconW = ref();
const iconH = ref();
const btnWidth = ref();
const btnHeight = ref();
const navBarTop = ref();
const navBarHeight = ref();
const navBarLeft = ref();
const navBarRight = ref();
const inputHeight = ref();
const opacity = ref(0);
const isHome = ref(false);
const route = ref("/pages/index/index");
const inputValue = ref("");
const emits = defineEmits([
  "onLeftClick",
  "onRightClick",
  "changeInput",
  "submitInput",
  "clearInput",
  "clickInput",
  "initHeight",
]);
const router = useRouter();

watch(
  () => props.scrollTop,
  () => {
    if (props.mysNavConfig.isOpacity) {
      return;
    }
    setOpacity(props.scrollTop, props.mysNavConfig.opacityTime);
  }
);

watch(
  () => props.mysNavConfig.searchConfig.value,
  () => {
    if (props.mysNavConfig.searchConfig.value) {
      return;
    }
  }
);

watch(
  () => props.mysNavConfig.searchConfig.value,
  () => {
    if (props.mysNavConfig.searchConfig.value) {
      inputValue.value = props.mysNavConfig.searchConfig.value;
    }
  }
);

const mysNavConfig = computed(() => {
  return props.mysNavConfig;
});

const init = () => {
  route.value = router.route.value?.path;
  console.log(router.route.value, "router");
  if (mysNavConfig.value.isHome) {
    let pages = getCurrentPages().length;
    /* 单页显示home图标 */
    pages == 1 ? (isHome.value = true) : (isHome.value = false);
  }
  // 开启渐变 强制fixed
  navBarTop.value = uni.getSystemInfoSync().statusBarHeight + "px";
  if (mysNavConfig.value.opacity) {
    opacity.value = 1;
    !mysNavConfig.value.isOpacity ? (opacity.value = 1) : ((mysNavConfig.value.navFixed = true), (opacity.value = 0));
  } else {
    opacity.value = mysNavConfig.value.opacity;
    !mysNavConfig.value.isOpacity ? "" : ((mysNavConfig.value.navFixed = true), (opacity.value = 0));
  }

  // #ifdef MP
  initMP();
  // #endif
  // #ifdef APP-PLUS-NVUE
  navBarHeight.value = 44 + (uni.getSystemInfoSync()?.statusBarHeight || 0) + "px";
  // #endif
};

/* 小程序初始化位置 */
const initMP = () => {
  let gS = uni.getSystemInfoSync();
  let rect = uni.getMenuButtonBoundingClientRect();

  let rectHeight = rect.height;
  btnWidth.value = rect.width + "px";
  iconW.value = Math.floor(rect.width / 4 - 5) + "px";
  iconH.value = rectHeight / 2 + "px";
  btnHeight.value = rectHeight + "px";
  inputHeight.value = rectHeight - 3 + "px";
  navBarTop.value = rect.top + "px";
  navBarLeft.value = gS.screenWidth - rect.right + "px";
  navBarRight.value = gS.screenWidth - rect.right + rect.width + "px";
  const navHei = (gS.statusBarHeight || 0) + rectHeight + (rect.top - (gS.statusBarHeight || 0)) * 2;
  navBarHeight.value = navHei + "px";
  emits("initHeight", navHei);
};

// 定义忽略路由白名单
const excludedRoutes = ["/pages/index/index", "/pages/category/index", "/pages/owner/index", "/pages/bag/index"];
const isRouteExcluded = computed(() => excludedRoutes.includes(route.value));

/* 点击左侧 */
const onLeftClick = () => {
  if (mysNavConfig.value.isCustomFn) {
    emits("onLeftClick");
  } else {
    console.log("back");
    uni.navigateBack();
  }
};

/* type2 返回首页 */
const onLeftHome = () => {
  router.push("/pages/index/index");
};

/* 点击右侧 */
const onRightClick = () => {
  uni.showToast({
    title: "onRightClick",
    duration: 1000,
  });
  emits("onRightClick");
};

/**
 * @param scrollTop 页面顶部距离
 * @param down 滑动显示效果延时
 */
const setOpacity = (scrollTop: number, down = 60) => {
  if (scrollTop > 0) {
    if (scrollTop < down) {
      opacity.value = scrollTop / down;
    }
    if (scrollTop > down) {
      opacity.value = 1;
    }
  } else {
    opacity.value = 0;
  }
};

/* 搜索框改变值 */
const changeInput = (e: any) => {
  inputValue.value = e;
  emits("changeInput", e);
};

/* 搜索框提交 */
const submitInput = (e: any) => {
  emits("submitInput", e);
};

/* 清空搜索 */
const clearInput = () => {
  inputValue.value = "";
  emits("clearInput");
};

/* 禁用状态下点击搜索框 */
const clickInput = () => {
  emits("clickInput");
};

onBeforeMount(() => {
  init();
});
</script>

<style lang="scss" scoped>
.nav {
  position: relative;
}
.nv_padding {
  height: 88upx;
  background-color: transparent;
}
/* 图标默认大小 */
.nv_icon {
  width: 16px;
  height: 16px;
}
.bg_box {
  position: absolute;
  width: 750upx;
  height: 88upx;
  z-index: 10;
  top: 0;
  background-color: transparent;
  /* #ifdef MP */
  box-sizing: border-box;
  /* #endif */
  /* #ifndef APP-PLUS-NVUE */
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  /* #endif */
  &.customerShadow {
    box-shadow: 0px 1rpx 0px 0px #e8e8e8;
  }
}
.mys_navBar {
  /* #ifndef APP-PLUS-NVUE */
  display: flex;
  height: 88upx;
  /* #endif */
  // #ifdef MP
  box-sizing: border-box;
  // #endif
  width: 750upx;
  flex-direction: row;
  background-color: transparent;
  position: absolute;
  z-index: 12;
  top: 0;
}
.fixed {
  position: fixed;
}
/*
     left 按钮
    */
.btn_type {
  /* #ifndef APP-PLUS-NVUE */
  display: flex;
  /* #endif */
  /* #ifdef APP-PLUS-NVUE */
  margin-left: 16upx;
  /* #endif */
  // #ifndef MP
  align-items: center;
  // #endif
  flex: 1;
  flex-direction: row;
}
.btn_box {
  /* #ifndef APP-PLUS-NVUE */
  display: flex;
  margin-left: 16upx;
  /* #endif */
  flex-direction: row;
  // #ifndef MP
  align-items: center;
  // #endif
}
.btn_back,
.btn_home {
  /* #ifndef APP-PLUS-NVUE */
  display: flex;
  /* #endif */
  /* #ifndef APP-PLUS-NVUE */
  height: 100%;
  /* #endif */
  /* #ifdef APP-PLUS-NVUE */
  width: 76upx;
  height: 62upx;
  /* #endif */
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: 1;
}

/* 按钮类型1 */
.nav_btn_t1 {
  /* #ifndef APP-PLUS-NVUE */
  display: flex;
  /* #endif */
  // #ifdef MP
  box-sizing: border-box;
  // #endif
  flex-direction: row;
  align-items: center;
  border-style: solid;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.3);
  background-color: rgba(0, 0, 0, 0.2);
  width: 150upx;
  height: 62upx;
}

.line {
  width: 1upx;
  height: 60%;
  /* #ifdef APP-PLUS-NVUE */
  height: 30upx;
  /* #endif */
  background-color: rgba(255, 255, 255, 0.3);
}

/*
    标题
     */
.title_container {
  /* #ifndef APP-PLUS-NVUE */
  display: flex;
  /* #endif */
  position: absolute;
  left: 375upx;
  bottom: 0;
  transform: translateX(-50%);
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.title_text {
  // flex: 1;
  text-overflow: ellipsis;
  /* #ifndef APP-PLUS-NVUE */
  white-space: nowrap;
  overflow: hidden;
  /* #endif */
  /* #ifdef APP-PLUS-NVUE */
  lines: 1;
  /* #endif */
}
/* 
    左边自定义
     */
.my_left_box {
  /* #ifndef APP-PLUS-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  align-items: center;
}
.my_left_icon {
  /* #ifndef APP-PLUS-NVUE */
  display: flex;
  /* #endif */
  position: relative;
  z-index: 20;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  /* #ifndef MP */
  margin-left: 18upx;
  /* #endif */
}
.my_left_custom {
  /* #ifndef APP-PLUS-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  align-items: center;
  // justify-content: center;
}

/* 文字 */
.leftText {
  /* #ifndef APP-PLUS-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-left: 4upx;
  font-size: 15px;
}
/* 
    中间
     */
.my_custom_box {
  /* #ifndef APP-PLUS-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: 1;
}
/*
    搜索框 
     */
.nv_search_box {
  /* #ifndef APP-PLUS-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  align-items: center;
  flex: 1;

  /* #ifndef MP */
  height: 60upx;
  /* #endif */
  background-color: #f8f8f8;
  padding-right: 20upx;
  padding-left: 20upx;
  border-radius: 60upx;
  margin-right: 15upx;
  margin-left: 15upx;
}
.nv_input {
  flex: 1;
  padding-left: 16upx;
  font-size: 13px;
}
.close {
  width: 50upx;
  /* #ifndef APP-PLUS-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  align-items: center;
  justify-content: center;
  /* #ifndef MP */
  height: 62upx;
  /* #endif */
}

/* 
    右边 自定义
     */
.my_right_icon {
  /* #ifndef APP-PLUS-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  align-items: center;
  justify-content: center;
  /* #ifndef MP */
  // min-width: 70upx;
  /* #endif */
  padding-left: 6px;
  padding-right: 10px;
}
</style>
