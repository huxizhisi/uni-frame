<!--
 * @Author: 马文龙 214170716@qq.com
 * @Date: 2024-09-11 14:39:25
 * @LastEditors: 马文龙 214170716@qq.com
 * @LastEditTime: 2024-09-11 15:12:08
 * @FilePath: \uni-frame\src\components\rating\index.vue
 * @Description: 评分组件
-->

<template>
  <view class="next-rate" :id="elId" ref="next-rate" :style="[$next.addStyle(customStyle)]">
    <view class="next-rate__content" @touchmove.stop="touchMove" @touchend.stop="touchEnd">
      <view class="next-rate__content__item" v-for="(item, index) in Number(count)" :key="index" :class="[elClass]">
        <view
          class="next-rate__content__item__icon-wrap"
          ref="next-rate__content__item__icon-wrap"
          @tap.stop="clickHandler($event, index + 1)"
        >
          <view class="icon-block">
            <image
              :key="index"
              :style="{ width: size * 2 + 'rpx', height: size * 2 + 'rpx' }"
              mode="widthFix"
              :class="size > 20 ? 'mgl-8' : 'mgl-2'"
              :src="
                activeIndex > index
                  ? activeIndex - index >= 1
                    ? getActiveIcon(type)
                    : getHalfIcon(type)
                  : getInactiveIcon(type)
              "
            >
            </image>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import props from "./props.js";
import next from "./next.js";
import { getActiveIcon, getInactiveIcon, getHalfIcon } from "./icon.js";
// #ifdef APP-NVUE
const dom = weex.requireModule("dom");
// #endif

