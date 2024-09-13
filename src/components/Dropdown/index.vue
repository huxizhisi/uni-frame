<!--
 * @Author: 马文龙 214170716@qq.com
 * @Date: 2024-09-11 14:39:25
 * @LastEditors: 马文龙 214170716@qq.com
 * @LastEditTime: 2024-09-11 15:11:22
 * @FilePath: \uni-frame\src\components\Dropdown\index.vue
 * @Description: 筛选菜单栏-定制
-->

<template>
  <view class="da-dropdown" :class="{ 'is-fixed': fixedType, 'has-search': hasSearch }" :style="dropdownStyle">
    <!-- 搜索 -->
    <view class="da-dropdown-search" v-if="hasSearch" @touchmove.stop.prevent="handleMove">
      <input
        class="da-dropdown-search-input"
        :value="searchItem.value"
        @input="handleSearchChange"
        :placeholder="searchItem.placeholder || '请输入'"
        @confirm="handleSearch"
        confirm-type="search"
      />
      <button class="da-dropdown-search-btn" @click="handleSearch">搜索</button>
    </view>
    <!-- 菜单 -->
    <!-- @touchmove.stop.prevent="handleMove" -->
    <view
      class="da-dropdown-menu"
      :style="{ top: fixedType ? topHei + 'px' : 0 }"
      :class="menuList && menuList.length >= 5 ? 'da-dropdown-menu-scroll' : 'border-btm'"
    >
      <view
        class="da-dropdown-menu-item"
        v-for="(item, index) in menuList"
        :key="index"
        v-show="item.isHidden !== true"
        :class="menuList && menuList.length >= 5 ? 'da-dropdown-menu-scroll-item' : ''"
        @click="handleMenuClick(index, item)"
      >
        <text
          class="da-dropdown-menu-item--text fz-14 second-font-color"
          :class="[item.isClick ? 'is-actived' : '', item.isActive ? 'is-actived' : '']"
        >
          {{ menuActiveText ? item.activeTitle || item.title : item.title }}</text
        >

        <!-- arrow-bottom-#ff6633 -->
        <image
          id="arrowBottomF"
          style="width: 20rpx"
          mode="widthFix"
          name="arrowBottomF"
          v-if="item.type !== 'click' && item.type !== 'sort' && (item.isClick || item.isActive)"
          class="mgl-5"
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEwIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzc2M183MjM5KSI+PHBhdGggZD0iTS43NzYgMS44MjhsMy45MzUgNC4zNGMuMTQzLjE1Ny40MzUuMTU3LjU3NyAwbDMuOTM2LTQuMzRhLjA2LjA2IDAgMCAwIC4wMDctLjA3NS4wOC4wOCAwIDAgMC0uMDMzLS4wMjguMTA2LjEwNiAwIDAgMC0uMDQ2LS4wMWgtLjgzN2EuMTk2LjE5NiAwIDAgMC0uMTQ0LjA1OEw1IDUuMjcgMS44MyAxLjc3M2EuMTk2LjE5NiAwIDAgMC0uMTQ1LS4wNTlILjg0OGMtLjA3MiAwLS4xMTUuMDY2LS4wNzIuMTE0eiIgZmlsbD0iI0Y2MyIvPjwvZz48ZGVmcz48Y2xpcFBhdGggaWQ9ImNsaXAwXzc2M183MjM5Ij48cGF0aCBmaWxsPSIjZmZmIiB0cmFuc2Zvcm09InJvdGF0ZSgtMTgwIDUgNCkiIGQ9Ik0wIDBoMTB2OEgweiIvPjwvY2xpcFBhdGg+PC9kZWZzPjwvc3ZnPg=="
        />

        <!-- arrow-bottom -->
        <image
          id="arrowBottom"
          style="width: 18rpx"
          mode="widthFix"
          name="arrowBottom"
          v-if="item.type !== 'click' && item.type !== 'sort' && !(item.isClick || item.isActive)"
          class="mgl-5"
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOSIgaGVpZ2h0PSI1IiB2aWV3Qm94PSIwIDAgOSA1IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0uMDE3LjMyOGwzLjkzNSA0LjM0Yy4xNDMuMTU3LjQzNS4xNTcuNTc3IDBMOC40NjYuMzI4YS4wNi4wNiAwIDAgMCAuMDA3LS4wNzUuMDguMDggMCAwIDAtLjAzMy0uMDI4LjEwNy4xMDcgMCAwIDAtLjA0Ny0uMDFoLS44MzdhLjE5Ni4xOTYgMCAwIDAtLjE0NC4wNTlMNC4yNDIgMy43NyAxLjA3LjI3NGEuMTk2LjE5NiAwIDAgMC0uMTQ0LS4wNkguMDljLS4wNzIgMC0uMTE1LjA2Ny0uMDcyLjExNHoiIGZpbGw9IiM5OTkiLz48L3N2Zz4="
        />

        <view class="da-dropdown-menu-item--sort" v-if="item.type === 'sort'" :class="'is--' + item.value"></view>
      </view>
    </view>
    <!-- 弹出 -->
    <view
      class="da-dropdown-content"
      :class="{ 'is-show': isShow, 'is-visible': isVisible }"
      :style="{ top: fixedType ? topHeiMoreTab + 'px' : 0 }"
    >
      <view class="da-dropdown-content-popup" :class="isShow ? 'is-show' : ''">
        <view class="da-dropdown-popup-box" v-for="(item, index) in menuList" :key="index">
          <!-- 下拉列表 -->
          <DropdownCell
            v-if="item.type === 'cell' && index === currentIndex"
            :dropdownItem="item"
            :dropdownIndex="index"
            @success="handleCellSelect"
          ></DropdownCell>
          <!-- 多条件筛选 -->
          <DropdownFilter
            v-if="item.type === 'filter' && index === currentIndex"
            :dropdownItem="item"
            :dropdownIndex="index"
            @success="handleFilterConfirm"
          ></DropdownFilter>
          <!-- 级联选择 -->
          <DropdownPicker
            v-if="item.type === 'picker' && index === currentIndex"
            :dropdownItem="item"
            :dropdownIndex="index"
            @success="handlePickerConfirm"
          />
          <!-- 日期范围 -->
          <DropdownDaterange
            v-if="item.type === 'daterange' && index === currentIndex"
            :dropdownItem="item"
            :dropdownIndex="index"
            @success="handleDaterangeConfirm"
          />
          <!-- 综合排序/目的地 -->
          <template v-if="item.type === 'custom' && index === currentIndex">
            <!-- 综合排序 -->
            <slot name="sort" v-if="item.key == 'sort'" :item="item" :index="index"></slot>
            <!-- 目的地 -->
            <slot name="destination" v-if="item.key == 'destination'" :item="item" :index="index"></slot>

            <view class="da-dropdown-footer" style="margin-top: 0">
              <view class="da-dropdown-footer--reset" @click="handleDropdownReset()">清空</view>
              <view class="da-dropdown-footer--confirm radius8" @click="handleDropdownConfirm()"> 确定 </view>
            </view>
          </template>

          <!-- 自定义筛选 -->
          <template v-if="item.type === 'select' && item.children && item.children.length && index === currentIndex">
            <view class="common-box" v-for="(it, ind) in item.children" :key="ind">
              <view class="toggle-title u-flex">
                <view class="u-flex u-row-between" style="width: 100%">
                  <view class="toggle-title-lf fz-14 u-flex-1">
                    <view class="model-box" @touchmove.stop.prevent="handleMove"> </view>
                    {{ it.title }}
                    <text v-if="it.isMultiSelect" class="fz-12 toggle-title-lf-check">(多选)</text>
                  </view>
                  <view class="toggle-title-rf fz-12" v-if="it.isExpand" @click="it.expandShow = !it.expandShow">
                    展开
                    <u-icon :name="it.expandShow ? 'arrow-down' : 'arrow-up'" color="#999999"></u-icon>
                  </view>
                </view>
              </view>
              <view v-show="it.isExpand ? it.expandShow : true">
                <Multiple
                  v-if="it.isMultiSelect"
                  :optionList="it.children"
                  :lableNum="it.lineCount"
                  :newVal="param[it.key]"
                  @selected="selectOption($event, it, item)"
                />
                <Radios
                  v-if="!it.isMultiSelect"
                  :optionList="it.children"
                  :lableNum="it.lineCount"
                  :newVal="param[it.key]"
                  @selected="selectOption($event, it, item)"
                />
              </view>
            </view>
            <view class="da-dropdown-footer">
              <view class="da-dropdown-footer--reset" @click="handleDropdownReset()">清空</view>
              <view class="da-dropdown-footer--confirm radius8" @click="handleDropdownConfirm()"> 确定 </view>
            </view>
          </template>

          <!-- 弹窗插槽 -->
          <template v-if="item.type === 'slot' && index === currentIndex">
            <slot :name="item[propName]" :item="item" :index="index"></slot>
          </template>
        </view>
      </view>
      <view class="da-dropdown-content-mask" @tap="handlePopupHide" @touchmove.stop.prevent="handleMove" />
    </view>
    <view class="da-dropdown--blank" v-if="fixedType"></view>
  </view>
