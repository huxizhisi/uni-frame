## 1.4.8（2023-05-17）

- 【优化】部分组件属性的可选值的代码提示
- 【优化】`u-circle-progres` 组件 在进度条到 100%的时候发出一个 `finish` 事件
- 【修复】`u-picker` 的时间选择器在 ios 下默认值无效的 bug
- 【修复】`u-card` 圆角问题
- 【修复】`u-button` 支持 `info` 类型

## 1.4.7（2023-04-24）

- 【修复】`u-picker` 在 vue3 的 App 环境下默认值无效的 bug

## 1.4.5（2022-12-05）

- 【修复】`u-row`、`u-col` 使用 `@click.stop` 会报错的问题，同时建议改用 `@click.native.stop` 来代替 `@click.stop`

## 1.4.4（2022-11-12）

- 【修复】`u-calendar` `u-modal` `u-picker` `u-popup` 组件在页面进入后马上需要弹窗时，无法正常弹窗的问题。

## 1.4.3（2022-10-22）

- 【优化】部分组件的细节

## 1.4.2（2022-10-15）

- 【修复】`1.4.1` 引出的 `u-subsection` 的部分问题

## 1.4.1（2022-10-14）

- 【修复】`u-count-to` 若设置了千分位符合，会错误显示-的问题
- 【修复】`u-subsection` 部分细节问题

## 1.4.0（2022-10-07）

- 【修复】`u-section` 点击更多，会触发两次事件的问题
- 【修复】`loadMore` 加载更多，icon-type 为 circle 不会转动的问题
- 【修复】`u-subsection` current 有转入值时，变更值，样式不更新（需用 `v-model="current"` 代替 `:current="current"`）

## 1.3.13（2022-09-28）

- 【修复】`u-avatar-cropper` 组件在 vue3 中会报错的问题。

## 1.3.12（2022-08-30）

- 【优化】`u-keyboard` 组件内部细节。

## 1.3.11（2022-08-30）

- 【修复】`u-subsection` 组件的 `list` 属性不支持动态修改的问题。

## 1.3.10（2022-07-30）

- 【优化】上传组件部分细节

## 1.3.9（2022-07-07）

- 【更新】省市区数据源
- 【优化】`u-subsection` 组件支持在右上角显示数字角标

```html
<template>
  <u-subsection :list="list"></u-subsection>
</template>
```

```js
export default {
  data() {
    return {
      list: [
        {
          name: "待发货",
          num: 10,
        },
        {
          name: "待付款",
          num: 5,
        },
        {
          name: "待评价",
          num: 15,
        },
      ],
    };
  },
};
```

## 1.3.8（2022-06-13）

- 【优化】组件 `u-icon`，使之更方便的兼容第三方 icon（满足规则自动计算 customPrefix）
  **规则如下：**
- 当 `name` 中包含 `-icon-` 字符串时
- 如 `vk-icon-goods`，则组件的 `customPrefix` 属性自动识别为 `vk-icon` ，`name`属性 自动识别为 `goods`
- 如 `vk-2-icon-goods-list`，则组件的 `customPrefix` 属性自动识别为 `vk-2-icon` ，`name`属性 自动识别为 `goods-list`

## 1.3.7（2022-06-10）

- 【优化】组件 `u-action-sheet` `u-calendar` `u-dropdown-item` `u-field` `u-input` `u-keyboard` `u-modal` `u-radio-group` `u-rate` `u-search` `u-slider` `u-switch` `u-tabbar` `u-waterfall` 在 `vue3` 模式下的细节问题。

## 1.3.6（2022-06-10）

- 【优化】组件 `u-action-sheet` `u-calendar` `u-dropdown-item` `u-field` `u-input` `u-keyboard` `u-modal` `u-radio-group` `u-rate` `u-search` `u-slider` `u-switch` `u-tabbar` `u-waterfall` 在 `vue3` 模式下的细节问题。

## 1.3.5（2022-05-28）

