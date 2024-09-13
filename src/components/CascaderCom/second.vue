<!--
 * @Author: 马文龙 214170716@qq.com
 * @Date: 2024-09-11 14:39:24
 * @LastEditors: 马文龙 214170716@qq.com
 * @LastEditTime: 2024-09-11 15:10:29
 * @FilePath: \uni-frame\src\components\CascaderCom\second.vue
 * @Description: 
-->

<template>
  <view class="u-flex u-col-top">
    <view class="cascader-list-second">
      <view v-for="option in data" :key="option.value">
        <view
          class="cascader-item-title u-flex u-row-between pdl-15 fz-12 second-font-color pdr-15"
          :class="option.expands ? 'expands-item' : ''"
          @tap="toggleExpands(option)"
        >
          {{ option[labelName] }}
          <u-checkbox
            active-color="#ff6633"
            icon-size="24rpx"
            label-size="28rpx"
            size="24rpx"
            @change="toggleOption(option)"
            v-model="option.checked"
            :label-disabled="true"
          />
        </view>
        <!-- <input type="checkbox" :checked="isChecked(option)" @change="toggleOption(option)" /> -->
      </view>
    </view>
    <view class="cascader-item" v-for="(option, index) in data" :key="index">
      <view class="u-flex-1" v-if="option.children && option.children.length > 0 && option.expands">
        <CascaderCom
          :options="option.children"
          :selected="selectedList"
          :labelName="labelName"
          @selected="handleSelected"
        ></CascaderCom>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import CascaderCom from "@/components/CascaderCom/third.vue";

interface Option {
  label: string;
  value: string;
  checked?: Boolean;
  expands?: Boolean;
  children?: Option[];
}

const emits = defineEmits(["selected"]);

const props = defineProps({
  /**
   * 接受的参数
   * @param [{label : '', value: '', children: []}]
   */
  options: {
    type: Array as () => Option[],
    default: () => [],
  },
  /**
   * 选中的数据 数据结构同options 由于只做前端传递所以参数不用变为字符串数组
   */
  selected: {
    type: Array as () => Option[],
    default: () => [],
  },
  /**
   * 自定义类名
   */
  labelName: {
    type: String,
    default: "label",
  },
});

/** 对原始数据做处理 */
const formatOptions = (data: Option[]) => {
  for (const item of data) {
    item.checked = false;
    item.expands = false;
    if (item.children) {
      formatOptions(item.children);
    }
  }
  return data;
};

/** 数据树 */
// const data = computed(() => {
//   console.log(props.options, "oldccc");
//   let newVal = formatOptions(props.options);
//   console.log(newVal, "ccc");
//   return newVal;
// });
const data = ref<Option[]>([]);
watch(
  () => props.options,
  async (v) => {
    if (v) {
      let newVal = formatOptions(props.options);
      data.value = newVal;
      console.log(newVal, "newVAL");
    }
  },
  { immediate: true }
);

/** 选中的数据 */
const selectedList = ref<Option[]>([]);
watch(
  () => props.selected,
  () => {
    console.log("children", props.selected);
    if (props.selected && props.selected.length) {
      if (secondIds.value && secondIds.value.length) {
        data.value.forEach((item) => {
          item.checked = secondIds.value.indexOf(item.value) != -1 ? true : false;
        });
      } else {
        data.value.forEach((it) => {
          it.checked = isChecked(it);
        });
      }
    } else {
      /** 外层清空的情况 */
      secondIds.value = [];
      data.value.forEach((it) => {
        it.checked = isChecked(it);
      });
    }
    selectedList.value = props.selected;
  },
  { deep: true }
);

/** 校验是否选中 */
const isChecked = (option: Option) => {
  return selectedList.value.some((selectedOption) => selectedOption.value === option.value);
};

/** 展开三级树 */
const toggleExpands = (option: Option) => {
  data.value.forEach((it) => {
    it.expands = false;
  });
  option.expands = true;
};

/** 选中checkbox */
const toggleOption = (option: Option) => {
  /** 此时checked的状态还没有发生流转 false就是未选中变为选中中的状态 */
  if (option.checked) {
    secondIds.value.splice(secondIds.value.indexOf(option.value), 1);
    option.checked = false;
  } else {
    if (secondIds.value.indexOf(option.value) == -1) {
      secondIds.value.push(option.value);
    }
    option.checked = true;
  }
  /** 有子节点的情况绑定子节点 */
  //   handleChildrenCheck(option, option.checked);

  if (option.children && option.children.length > 0) {
    handleChildrenCheck(option, option.checked);
  } else {
    if (option.checked) {
      selectedList.value.push(option);
    } else {
      selectedList.value = selectedList.value.filter((selectedOption) => selectedOption.value != option.value);
    }
  }
  console.log(selectedList.value, option, "second selectedList");
  emits("selected", selectedList.value);
};

/** 和子节点建立绑定关系 */
const handleChildrenCheck = (option: Option, type: Boolean = false) => {
  if (type) {
    option.children &&
      option.children?.forEach((item) => {
        item.checked = true;
        selectedList.value.push(item);
      });
  } else {
    option.children &&
      option.children?.forEach((item) => {
        item.checked = false;
        selectedList.value = selectedList.value.filter((selectedOption) => selectedOption.value != item.value);
      });
  }
};

const secondIds = ref<string[]>([]);
/** 抛出事件 */
const handleSelected = (selected: Option[], ids: string[]) => {
  selectedList.value = selected;
  /** 选中三级的情况要回显二级 */
  secondIds.value = ids;
  emits("selected", selectedList.value);
};
</script>
<script lang="ts">
export default {
  options: {
    styleIsolation: "shared",
  },
};
</script>
<style lang="scss" scoped>
@import "./static/index.scss";
</style>