</template>

<script>
import { defineComponent, ref, computed, onMounted, watch } from "vue";

import { deepClone } from "@/utils/utils";
import DropdownPicker from "./components/picker.vue";
import DropdownCell from "./components/cell.vue";
import DropdownFilter from "./components/filter.vue";
import DropdownDaterange from "./components/daterange.vue";
import Multiple from "./components/multiple.vue";
import Radios from "./components/radios.vue";

export default defineComponent({
  components: { DropdownPicker, DropdownCell, DropdownFilter, DropdownDaterange, Multiple, Radios },
  props: {
    /**
     * 导航菜单数据
     *
     * @type: search
     * @ title: '搜素'
     * @ prop: 'prop0'
     *
     * @type: cell
     * title: '下拉',
     * prop: 'prop1',
     * showAll: true, // 是否展示不限
     * showIcon: true, // 是否展示展开/收起ICON
     * value: 1, // 默认内容1
     * options: [
     *  { label: '下拉列表项1', value: '1', suffix: '副标题' },
     *  { label: '下拉列表项2', value: '2' },
     *  { label: '下拉列表项3', value: '3' },
     *],
     * syncDataFn: getMockServiceData // 获取远程数据 promise 返回
     *
     * @type: click
     * title: '单点',
     * prop: 'prop2',
     * value: true // 默认选择
     *
     * @type: sort
     * title: '排序',
     * prop: 'prop3',
     * value: 'asc' // 默认升序
     *
     * @type: filter
     * title: '筛选',
     * prop: 'prop4',
     * options: [
     *  {
     *    title: '单选',
     *    type: 'radio',
     *    prop: 'ft1',
     *    options: [ { label: '单选1', value: '1' } ],
     *  },
     *  {
     *    title: '多选',
     *    type: 'checkbox',
     *    prop: 'ft2',
     *    options: [ { label: '多选1', value: '1' } ],
     *  },
     *  {
     *    title: '滑块',
     *    type: 'slider',
     *    prop: 'ft3',
     *    // value: 0,
     *    componentProps: {
     *      min: 0,
     *      max: 100,
     *      step: 1,
     *      showValue: true,
     *    }
     *  }
     *]
     * value: { ft1: '2', ft2: ['2', '3'], ft3: 30 }, //默认选中单选2、多选2、3、滑动30
     *
     * @type: picker
     * title: '级联',
     * prop: 'prop5',
     * showAll: true, // 是否展示不限
     * showIcon: true, // 是否展示展开/收起ICON
     * field: {
     *   label: 'label',
     *   value: 'value',
     *   children: 'children',
     * } // 展示项
     * options: [
     *   {
     *     label: '级联列表项1',
     *     value: '1',
     *     children: [
     *       { label: '级联列表项11', value: '11' },
     *       { label: '级联列表项12', value: '12' },
     *     ]
     *   }
     * ]
     *
     * @type: daterange
     * title: '日期',
     * prop: 'prop6',
     * value: { start: '2023-01-01', end: '2023-02-01' }, // 默认选中 2023-01-01到2023-02-01
     *
     * @type: slot
     * title: '插槽',
     * prop: 'prop7',
     * value: 1 // 默认激活状态
     */
    dropdownMenu: {
      type: Array,
      default: () => [],
    },
    /**
     * 菜单激活时，是否改变为激活项文字
     */
    menuActiveText: {
      type: Boolean,
      default: true,
    },
    /**
     * 激活颜色
     */
    themeColor: {
      type: String,
      default: "#ff6633",
    },
    /**
     * 常规颜色
     */
    textColor: {
      type: String,
      default: "#333333",
    },
    /**
     * 背景颜色，当固定在顶部时，此为必填
     */
    bgColor: {
      type: String,
      default: "#ffffff",
    },

    /**
     * 距离头部距离
     */
    offsetTop: {
      type: [String, Number],
      default: 144,
    },
    /**
     * 是否固定在顶部
     */
    fixedTop: {
      type: Boolean,
      default: false,
    },
    /**
     * 弹窗过渡时间
     */
    duration: {
      type: [Number, String],
      default: 300,
    },
    /**
     * key名
     */
    prop: {
      type: String,
      default: "prop",
    },
  },
  emits: ["open", "close", "update:dropdownMenu", "confirm"],
  setup(props, { emit }) {
    const currentIndex = ref(-1);
    const isVisible = ref(false);
    const isShow = ref(false);
    const menuList = ref([]);
    const hasSearch = ref(false);
    const searchItem = ref(null);
    const param = ref({});

    // 主题样式
    const dropdownStyle = computed(() => {
      return {
        "--dropdown-theme-color": props.themeColor,
        "--dropdown-text-color": props.textColor,
        "--dropdown-background-color": props.bgColor,
        "--dropdown-popup-duration": `${props.duration / 1000}s`,
      };
    });

    // 头部距离
    const topHei = computed(() => {
      return props.offsetTop;
    });

    const fixedType = computed(() => {
      return props.fixedTop;
    });

    const topHeiMoreTab = computed(() => {
      return props.offsetTop + uni.upx2px(100);
    });

    const propName = computed(() => {
      return props.prop;
    });

    /**
     * 校验对象里是有都有值
     */
    function checkParamValues(item) {
      for (const child of item) {
        if (child.isMultiSelect ? param.value[child.key] && param.value[child.key].length : param.value[child.key]) {
          return true;
        }
      }
      return false;
    }

    /**
     * 初始化数据
     */
    async function initData(dropdownMenuData) {
      const newMenu = deepClone(dropdownMenuData || []);
      const hasShowAllType = ["cell", "picker"];
      const allItem = { label: "不限", value: "-9999" };

      newMenu.map((item) => {
        if (item.key == "sort" || item.key == "destination") {
          /** to do... */
        } else {
          item.children &&
            item.children.forEach((it) => {
              param.value[it.key] = it.isMultiSelect ? [] : "";
              it.expandShow = it.isExpand;
            });
        }
      });
      if (newMenu?.length) {
        for (let i = 0; i < newMenu.length; i++) {
          const item = newMenu[i];
          // 处理初始项
          if (hasShowAllType.includes(item.type)) {
            if (item.syncDataFn && typeof item.syncDataFn === "function") {
              const syncOptions = await item.syncDataFn();
              item.options = syncOptions || [];
            }
          }

          if (item.options?.length) {
            if (item.field) {
              item.options = alignData(item.options, item.field);
            }
            if (item.showAll) {
              if (item.options.findIndex((k) => k.value === allItem.value) === -1) {
                item.options.unshift(allItem);
              }
            }
          }
          /** 单独处理已选项 单独用于搜索功能 1024 */
          if (item.type === "select") {
            if (item.children && item.children.length) {
              item.isActive = checkParamValues(item.children);
            } else {
              item.isActive = false;
            }
          }
          // 处理已选项 旧
          if (item.value || item.value === 0) {
            if (item.type === "cell") {
              for (let x = 0; x < item.options.length; x++) {
                const k = item.options[x];
                if (k.value === item.value) {
                  item.isActived = true;
                  item.activeTitle = k.label;
                  break;
                }
              }
            }
            if (item.type === "click") {
              item.isActived = item.value === true;
            }
            if (item.type === "sort") {
              item.isActived = item.value === "asc" || item.value === "desc";
            }
            if (item.type === "filter") {
              item.isActived = JSON.stringify(item.value || {}) !== "{}";
            }
            if (item.type === "picker") {
              item.isActived = item.value?.length;
            }
            if (item.type === "daterange") {
              item.isActived = item.value?.start && item.value?.end;
            }
            if (item.type === "slot") {
              item.isActived = !!item.value;
            }
          }

          // 搜索项特殊处理
          if (item.type === "search") {
            item.isHidden = true;
            searchItem.value = item;
            hasSearch.value = true;
          }
        }
      }
      menuList.value = newMenu;
    }
    /**
     * 处理部分初始数据
     * @param data
     */
    function alignData(data, alignField) {
      for (let i = 0; i < data.length; i++) {
        const k = data[i];
        k.label = k[alignField?.label || "label"] || null;
        k.value = k[alignField?.value || "value"] || null;
        k.children = k[alignField?.children || "children"] || null;
        if (k.children?.length) {
          alignData(k.children, alignField);
        }
      }
      return data;
    }
    /**
     * 打开弹窗
     * @param index 当前激活索引
     */
    function handlePopupShow(index) {
      isShow.value = true;
      isVisible.value = true;
      currentIndex.value = index;
      emit("open", currentIndex.value);
    }
    /**
     * 关闭弹窗
     */
    function handlePopupHide() {
      isShow.value = false;
      menuList.value.forEach((ele) => {
        ele.isClick = false;
      });
      // 延迟移除下拉弹窗
      setTimeout(() => {
        isVisible.value = false;
        clearIndex();
        emit("close", currentIndex.value);
      }, props.duration);
    }
    /**
     * 用于确认用的关闭弹窗
     */
    function handlePopHide() {
      isShow.value = false;
      menuList.value.forEach((ele) => {
        ele.isClick = false;
      });
      isVisible.value = false;
      clearIndex();
    }
    /**
     * 清理滚动
     */
    function handleMove() {}
    /**
     * 关闭弹窗
     */
    function clearIndex() {
      currentIndex.value = -1;
    }
    /**
     * 点击菜单项
     */
    function handleMenuClick(index, item) {
      const dropdownMenu = menuList.value;
      const menuItem = dropdownMenu[index];
      dropdownMenu.forEach((k) => {
        k.isClick = false;
      });

      if (index === currentIndex.value) {
        item.isClick = false;
        handlePopupHide();
        return;
      }

      item.isClick = true;

      if (menuItem.type === "select") {
        return handleItemSelect(menuItem, index);
      }

      if (menuItem.type === "click") {
        return handleItemClick(menuItem, index);
      }

      if (menuItem.type === "sort") {
        return handleItemSort(menuItem, index);
      }

      emit("actMenu", index);
      handlePopupShow(index);
    }
    /**
     * 搜索输入
     */
    function handleSearchChange(e) {
      searchItem.value.value = e?.detail?.value;
    }
    /**
     * 确定搜索
     */
    function handleSearch() {
      if (searchItem.value?.prop) {
        const res = { [searchItem.value.prop]: searchItem.value.value };
        emit("update:dropdownMenu", menuList.value);
        emit("confirm", res);
      } else {
        console.error(`菜单项${searchItem.value.title}未定义prop，返回内容失败`);
      }
    }
    /**
     * 菜单项-下拉列表回调
     * @param callbackData 操作返回的数据
     * @param cellItem 下拉列表项数据
     * @param index 菜单索引
     */
    function handleCellSelect(callbackData, cellItem, index) {
      const dropdownMenu = menuList.value;
      const item = dropdownMenu[index];
      item.isClick = false;

      if (cellItem.value === "-9999") {
        item.isActived = false;
        item.activeTitle = undefined;
        item.value = null;
      } else {
        item.isActived = true;
        item.activeTitle = cellItem.label;
        item.value = cellItem.value;
      }

      handlePopupHide();
      emit("update:dropdownMenu", dropdownMenu);
      emit("confirm", callbackData);
    }
    /**
     * 菜单项-点击
     * @param item 菜单项
     * @param index 菜单项索引
     */
    function handleItemClick(item, index) {
      if (currentIndex.value === -1) {
        currentIndex.value = index;
        item.value = true;
        item.isActived = true;
      } else {
        item.value = false;
        item.isActived = false;
        clearIndex();
      }
      if (item?.prop) {
        const res = { [item.prop]: item.value };
        emit("update:dropdownMenu", menuList.value);
        emit("confirm", res);
      } else {
        console.error(`菜单项${item.title}未定义prop，返回内容失败`);
      }
    }
    /**
     * 筛选项-点击
     * @param item 菜单项
     * @param index 菜单项索引
     */
    function handleItemSelect(item, index) {
      /** 单独处理已选项 */
      if (item.type === "select") {
        if (item.children && item.children.length) {
          item.isActive = checkParamValues(item.children);
        } else {
          item.isActive = false;
        }
      }
      if (currentIndex.value === index) {
        item.isClick = false;
        handlePopupHide();
      } else {
        currentIndex.value = index;
        item.isClick = true;
        handlePopupShow(index);
      }
      emit("actMenu", index);
    }
    /**
     * 菜单项-排序
     * @param item 菜单项
     * @param index 菜单项索引
     */
    function handleItemSort(item, index) {
      if (item.value === "asc") {
        item.value = "desc";
        currentIndex.value = index;
        item.isActived = true;
      } else if (item.value === "desc") {
        item.value = undefined;
        item.isActived = false;
        clearIndex();
      } else {
        item.value = "asc";
        currentIndex.value = index;
        item.isActived = true;
      }

      if (item?.prop) {
        const res = { [item.prop]: item.value };
        emit("update:dropdownMenu", menuList.value);
        emit("confirm", res);
      } else {
        console.error(`菜单项${item.title}未定义prop，返回内容失败`);
      }
    }
    /**
     * 菜单项-筛选回调
     * @param callbackData 操作返回的数据
     * @param filterData 筛选数据
     * @param index 菜单索引
     */
    function handleFilterConfirm(callbackData, filterData, index) {
      const dropdownMenu = menuList.value;
      const item = dropdownMenu[index];
      item.isClick = false;

      item.isActived = JSON.stringify(filterData || {}) !== "{}";
      item.activeTitle = undefined;
      item.value = filterData;

      handlePopupHide();
      emit("update:dropdownMenu", dropdownMenu);
      emit("confirm", callbackData);
    }
    /**
     * 菜单项-级联回调
     * @param callbackData 操作返回的数据
     * @param pickerItem 级联已选数据
     * @param index 菜单索引
     */
    function handlePickerConfirm(callbackData, pickerItem, index) {
      const dropdownMenu = menuList.value;
      const item = dropdownMenu[index];
      item.isClick = false;

      if (!pickerItem || pickerItem[0] === "-9999") {
        item.isActived = false;
        item.activeTitle = undefined;
        item.value = null;
      } else {
        item.isActived = true;
        item.value = pickerItem;
      }

      handlePopupHide();
      emit("update:dropdownMenu", dropdownMenu);
      emit("confirm", callbackData);
    }
    /**
     * 菜单项-日期范围回调
     * @param callbackData 操作返回的数据
     * @param daterangeItem 日期范围数据
     * @param index 菜单索引
     */
    function handleDaterangeConfirm(callbackData, daterangeItem, index) {
      const dropdownMenu = menuList.value;
      const item = dropdownMenu[index];
      item.isClick = false;

      if (daterangeItem?.start && daterangeItem?.end) {
        item.isActived = true;
        item.value = daterangeItem;
      } else {
        item.isActived = false;
        item.activeTitle = undefined;
        item.value = null;
      }

      handlePopupHide();
      emit("update:dropdownMenu", dropdownMenu);
      emit("confirm", callbackData);
    }
    /**
     * 处理通用选择项
     */
    function selectOption(callbackData, item, parentItem) {
      param.value[item.key] = callbackData;
      /** 单独处理已选项 */
      if (parentItem.type === "select") {
        if (parentItem.children && parentItem.children.length) {
          parentItem.isActive = checkParamValues(parentItem.children);
        } else {
          parentItem.isActive = false;
        }
      }
      console.log(callbackData, item, parentItem, param.value);
    }
    function handleDropdownConfirm() {
      emit("confirm", param.value);
    }
    /**
     * 清空按钮
     */
    function handleDropdownReset() {
      menuList.value.forEach((item) => {
        item.isActive = false;
      });
      param.value = {};
      emit("clear");
    }

    watch(
      () => props.dropdownMenu,
      (v) => {
        initData(v);
      },
      { immediate: true, deep: true }
    );

    onMounted(() => {});

    return {
      initData,
      menuList,
      dropdownStyle,
      currentIndex,
      isShow,
      topHei,
      topHeiMoreTab,
      isVisible,
      hasSearch,
      searchItem,
      handleSearchChange,
      handleSearch,
      handleMenuClick,
      handlePopupHide,
      clearIndex,
      handleMove,
      propName,
      handleCellSelect,
      handleFilterConfirm,
      handlePickerConfirm,
      handleDaterangeConfirm,
      selectOption,
      param,
      handleDropdownConfirm,
      handleDropdownReset,
      handlePopHide,
      fixedType,
    };
  },
});
</script>