export default {
  name: "next-rate",
  mixins: [props],
  data() {
    return {
      elId: next.guid(),
      elClass: next.guid(),
      rateBoxLeft: 0, // 评分盒子左边到屏幕左边的距离，用于滑动选择时计算距离
      activeIndex: this.modelValue,
      rateWidth: 0, // 每个星星的宽度
      // 标识是否正在滑动，由于iOS事件上touch比click先触发，导致快速滑动结束后，接着触发click，导致事件混乱而出错
      moving: false,
    };
  },
  // #ifdef MP-WEIXIN
  // 将自定义节点设置成虚拟的，更加接近Vue组件的表现，能更好的使用flex属性
  options: {
    virtualHost: true,
  },
  // #endif
  emits: ["update:modelValue", "change"],
  computed: {
    $next() {
      return {
        ...next,
      };
    },
  },
  methods: {
    getActiveIcon,
    getInactiveIcon,
    getHalfIcon,
    init() {
      this.$next.sleep().then(() => {
        this.getRateItemRect();
        this.getRateIconWrapRect();
      });
    },
    $uGetRect(selector, all) {
      return new Promise((resolve) => {
        uni
          .createSelectorQuery()
          .in(this)
          [all ? "selectAll" : "select"](selector)
          .boundingClientRect((rect) => {
            if (all && Array.isArray(rect) && rect.length) {
              resolve(rect);
            }
            if (!all && rect) {
              resolve(rect);
            }
          })
          .exec();
      });
    },
    // 获取评分组件盒子的布局信息
    async getRateItemRect() {
      await this.$next.sleep();
      // uView封装的获取节点的方法，详见文档
      // #ifndef APP-NVUE
      this.$uGetRect("#" + this.elId).then((res) => {
        this.rateBoxLeft = res.left;
      });
      // #endif
      // #ifdef APP-NVUE
      dom.getComponentRect(this.$refs["next-rate"], (res) => {
        this.rateBoxLeft = res.size.left;
      });
      // #endif
    },
    // 获取单个星星的尺寸
    getRateIconWrapRect() {
      // uView封装的获取节点的方法，详见文档
      // #ifndef APP-NVUE
      this.$uGetRect("." + this.elClass).then((res) => {
        this.rateWidth = res.width;
      });
      // #endif
      // #ifdef APP-NVUE
      dom.getComponentRect(this.$refs["next-rate__content__item__icon-wrap"][0], (res) => {
        this.rateWidth = res.size.width;
      });
      // #endif
    },
    // 阻止事件冒泡
    preventEvent(e) {
      e && typeof e.stopPropagation === "function" && e.stopPropagation();
    },
    // 手指滑动
    touchMove(e) {
      // 如果禁止通过手动滑动选择，返回
      if (!this.touchable) {
        return;
      }
      this.preventEvent(e);
      const x = e.changedTouches[0].pageX;
      this.getActiveIndex(x);
    },
    // 停止滑动
    touchEnd(e) {
      // 如果禁止通过手动滑动选择，返回
      if (!this.touchable) {
        return;
      }
      this.preventEvent(e);
      const x = e.changedTouches[0].pageX;
      this.getActiveIndex(x);
    },
    // 通过点击，直接选中
    clickHandler(e, index) {
      // ios上，moving状态取消事件触发
      if (this.$next.os() === "ios" && this.moving) {
        return;
      }
      this.preventEvent(e);
      let x = 0;
      // 点击时，在nvue上，无法获得点击的坐标，所以无法实现点击半星选择
      // #ifndef APP-NVUE
      x = e.changedTouches[0].pageX;
      // #endif
      // #ifdef APP-NVUE
      // nvue下，无法通过点击获得坐标信息，这里通过元素的位置尺寸值模拟坐标
      x = index * this.rateWidth + this.rateBoxLeft;
      // #endif
      this.getActiveIndex(x, true);
    },
    // 发出事件
    emitEvent() {
      // 发出change事件
      this.$emit("change", this.activeIndex);
      // 同时修改双向绑定的值
      this.$emit("update:modelValue", this.activeIndex);
    },
    // 获取当前激活的评分图标
    getActiveIndex(x, isClick = false) {
      if (this.disabled || this.readonly) {
        return;
      }
      // 判断当前操作的点的x坐标值，是否在允许的边界范围内
      const allRateWidth = this.rateWidth * this.count + this.rateBoxLeft;
      // 如果小于第一个图标的左边界，设置为最小值，如果大于所有图标的宽度，则设置为最大值
      x = this.$next.range(this.rateBoxLeft, allRateWidth, x) - this.rateBoxLeft;
      // 滑动点相对于评分盒子左边的距离
      const distance = x;
      // 滑动的距离，相当于多少颗星星
      let index;
      // 判断是否允许半星
      if (this.allowHalf) {
        index = Math.floor(distance / this.rateWidth);
        // 取余，判断小数的区间范围
        const decimal = distance % this.rateWidth;
        if (decimal <= this.rateWidth / 2 && decimal > 0) {
          index += 0.5;
        } else if (decimal > this.rateWidth / 2) {
          index++;
        }
      } else {
        index = Math.floor(distance / this.rateWidth);
        // 取余，判断小数的区间范围
        const decimal = distance % this.rateWidth;
        // 非半星时，只有超过了图标的一半距离，才认为是选择了这颗星
        if (isClick) {
          if (decimal > 0) index++;
        } else {
          if (decimal > this.rateWidth / 2) index++;
        }
      }
      this.activeIndex = Math.min(index, this.count);
      // 对最少颗星星的限制
      if (this.activeIndex < this.minCount) {
        this.activeIndex = this.minCount;
      }

      // 设置延时为了让click事件在touchmove之前触发
      setTimeout(() => {
        this.moving = true;
      }, 10);
      // 一定时间后，取消标识为移动中状态，是为了让click事件无效
      setTimeout(() => {
        this.moving = false;
      }, 10);
    },
  },
  mounted() {
    this.init();
    this.$watch(
      () => this.modelValue,
      (val) => {
        this.activeIndex = val;
      }
    );
    this.$watch(
      () => this.activeIndex,
      () => {
        this.emitEvent();
      }
    );
  },
};
</script>

<style lang="scss" scoped>
@mixin flex($direction: row) {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: $direction;
}

/* #ifndef APP-NVUE */
view,
scroll-view,
swiper-item {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  flex-grow: 0;
  flex-basis: auto;
  align-items: stretch;
  align-content: flex-start;
}
/* #endif */

$next-rate-margin: 0 !default;
$next-rate-padding: 0 !default;
$next-rate-item-icon-wrap-half-top: 0 !default;
$next-rate-item-icon-wrap-half-left: 0 !default;

@font-face {
  font-family: "iconfont";
  src: url("https://at.alicdn.com/t/c/font_4110624_xwdzikjz9z.ttf?t=1688544956641") format("truetype");
}
.icon-block {
  display: inline-flex;
}
.icon {
  font-family: iconfont;
  font-size: 42upx;
  font-style: normal;
  color: #999;
}

.next-rate {
  @include flex;
  align-items: center;
  margin: $next-rate-margin;
  padding: $next-rate-padding;
  /* #ifndef APP-NVUE */
  touch-action: none;
  /* #endif */

  &__content {
    @include flex;

    &__item {
      position: relative;

      &__icon-wrap {
        &--half {
          position: absolute;
          overflow: hidden;
          top: $next-rate-item-icon-wrap-half-top;
          left: $next-rate-item-icon-wrap-half-left;
        }
      }
    }
  }
}

.next-icon {
  /* #ifndef APP-NVUE */
  box-sizing: border-box;
  /* #endif */
}
</style>
