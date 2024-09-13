<template>
  <view class="da-dropdown-picker" v-if="viewCol && viewCol.length">
    <scroll-view class="da-dropdown-picker-view" v-for="(vc, vci) in viewCol" :key="vci" scroll-y>
      <view
        class="da-dropdown-picker-item"
        :class="vr.checked ? 'is-actived' : ''"
        v-for="(vr, vri) in viewRow[vci]"
        :key="vri"
        @click="handleSelect(vr, vci, vri)"
      >
        <text class="da-dropdown-picker-item--name">{{ vr.label }}</text>
        <text class="da-dropdown-picker-item--icon" v-if="vr.children && vr.children.length"></text>
        <text class="da-dropdown-picker-item--check" v-if="vr.checked && (!vr.children || vr.children.length === 0)" />
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { defineComponent, ref, watch } from "vue";
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
    const viewCol = ref([]);
    const viewRow = ref([]);

    function checkData(selected, list) {
      for (let i = 0; i < list.length; i++) {
        const k = list[i];
        for (let j = 0; j < selected.length; j++) {
          const x = selected[j];
          if (k.value === x) {
            k.checked = true;
            viewCol.value.push(k.value);
            viewRow.value.push(list);
            if (k.children?.length) {
              checkData(selected, k.children);
            }
            break;
          }
        }
      }
    }

    function initData(item) {
      const list = deepClone(item?.options || []);
      if (list?.length) {
        if (item.value?.length) {
          viewCol.value = [];
          viewRow.value = [];

          checkData(item.value, list);
        } else {
          viewCol.value.push("tmpValue");
          viewRow.value.push(list);
        }
      } else {
        viewCol.value = [];
        viewRow.value = [];
      }
    }

    function handleSelect(item, colIndex, _rowIndex) {
      const { dropdownItem, dropdownIndex } = props;

      let lastItem = false;
      viewCol.value[colIndex] = item.value;

      if (viewRow.value[colIndex]?.length) {
        viewRow.value[colIndex].forEach((k) => {
          k.checked = false;
        });
      }

      item.checked = true;
      const list = item?.children || null;

      if (list?.length) {
        viewCol.value[colIndex + 1] = "tmpValue";
        viewRow.value[colIndex + 1] = list;
        lastItem = false;
      } else {
        console.warn("最后一项", item);
        lastItem = true;
      }

      try {
        if (viewRow.value[colIndex + 1]?.length) {
          viewRow.value[colIndex + 1].forEach((k) => {
            k.checked = false;
          });
        }
      } catch (e) {
        console.warn("try clean row data", e);
        // --
      }

      if (lastItem) {
        if (dropdownItem?.prop) {
          const res = { [dropdownItem.prop]: deepClone(viewCol.value) };
          emit("success", res, viewCol.value, dropdownIndex);
        } else {
          console.error(`菜单项${dropdownItem.title}未定义prop，返回内容失败`);
        }
      }
    }

    watch(
      () => props.dropdownItem,
      (v) => {
        initData(v);
      },
      { immediate: true }
    );

    return {
      viewCol,
      viewRow,

      handleSelect,
    };
  },
});
</script>

<style lang="scss">
.da-dropdown-picker {
  display: flex;
  width: 100%;
  max-height: 60vh;
  line-height: 1;

  &-view {
    display: flex;

    /* #ifdef MP-ALIPAY */
    flex-direction: column;
    flex-wrap: wrap;

    /* #endif */

    width: 100%;
    height: 100%;

    + .da-dropdown-picker-view {
      border-left: 1px solid #eee;
    }
  }

  &-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24rpx;
    font-size: 24rpx;
    color: var(--dropdown-text-color);
    text-align: left;

    &--icon {
      width: 24rpx;
      height: 24rpx;
      background-image: url("data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTc1My45NjcgMzM3LjA1OUw1MDAuMzY0IDYxMS44MTcgMjQ2LjczNyAzMzcuMDU5YTM0LjkxIDM0LjkxIDAgMTAtNTEuMzE2IDQ3LjM2bDI3OS4yNzMgMzAyLjU0NWEzNC45MSAzNC45MSAwIDAwNTEuMzE2IDBMODA1LjI4MyAzODQuNDJhMzQuOTEgMzQuOTEgMCAxMC01MS4zMTYtNDcuMzYiIGZpbGw9IiM3OTc5NzkiLz48L3N2Zz4=");
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100%;
      transform: rotate(-90deg);
    }

    &--check {
      flex-shrink: 0;
      width: 24rpx;
      height: 24rpx;
      background-image: url("data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiI+PHBhdGggZD0iTTUyNy4zNiA3NjIuODhMMjMwLjQgNDYwLjhsNzYuOC02MS40NCAxNzQuMDggMTMzLjEyYzcxLjY4LTgxLjkyIDIzMC40LTI1MC44OCA0NDUuNDQtMzg0bDIwLjQ4IDQwLjk2Qzc0Ny41MiAzNzMuNzYgNTgzLjY4IDYzNC44OCA1MjcuMzYgNzYyLjg4bTAgMCIgZmlsbD0iIzAwN2FmZiIvPjwvc3ZnPg==");
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100% 100%;
    }

    &:hover {
      background: #eee;
    }

    &.is-actived {
      color: var(--dropdown-theme-color);
    }
  }
}
</style>
