<!--
 * @Author: 马文龙 214170716@qq.com
 * @Date: 2024-09-11 14:39:24
 * @LastEditors: 马文龙 214170716@qq.com
 * @LastEditTime: 2024-09-11 15:10:12
 * @FilePath: \uni-frame\src\components\CascaderCom\index.vue
 * @Description: 三级联动组件
-->

<template>
  <view class="u-flex u-col-top cascader-box">
    <view class="cascader-list-first">
      <view v-for="option in data" :key="option.value" @tap="toggleExpands(option)">
        <view
          class="cascader-item-title u-flex u-row-start pdl-15 fz-12"
          :class="option.expands ? 'expands-item main-color' : 'second-font-color'"
          v-if="option.children && option.children.length > 0"
        >
          {{ option[labelName] }}
        </view>
      </view>
    </view>
    <view class="cascader-item" v-for="option in data" :key="option.value">
      <view class="u-flex-1" v-if="option.children && option.children.length > 0 && option.expands">
        <!-- 多次引用的原因是因为三级是隔离的 如果用一个组件递归会导致样式不符合要求 -->
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
import CascaderCom from "@/components/CascaderCom/second.vue";

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
const data = computed(() => {
  let newVal = formatOptions(props.options);
  return newVal;
});

/** 选中的数据 */
const selectedList = ref<Option[]>([]);
watch(
  () => props.selected,
  async (v) => {
    selectedList.value = v;
    console.log("------------------------>", selectedList.value);
  },
  { deep: true, immediate: true }
);

/** 展开二级树 */
const toggleExpands = (option: Option) => {
  data.value.forEach((it) => {
    it.expands = false;
  });
  option.expands = true;
};

/** 此时checked的状态还没有发生流转 false就是未选中变为选中中的状态 */
// const toggleOption = (option: Option) => {
//   if (option.checked) {
//     selectedList.value = selectedList.value.filter((selectedOption) => selectedOption.value != option.value);
//   } else {
//     selectedList.value.push(option);
//   }
//   handleChildrenCheck(option, !option.checked);
//   console.log(selectedList.value, "selectedList first");
//   emits("selected", selectedList.value);
// };

/** 和子节点建立绑定关系 */
// const handleChildrenCheck = (option: Option, type: Boolean = false) => {
//   if (type) {
//     option.children?.forEach((item) => {
//       item.checked = true;
//       selectedList.value.push(item);
//     });
//   } else {
//     option.children?.forEach((item) => {
//       item.checked = false;
//       selectedList.value = selectedList.value.filter((selectedOption) => selectedOption.value != item.value);
//     });
//   }
// };

/** 抛出事件 */
const handleSelected = (selected: Option[]) => {
  selectedList.value = selected;
  console.log(selectedList.value, "最终传递出去的");
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
