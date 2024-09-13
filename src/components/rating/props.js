/*
 * @Author: mawenlong
 * @LastEditors: mawenlong
 * @Date: 2024-03-08 10:58:17
 * @LastEditTime: 2024-03-11 14:40:24
 * @Description:
 */
export default {
  props: {
    // 用于v-model双向绑定选中的星星数量
    modelValue: {
      type: [String, Number],
      default: 1,
    },
    // 要显示的星星数量
    count: {
      type: [String, Number],
      default: 5,
    },
    // 是否不可选中
    disabled: {
      type: Boolean,
      default: false,
    },
    // 是否只读
    readonly: {
      type: Boolean,
      default: false,
    },
    // 星星之间的间距，单位px
    gutter: {
      type: [String, Number],
      default: 0,
    },
    // 最少能选择的星星个数
    minCount: {
      type: [String, Number],
      default: 0,
    },
    // 是否允许半星
    allowHalf: {
      type: Boolean,
      default: true,
    },
    // 是否可以通过滑动手势选择评分
    touchable: {
      type: Boolean,
      default: true,
    },
    customStyle: {
      type: [Object, String],
      default: () => ({}),
    },
    type: {
      type: String,
      default: "star",
    },
    size: {
      type: [String, Number],
      default: "64",
    },
  },
};