<style lang="scss">
@import "@/components/Dropdown/common.scss";
.da-dropdown {
  --dropdown-menu-height: 80rpx;
  --dropdown-popup-duration: 0.3s;
  width: 100%;
  position: relative;
  z-index: 888;
  line-height: 1;
  background: #fff;
  &--blank {
    width: 100%;
    height: var(--dropdown-menu-height);
  }

  &-search {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: var(--dropdown-menu-height);
    padding: 10rpx 20rpx 6rpx;
    background: var(--dropdown-background-color, #fff);

    &-input {
      flex-grow: 1;
      height: 60rpx;
      padding: 0 20rpx;
      overflow: hidden;
      font-size: 28rpx;
      color: var(--dropdown-text-color);
      background: #f6f6f6;
      border-radius: 8rpx 0 0 8rpx;
    }

    &-btn {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      height: 60rpx;
      padding: 0 20rpx;
      overflow: hidden;
      font-size: 28rpx;
      color: var(--dropdown-text-color);
      background: #f6f6f6;
      border: none;
      border-radius: 0 8rpx 8rpx 0;

      &::after {
        display: none;
      }
    }
  }

  &-menu {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    height: 100rpx;
    background: var(--dropdown-background-color, #fff);
    // background: transparent;
    width: calc(100% - 40rpx);
    margin: 0 auto;
    &-item {
      display: flex;
      flex-grow: 1;
      align-items: center;
      justify-content: center;
      height: 100%;

      &:hover {
        // background: #fafafa;
      }

      &--text {
        &.is-actived {
          color: var(--dropdown-theme-color);
        }
      }

      &--arrow {
        width: 24rpx;
        height: 24rpx;
        background-image: url("data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiPjxwYXRoIGQ9Ik04NTkuODUzIDI5Mi45NjZIMTY0LjE0N2MtNDAuMTQgMC02MC4zMTMgNDguNTM4LTMxLjg0NiA3Ny4wMDVsMzQ3Ljg1MyAzNDcuODUzYzE3LjYxMiAxNy42MTMgNDYuMTgyIDE3LjYxMyA2My43OTUgMGwzNDcuODUzLTM0Ny44NTNjMjguMzY0LTI4LjQ2NyA4LjI5NC03Ny4wMDUtMzEuOTUtNzcuMDA1eiIgZmlsbD0iIzhhOGE4YSIvPjwvc3ZnPg==");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 80% 80%;
        opacity: 0.5;

        &.is-actived {
          background-image: url("data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiPjxwYXRoIGQ9Ik04NTkuODUzIDI5Mi45NjZIMTY0LjE0N2MtNDAuMTQgMC02MC4zMTMgNDguNTM4LTMxLjg0NiA3Ny4wMDVsMzQ3Ljg1MyAzNDcuODUzYzE3LjYxMiAxNy42MTMgNDYuMTgyIDE3LjYxMyA2My43OTUgMGwzNDcuODUzLTM0Ny44NTNjMjguMzY0LTI4LjQ2NyA4LjI5NC03Ny4wMDUtMzEuOTUtNzcuMDA1eiIgZmlsbD0iIzAwN2FmZiIvPjwvc3ZnPg==");
          opacity: 1;
          transform: rotate(180deg);
        }
      }

      &--sort {
        position: relative;
        margin-left: 6rpx;
        transition: transform 0.3s;

        &::before,
        &::after {
          position: absolute;
          top: calc(50% - 16rpx);
          left: 0;
          content: "";
          border-color: transparent;
          border-style: solid;
          border-width: 8rpx;
          border-bottom-color: #bbb;
        }

        &::after {
          top: calc(50% + 6rpx);
          border-top-color: #bbb;
          border-bottom-color: transparent;
        }

        &.is--asc::before {
          border-bottom-color: var(--dropdown-theme-color);
        }

        &.is--desc::after {
          border-top-color: var(--dropdown-theme-color);
        }
      }
    }
    &.border-btm::before {
      content: "";
      position: absolute;
      width: 100%;
      bottom: 0;
      border-bottom: 1rpx solid #dfdfdf;
      transform: scaleY(0.5);
    }
  }

  &-content {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;
    box-sizing: border-box;
    width: 100%;
    height: calc(100vh - 140rpx - var(--tab-bar-height, 0px) - var(--dropdown-menu-height, 0px));
    overflow: hidden;
    visibility: hidden;
    opacity: 0;
    transition: opacity var(--dropdown-popup-duration, 0.3s) linear;
    display: none;
    &.is-show {
      display: block;
      z-index: 999;
      opacity: 1;
    }

    &.is-visible {
      visibility: visible;
    }

    &-mask {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 999;
      width: 100%;
      background: rgba(0, 0, 0, 0.3);
    }

    &-popup {
      position: relative;
      z-index: 1000;
      max-height: 100%;
      overflow: auto;
      transition: transform var(--dropdown-popup-duration) linear;
      transform: translateY(-100%);
      border-radius: 0 0 16rpx 16rpx;
      &.is-show {
        transform: translateY(0);
      }
    }
  }

  &-popup-box {
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-size: 28rpx;
    line-height: 1;
    background: var(--dropdown-background-color, #fff);
    transition: border-radius var(--dropdown-popup-duration) linear;
  }

  /* 固定至顶 */
  &.is-fixed {
    z-index: 999;
    .da-dropdown {
      &-search {
        position: fixed;
        top: var(--window-top, 140rpx);
        right: 0;
        left: 0;
        max-width: 1190px;
        margin: auto;
      }

      &-menu {
        position: fixed;
        right: 0;
        left: 0;
        background: #fff;
        max-width: 1190px;
        margin: auto;
        width: 100%;
      }

      &-menu-scroll {
        display: block;
        overflow-x: scroll;
        white-space: nowrap;
        &-item {
          display: inline-flex;
          padding: 0 20rpx;
          flex: none;
        }
      }

      &-content {
        position: fixed;
        top: calc(140rpx + var(--status-bar-height) + var(--dropdown-menu-height, 0px));
        right: 0;
        bottom: 0;
        left: 0;
      }
    }

    &.has-search {
      .da-dropdown {
        &-menu {
          top: calc(140rpx + var(--status-bar-height) + var(--dropdown-menu-height, 0px));
        }

        &-content {
          top: calc(
            140rpx + var(--status-bar-height) + var(--dropdown-menu-height, 0px) + var(--dropdown-menu-height, 0px)
          );
        }

        &--blank {
          height: calc(var(--dropdown-menu-height) * 2);
        }
      }
    }
  }
}
</style>
