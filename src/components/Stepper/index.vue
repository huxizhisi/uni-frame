<!--
 * @Author: mawenlong
 * @LastEditors: 马文龙 214170716@qq.com
 * @Date: 2024-01-02 13:49:11
 * @LastEditTime: 2024-09-13 17:00:06
 * @Description: 自定义步进器
-->
<template>
  <view :class="['stepper', 'stepper--' + shape]" :style="showMinus ? '' : 'background:none'">
    <view
      v-if="showMinus"
      @tap="!minusDisabled && doMinus()"
      @touchstart="doLongMinus"
      @touchend="onTouchEnd"
      :class="['stepper-minus', minusDisabled ? 'stepper-minus--disabled' : '']"
      hover-stay-time="70"
    >
      <!-- 自定义减小按钮 -->
      <slot name="minus">
        <image
          v-show="!minusDisabled"
          id="less"
          style="width: 40rpx"
          mode="widthFix"
          name="less"
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSI5LjUiIHN0cm9rZT0iIzE3OTBGRiIvPjxwYXRoIGZpbGw9IiMxNzkwRkYiIHN0cm9rZT0iIzE3OTBGRiIgc3Ryb2tlLXdpZHRoPSIuNDc2IiBkPSJNNS45NTIgOS43NjJoOC4wOTV2LjQ3Nkg1Ljk1MnoiLz48L3N2Zz4="
        />
        <image
          v-show="minusDisabled"
          id="lessable"
          style="width: 40rpx"
          mode="widthFix"
          name="lessable"
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSI5LjUiIHN0cm9rZT0iI0NBQ0FDQSIvPjxwYXRoIGZpbGw9IiMxNzkwRkYiIHN0cm9rZT0iI0NBQ0FDQSIgc3Ryb2tlLXdpZHRoPSIuNDc2IiBkPSJNNS45NTMgOS43NjJoOC4wOTV2LjQ3Nkg1Ljk1M3oiLz48L3N2Zz4="
        />
      </slot>
    </view>
    <input
      v-if="showMinus"
      @input="onInput"
      @blur="onBlur"
      @focus="onFocus"
      :type="integer ? 'number' : 'digit'"
      :value="innerValue"
      class="stepper-input"
      :disabled="disabled || readonly"
    />
    <view
      @tap="!plusDisabled && doPlus()"
      @touchstart="doLongPlus"
      @touchend="onTouchEnd"
      :class="{ 'stepper-plus--disabled': plusDisabled }"
      class="stepper-plus"
      hover-stay-time="70"
    >
      <!-- 自定义增加按钮 -->

      <slot name="plus">
        <image
          v-show="!plusDisabled"
          id="more"
          style="width: 40rpx"
          mode="widthFix"
          name="less"
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSI5LjUiIHN0cm9rZT0iIzE3OTBGRiIvPjxwYXRoIGZpbGw9IiMxNzkwRkYiIGQ9Ik02IDkuNTU2aDh2Ljg4OUg2eiIvPjxwYXRoIGZpbGw9IiMxNzkwRkYiIGQ9Ik0xMC40NDQgNnY4aC0uODg5VjZ6Ii8+PC9zdmc+"
        />
        <image
          v-show="plusDisabled"
          id="moreable"
          style="width: 40rpx"
          mode="widthFix"
          name="lessable"
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSI5LjUiIHN0cm9rZT0iI0NBQ0FDQSIvPjxwYXRoIGZpbGw9IiMxNzkwRkYiIHN0cm9rZT0iI0NBQ0FDQSIgc3Ryb2tlLXdpZHRoPSIuNDQ0IiBkPSJNNi4yMjIgOS43NzdoNy41NTZ2LjQ0NEg2LjIyMnoiLz48cGF0aCBmaWxsPSIjMTc5MEZGIiBzdHJva2U9IiNDQUNBQ0EiIHN0cm9rZS13aWR0aD0iLjQ0NCIgZD0iTTEwLjIyMyA2LjIyMnY3LjU1Nkg5Ljc4VjYuMjIyeiIvPjwvc3ZnPg=="
        />
      </slot>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed, nextTick, onBeforeMount, ref, watch } from "vue";
import { RegUtil } from "@/utils/reg";

// 加法
function add(num1: number, num2: number) {
  const cardinal = Math.pow(10, 10);
  return Math.round((num1 + num2) * cardinal) / cardinal;
}
/**
 * Stepper 步进器
 */
