<!--
 * @Author: mawenlong
 * @LastEditors: mawenlong
 * @Date: 2024-03-12 14:01:34
 * @LastEditTime: 2024-03-12 14:30:53
 * @Description: 纯文本超出行展示 根据行数校验
-->
<template>
  <view class="l-text-ellipsis">
    <view class="cloneContainer" v-if="containerShow">{{ container }}</view>
    <view class="l-text-ellipsis__content">
      <text>{{ expanded ? props.content : text }}</text>
      <view v-if="hasAction" class="l-text-ellipsis__action" @click="onClick">
        <block v-if="!$slots.icon">{{ expanded ? props.collapseText : props.expandText }}</block>
        <slot name="icon" :expanded="expanded"></slot>
      </view>
    </view>
  </view>
</template>
<script lang="ts">
// @ts-nocheck
import { defineComponent, ref, watch, getCurrentInstance, onMounted, nextTick } from "vue";
import TextEllipsisProps from "./props";
import { getRect } from "./function";
const name = "l-text-ellipsis";
export default defineComponent({
  name,
  props: TextEllipsisProps,
  emits: ["click"],
  setup(props, { emit }) {
    const app = getCurrentInstance();
    const text = ref("");
    const expanded = ref(false);
    const hasAction = ref(false);
    const containerShow = ref(false);
    const container = ref("");
    const sleep = () => new Promise((resolve) => nextTick(() => resolve(true)));
    const getContainer = () => getRect(".cloneContainer", { context: app });
    const calcEllipsised = async () => {
      if (!props.content.length) return;
      containerShow.value = true;
      const calcEllipsisText = async (maxHeight: number) => {
        const { dots = "", content, expandText = "" } = props;
        let left = 0;
        let right = content.length;
        let res = -1;

        while (left <= right) {
          const mid = Math.floor((left + right) / 2);
          container.value = content.slice(0, mid) + dots + expandText;
          await sleep();
          const { height } = await getContainer();
          if (height <= maxHeight) {
            left = mid + 1;
            res = mid;
          } else {
            right = mid - 1;
          }
        }
        containerShow.value = false;
        return content.slice(0, res) + dots;
      };
      container.value = props.content.slice(0, 5);
      await sleep();
      const { height } = await getContainer();
      const maxHeight = (Number(props.rows) + 0.5) * height;
      container.value = props.content;
      await sleep();
      const { height: offsetHeight } = await getContainer();
      if (maxHeight <= offsetHeight) {
        hasAction.value = true;
        text.value = await calcEllipsisText(maxHeight);
      } else {
        hasAction.value = false;
        text.value = props.content;
      }
    };

    const onClick = (event: MouseEvent) => {
      if (props.readOnly) return;
      expanded.value = !expanded.value;
      emit("click", event);
    };
    onMounted(calcEllipsised);
    watch(() => [props.content, props.rows], calcEllipsised);
    uni.onWindowResize(calcEllipsised);
    return {
      text,
      containerShow,
      container,
      expanded,
      hasAction,
      onClick,
      props,
    };
  },
});
</script>
<style lang="scss">
$blue: #1677ff !default;
$line-height: var(--l-text-ellipsis-line-height, 1.6);
$action-color: var(--l-text-ellipsis-action-color, $blue);
.l-text-ellipsis {
  position: relative;
  // overflow: hidden;
  &__content {
    line-height: $line-height;
    white-space: pre-wrap;
    word-break: break-word;
  }
  .cloneContainer {
    position: absolute;
    width: 100%;
    // left: 9999px;
    opacity: 0;
  }
  &__action {
    cursor: pointer;
    color: $action-color;
    display: inline;
    view {
      display: inline;
    }
  }
}
</style>
