<template>
  <view class="da-dropdown-cell">
    <view
      class="da-dropdown-cell-item"
      :class="item.checked ? 'is-actived' : ''"
      v-for="(item, index) in cellOptions"
      :key="index"
      @click="handleSelect(item)"
    >
      <text class="da-dropdown-cell-item--label">{{ item.label }}</text>
      <text class="da-dropdown-cell-item--suffix">{{ item.suffix }}</text>
      <text class="da-dropdown-cell-item--check" v-if="item.checked && showIcon" />
    </view>
  </view>
</template>

<script>
import { defineComponent, watch, ref } from "vue";
import { deepClone } from "@/utils/utils";

export default defineComponent({
  props: {
    dropdownItem: {
      type: Object,
      default: null,
    },
    dropdownIndex: {
      type: Number,
    },
  },
  emits: ["success"],
  setup(props, { emit }) {
    const cellOptions = ref([]);
    const showIcon = ref(false);

    function initData(options, value) {
      const list = deepClone(options);
      for (let i = 0; i < list.length; i++) {
        const item = list[i];
        if (item.value === value) {
          item.checked = true;
          break;
        }
      }
      cellOptions.value = list;
    }

    function handleSelect(item) {
      const { dropdownItem, dropdownIndex } = props;
      if (dropdownItem?.prop) {
        const res = { [dropdownItem.prop]: item.value };
        emit("success", res, item, dropdownIndex);
      } else {
        console.error(`菜单项${dropdownItem.title}未定义prop，返回内容失败`);
      }
    }

    watch(
      () => props.dropdownItem,
      (v) => {
        if (v?.options?.length) {
          initData(v.options, v.value);
        } else {
          cellOptions.value = [];
        }
        showIcon.value = v?.showIcon || false;
      },
      { immediate: true, deep: true }
    );

    return {
      cellOptions,
      showIcon,
      handleSelect,
    };
  },
});
</script>

<style lang="scss">
// 下拉列表
.da-dropdown-cell {
  --cell-height: 80rpx;

  width: 100%;
  max-height: 60vh;
  overflow-x: hidden;
  overflow-y: auto;

  &-item {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: var(--cell-height);
    padding: 0 24rpx;
    overflow: hidden;
    font-size: 28rpx;
    color: var(--dropdown-text-color);
    white-space: nowrap;
    border-bottom: 1rpx solid #dedede;

    &:last-child {
      border-bottom: none;
    }

    &--label {
      flex-grow: 1;
      max-width: 80%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      // #ifdef H5
      :deep(> span) {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      // #endif
    }

    &--suffix {
      flex-grow: 1;
      margin-left: 10px;
      overflow: hidden;
      font-size: 24rpx;
      color: #999;
      text-align: right;
      text-overflow: ellipsis;
      white-space: nowrap;

      // #ifdef H5
      :deep(> span) {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      // #endif
    }

    &--check {
      flex-shrink: 0;
      width: var(--cell-height);
      height: var(--cell-height);
      background-image: url("data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiI+PHBhdGggZD0iTTUyNy4zNiA3NjIuODhMMjMwLjQgNDYwLjhsNzYuOC02MS40NCAxNzQuMDggMTMzLjEyYzcxLjY4LTgxLjkyIDIzMC40LTI1MC44OCA0NDUuNDQtMzg0bDIwLjQ4IDQwLjk2Qzc0Ny41MiAzNzMuNzYgNTgzLjY4IDYzNC44OCA1MjcuMzYgNzYyLjg4bTAgMCIgZmlsbD0iIzAwN2FmZiIvPjwvc3ZnPg==");
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 60% 60%;
    }

    &.is-actived {
      color: var(--dropdown-theme-color);
    }
  }
}
</style>