type StepperShape = "square" | "circle" | "text"; // 步进器shape
interface Props {
  // 输入值
  modelValue: number | string;
  // 最小值
  min?: number | string;
  // 最大值
  max?: number | string;
  // 步长
  step?: number | string;
  // 是否禁用
  disabled?: boolean;
  // 是否禁用输入框
  readonly?: boolean;
  // 是否开启异步变更，开启后需要手动控制输入值
  asyncChange?: boolean;
  // 是否可以折叠
  collapsible?: boolean;
  // 样式风格
  shape?: StepperShape;
  // 显示的小数位数
  decimalLength?: number;
  // 是否开启长按
  longPress?: boolean;
  // 是否只允许输入整数
  integer?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  // 输入值
  modelValue: 0,
  // 最小值
  min: 0,
  // 最大值
  max: Number.MAX_SAFE_INTEGER,
  // 步长
  step: 1,
  // 是否禁用
  disabled: false,
  // 是否禁用输入框
  readonly: false,
  // 是否开启异步变更，开启后需要手动控制输入值
  asyncChange: false,
  // 是否可以折叠
  collapsible: false,
  // 样式风格
  shape: "circle",
  // 显示的小数位数
  decimalLength: 4,
  // 是否开启长按
  longPress: false,
  // 是否只允许输入整数
  integer: false,
});

// 是否展示继续减小的按钮和输入框
const showMinus = computed(() => {
  let show = false;
  if (props.collapsible) {
    if (innerValue.value && innerValue.value > props.min) {
      show = true;
    } else {
      show = false;
    }
  } else {
    show = true;
  }
  return show;
});
// 减少按钮是否可以点击
const minusDisabled = computed(() => {
  if (props.disabled || props.modelValue <= props.min) {
    return true;
  } else {
    return false;
  }
});
// 增加按钮是否可以点击
const plusDisabled = computed(() => {
  if (props.disabled || (RegUtil.isDef(props.max) && props.modelValue >= props.max)) {
    return true;
  } else {
    return false;
  }
});

const innerValue = ref<string | number>(""); // 输入框的值
const focus = ref<boolean>(false); // 输入框是否聚焦
const longPresstimer = ref<any>(null); // 长按定时器
const longPressing = ref<boolean>(false); // 是否在长按中

onBeforeMount(() => {
  // 初始化
  innerValue.value = String(props.modelValue);
});

watch(
  () => props.modelValue,
  (newVal) => {
    // 监听绑定的值的变化
    if (String(newVal) !== String(innerValue.value)) {
      innerValue.value = +format(newVal);
    }
  }
);

const emit = defineEmits(["focus", "blur", "update:modelValue", "change"]);

/**
 * 输入框输入
 */
function onInput(event: any) {
  if (focus.value) {
    return;
  }
  const value = event.detail.value; // 输入框值
  if (value === "") {
    return;
  }
  innerValue.value = value;
  let formatted = filter(value); // 过滤掉非数字部分
  // 限制小数位
  if (RegUtil.isDef(props.decimalLength) && formatted.indexOf(".") !== -1) {
    const pair = formatted.split(".");
    formatted = `${pair[0]}.${pair[1].slice(0, props.decimalLength)}`;
  }
  doEmitChange(+formatted);
}
/**
 * 输入框聚焦
 */
function onFocus(event: any) {
  focus.value = true;
  /**
   * 输入框聚焦时触发
   * @arg event: Event
   */
  emit("focus", event);
}
/**
 * 输入框失焦
 */
function onBlur(event: any) {
  focus.value = false;
  const value = event.detail.value; // 输入框值
  let formatted = filter(value === "" ? innerValue.value : value); // 过滤掉非数字部分
  innerValue.value = value;
  // 限制小数位
  if (RegUtil.isDef(props.decimalLength) && formatted.indexOf(".") !== -1) {
    const pair = formatted.split(".");
    formatted = `${pair[0]}.${pair[1].slice(0, props.decimalLength)}`;
  }
  event.detail.value = +formatted;
  doEmitChange(+formatted);
  /**
   * 输入框失焦时触发
   * @arg event: Event
   */
  emit("blur", event);
}

/**
 * 输入框值改变触发外部改变事件
 * @param value 输入框值
 */
function doEmitChange(value: any, type: string) {
  // 如果是开启了异步更新则只触发change事件
  if (!props.asyncChange) {
    /**
     * 输入框内容发生变化时触发
     * @arg value：输入框的内容，建议通过v-model双向绑定输入值，而不是监听此事件的形式
     */
    emit("update:modelValue", value);
    nextTick(() => {
      innerValue.value = Number(value);
    });
  }
  /**
   * 当绑定值变化时触发的事件
   * @arg value：输入框的内容
   */
  emit("change", { value, type });
}

/**
 * 减小数字
 */
function doMinus() {
  const diff = -props.step; // 数字差
  const value = +format(add(+innerValue.value, diff));
  doEmitChange(value, "minus");
}

/**
 * 自动减小数字
 */