- 【优化】组件 `u-mask` `u-popup` `u-select` `u-modal` `u-keyboard` `u-calendar` `u-action-sheet` `u-picker` 均新增 `blur` 属性，可用于设置弹出遮罩的模糊度，默认为 0（不模糊）
- ![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/49b773a3-273f-4b1c-95e8-a42dcba1a53c.png)

## 1.3.4（2022-05-03）

- 【修复】`u-tabs` 组件细节问题。

## 1.1.4（2022-03-22）

- 【修复】`u-field` 组件 `arrowDirection` 属性无效的问题。

## 1.1.3（2022-03-21）

- 【优化】部分细节。

## 1.1.2（2022-03-21）

- 【优化】部分细节。

## 1.1.1（2022-03-17）

- 【优化】部分细节。

## 1.1.0（2022-03-12）

- 【重要】`u-picker` 组件新增 `regionDiscern` 方法 智能识别省市区街道地址
  如将字符串 `浙江省杭州市西湖区希望路1333弄是啊我庭12号楼1203` 中识别为

```json
{
  "province": {
    "code": "330000",
    "name": "浙江省"
  },
  "city": {
    "code": "330100",
    "name": "杭州市"
  },
  "area": {
    "code": "330106",
    "name": "西湖区"
  },
  "address": "龙井路1号",
  "formatted_address": "浙江省杭州市西湖区龙井路1号"
}
```

而组件的 `addressDiscern` 方法还可以识别收货信息，如 `张三 13888888888 上海市嘉定区希望路1333弄是啊我庭12号楼1203` 中识别姓名、手机号、地址（支持多种格式）

## 1.0.13（2022-03-12）

- 【优化】部分细节。

## 1.0.12（2022-03-09）

- 【修复】`u-radio-group` 在 vue3 模式下，设置默认值可能会无效的问题。

## 1.0.11（2022-03-07）

- 【优化】部分细节。

## 1.0.10（2022-03-05）

- 【修复】`u-radio` 中的值相等的判断 == 改为 ===
- 【优化】部分注释的错别字。

## 1.0.9（2022-03-03）

- 【修复】`u-parse` 在 vue3 模式下编译到 app 无法正常显示的问题。

## 1.0.8（2022-02-26）

- 【优化】`u-form` 组件新增 2 个属性 `inputAlign` 和 `clearable` 用于统一设置表单内所有 `u-input` 组件的对应属性默认值
- 【优化】更新城市数据源信息

## 1.0.7（2022-02-25）

- 【重要】`u-picker` 组件新增 `addressDiscern` 方法 智能识别收货信息

如在 `张三 13888888888 上海市嘉定区希望路1333弄是啊我庭12号楼1203` 中识别姓名、手机号、地址（支持多种格式）
即使这样的字符串也能识别 `!!!!~~~$张三~~~上海市嘉定区希望路1333弄是啊我庭12号楼1203【【【【13888888888】`

## 1.0.6（2022-02-24）

- 【优化】`u-form-item` 组件的 `prop` 属性支持 a.b 形式

## 1.0.5（2022-01-11）

- 【修复】`u-sticky` 组件 在微信小程序中无法正常吸顶的问题

## 1.0.4（2021-12-31）

- 【优化】`u-dropdown-item` 组件 0 和"" 无法区分的问题。
- 【修复】`u-modal` 在 Vue3 版本中使用了 mask-close-able 属性无效的问题

## 1.0.3（2021-12-20）

【优化】u-icon 在微信小程序下可能会显示 null 字符串的问题

## 1.0.2（2021-12-09）

- 1、【优化】`u-button` 组件新增 `timerId` 属性
- 之前的效果是：所有按钮一定时间内只能点击 1 次（`共用计算时间`）导致点击按钮 A 后无法马上点击按钮 B
- 优化的效果是：每个按钮一定时间内只能点击 1 次（`分开计算时间`）且支持设置相同的 timerId 来达到指定按钮 `共用计算时间`

## 1.0.1（2021-11-22）

- 修复 u-parse 组件在微信小程序上的显示问题。

## 1.0.0（2021-11-18）

uView Vue3.0 横空出世，继承 uView1.0 意志，再战江湖，风云再起！by vk 2021-11-18
