<!--
 * @Author: 马文龙 214170716@qq.com
 * @Date: 2024-09-11 14:39:24
 * @LastEditors: 马文龙 214170716@qq.com
 * @LastEditTime: 2024-09-11 15:10:38
 * @FilePath: \uni-frame\src\components\CascaderCom\third.vue
 * @Description: 
-->

<template>
  <view class="cascader-list-third">
    <view v-for="option in data" :key="option.value">
      <view class="cascader-item-title u-flex u-row-between pdl-15 fz-12 second-font-color">
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
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";

interface Option {
  label: string;
  value: string;
  checked?: Boolean;
  expands?: Boolean;
  children?: Option[];
  dicPid?: string;
}

const emits = defineEmits(["selected"]);

const props = defineProps({
  options: {
    type: Array as () => Option[],
    default: () => [],
  },
  selected: {
    type: Array as () => Option[],
    default: () => [],
  },
  labelName: {
    type: String,
    default: "label",
  },
});

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

const data = computed(() => {
  let newVal = formatOptions(props.options);
  return newVal;
});

const selectedList = ref<Option[]>([]);
watch(
  () => props.selected,
  () => {
    console.log("children third", props.selected);
    selectedList.value = props.selected;
    data.value.forEach((it) => {
      it.checked = isChecked(it);
    });
  },
  { deep: true }
);

const isChecked = (option: Option) => {
  return selectedList.value.some((selectedOption) => selectedOption.value === option.value);
};

const toggleOption = (option: Option) => {
  /** 此时checked的状态还没有发生流转 false就是未选中变为选中中的状态 */
  if (option.checked) {
    selectedList.value = selectedList.value.filter((selectedOption) => selectedOption.value != option.value);
  } else {
    selectedList.value.push(option);
  }
  option.checked = !option.checked;
  let picArr = Array.from(new Set(selectedList.value.map((item) => item.dicPid)));
  console.log(selectedList.value, data.value, picArr, "selectedList");
  emits("selected", selectedList.value, picArr);
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