function doAutoMinus() {
  if (minusDisabled.value && longPressing.value) {
    return longPresstimer.value && clearTimeout(longPresstimer.value);
  }
  longPresstimer.value = setTimeout(() => {
    longPresstimer.value && clearTimeout(longPresstimer.value);
    doMinus();
    doAutoMinus();
  }, 200);
}

/**
 * 长按减小数字
 */
function doLongMinus() {
  if (minusDisabled.value) {
    return;
  }
  if (props.longPress) {
    longPressing.value = true;
    longPresstimer.value && clearTimeout(longPresstimer.value);
    longPresstimer.value = setTimeout(() => {
      if (!longPressing.value) {
        return;
      }
      longPresstimer.value && clearTimeout(longPresstimer.value);
      doAutoMinus();
    }, 600);
  }
}

/**
 * 增加数字
 */
function doPlus() {
  const diff = +props.step; // 数字差
  const value = +format(add(+innerValue.value, diff));
  doEmitChange(value, "plus");
}
/**
 * 自动增大数字
 */
function doAutoPlus() {
  if (plusDisabled.value && longPressing.value) {
    return longPresstimer.value && clearTimeout(longPresstimer.value);
  }
  longPresstimer.value = setTimeout(() => {
    longPresstimer.value && clearTimeout(longPresstimer.value);
    doPlus();
    doAutoPlus();
  }, 200);
}

/**
 * 长按增大数字
 */
function doLongPlus() {
  if (plusDisabled.value) {
    return;
  }
  if (props.longPress) {
    longPressing.value = true;

    longPresstimer.value && clearTimeout(longPresstimer.value);
    longPresstimer.value = setTimeout(() => {
      if (!longPressing.value) {
        return;
      }
      longPresstimer.value && clearTimeout(longPresstimer.value);
      doAutoPlus();
    }, 600);
  }
}

// 触摸结束
function onTouchEnd() {
  if (!props.longPress) {
    return;
  }
  longPresstimer.value && clearTimeout(longPresstimer.value);
  longPressing.value = false;
}

// 过滤绑定数字
function filter(value: any) {
  value = String(value).replace(/[^0-9.-]/g, "");
  if (props.integer && value.indexOf(".") !== -1) {
    value = value.split(".")[0];
  }
  return value;
}
// 数字区间小数位格式化
function format(value: any) {
  value = filter(value);
  // 区间
  value = value === "" ? 0 : +value;
  value = Math.max(Math.min(Number(props.max), value), Number(props.min));
  // 小数位
  if (RegUtil.isDef(props.decimalLength)) {
    value = value.toFixed(props.decimalLength);
  }
  return value;
}
</script>

<style lang="scss" scoped>
.stepper {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  box-sizing: border-box;

  &-minus,
  &-plus {
    flex: 0 0 auto;
    position: relative;
    box-sizing: border-box;
    width: 60rpx;
    height: 40rpx;
    padding-right: 20rpx;
    // background: #ffffff;
    // border: 2rpx solid #1c64fd;
    // &--disabled {
    //   background: #f5f6f7 !important;
    //   border: none !important;
    //   &::before,
    //   &::after {
    // background: #cccccc !important;
    //   }
    // }

    // &::before,
    // &::after {
    //   position: absolute;
    //   top: 50%;
    //   left: 50%;
    //   background: #1c64fd;
    //   -webkit-transform: translate(-50%, -50%);
    //   transform: translate(-50%, -50%);
    //   content: "";
    // }
    // &::before {
    //   width: 16rpx;
    //   height: 3rpx;
    // }
  }
  &-plus {
    padding-right: 0;
    padding-left: 20rpx;
    // background: #1c64fd;
    // &::before,
    // &::after {
    //   background: #ffffff;
    // }
    // &::after {
    //   width: 3rpx;
    //   height: 16rpx;
    // }
  }
  &-input {
    flex: 1 1 auto;
    margin: 0 4rpx;
    width: 32rpx;
    min-width: 32rpx;
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 600;
    color: #181818;
    line-height: 40rpx;
    line-height: normal;
    text-align: center;
    vertical-align: middle;
  }
}
.stepper--circle {
  border-radius: 50%;
  .stepper-minus,
  .stepper-plus {
    border-radius: 50%;
  }
}
.stepper--square {
  border-radius: 8rpx;
  .stepper-minus {
    border-radius: 8rpx 0rpx 0rpx 8rpx;
  }
  .stepper-plus {
    border-radius: 0rpx 8rpx 8rpx 0rpx;
  }
}
.stepper--text {
  .stepper-minus {
    width: auto;
    height: auto;
    min-width: 28rpx;
    min-height: 28rpx;
    padding: 0;
    margin: 0;
  }
  .stepper-plus {
    width: auto;
    height: auto;
    min-width: 28rpx;
    min-height: 28rpx;
    padding: 0;
    margin: 0;
  }
}
</style>
