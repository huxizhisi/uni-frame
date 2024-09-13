<!--
 * @Author: 马文龙 214170716@qq.com
 * @Date: 2024-09-11 14:39:24
 * @LastEditors: 马文龙 214170716@qq.com
 * @LastEditTime: 2024-09-11 15:09:57
 * @FilePath: \uni-frame\src\components\CalenderDate\index.vue
 * @Description: 价格日历组件
-->

<template>
  <view>
    <u-popup v-model="showCalender" mode="bottom" height="60%" @close="closeCalender" border-radius="16">
      <view class="sl-date-top">
        <slot name="top"></slot>
        <view class="sl-ul sl-ul-date fz-14">
          <view class="sl-li">日</view>
          <view class="sl-li">一</view>
          <view class="sl-li">二</view>
          <view class="sl-li">三</view>
          <view class="sl-li">四</view>
          <view class="sl-li">五</view>
          <view class="sl-li">六</view>
        </view>
      </view>

      <view class="sl-select-date">
        <view class="sl-loading" v-if="!pullDate">加载中...</view>
        <template v-else>
          <view v-for="(item, index) in pullDate" :key="index">
            <view class="sl-date-title u-flex u-col-center pdl-15">{{ item.title }}</view>
            <view class="sl-ul">
              <view
                class="sl-li"
                v-for="(day, i) in item.date"
                :class="day.classname ? (!!day.date && day.tags && day.tags.length ? 'sl-day' : 'sl-pass') : 'sl-pass'"
                :key="i"
                @click="dayClickEvent(day)"
              >
                <view
                  :class="
                    (currentdate[0].date !== '' && currentdate[0].date === day.date) ||
                    (currentdate[1] && currentdate[1].date !== '' && currentdate[1].date === day.date)
                      ? 'sl-curday sl-li-item u-flex u-col-center u-row-center'
                      : 'sl-li-item u-flex u-col-center u-row-center'
                  "
                >
                  <view
                    class="sl-day-txt"
                    :class="currentdate[0].str || (currentdate[1] && currentdate[1].str) ? 'sl-hasstr' : ''"
                  >
                    {{ day.day }}
                    <!--tag-->
                    <view class="sl-circle" v-if="day.classname && day.classname.indexOf('sl-today') !== -1">今天</view>
                  </view>
                  <view
                    class="sl-i fz-12"
                    v-show="day.tags && day.tags.length"
                    v-for="tag in day.tags"
                    :class="tag[0]"
                    :key="tag[0]"
                  >
                    {{ isLogin ? tag[1] : "***" }}
                  </view>
                  <view class="sl-i-null" v-show="day.tags && !day.tags.length"> </view>
                  <!--cur-tag-->
                  <view
                    class="sl-cur-str"
                    v-if="currentdate[0].date !== '' && currentdate[0].date === day.date && currentdate[0].str"
                  >
                    {{ currentdate[0].str }}</view
                  >
                  <view
                    class="sl-cur-str"
                    v-else-if="
                      currentdate[1] &&
                      currentdate[1].date !== '' &&
                      currentdate[1].date === day.date &&
                      currentdate[1].str
                    "
                  >
                    {{ currentdate[1].str }}</view
                  >
                </view>
              </view>
            </view>
          </view>
        </template>
      </view>
    </u-popup>
  </view>
</template>

<script lang="ts" setup name="CalenderDate">
import { ref, onBeforeMount, nextTick, watch, computed } from "vue";
import moment from "moment";
import { useAuthStore } from "@/store/modules/auth";

const authStore = useAuthStore();
const isLogin = computed(() => {
  return !!authStore.phoneNumber;
});

/* dateJson:[{ date: "2019-08-13",sellingPrice: "100",discount: "折",}]; // discount自定义,对应的class名字也叫discount
 * current: 三种传值方式,数组的话最大可以传两个数据
    "2023-05-24",
    ["2023-05-23","2023-05-24"],
    [{date:moment().add(1,'day').format('YYYY-MM-DD'), str:'入店'}]
 * dateType: 0 选择单个时间 1 选择时区
 */

const props = defineProps({
  //  可选区间的开始时间 默认值moment().format('YYYY-MM-DD') 即今天
  startDate: {
    type: String,
    default: moment().format("YYYY-MM-DD"),
  },
  //  可选区间的结束时间 默认值 moment().add(6,'month').format('YYYY-MM-DD') 即今天开始往后推6个月
  endDate: {
    type: String,
    default: moment().add(6, "month").format("YYYY-MM-DD"),
  },
  sign: {
    type: String,
    default: "",
  },
  //  给某个日期添加标签,例如(假,休,折)
  dateJson: {
    type: Array,
    default: () => [],
  },
  //  当前已选的时间,当dateType=1的时候 current是一个长度为2的数组
  current: {
    type: [Array, String],
    default: "",
  },
  dateType: {
    type: Number,
    default: 0,
  },
  visiable: {
    type: Boolean,
    default: false,
  },
});

/** 全部日期数据 */
watch(
  () => props.visiable,
  async (v = false) => {
    if (v) {
      pullDate.value = await getAll(props.startDate, props.endDate);
      if (props.dateType === 0 && props.current) {
        if (typeof props.current === "string") {
          currentdate.value = [{ date: props.current, str: "" }];
        }
      }
      console.log(pullDate.value, "pulldata-");
    }
    showCalender.value = v;
  },
  { deep: true }
);
// const showCalender = computed(() => {
//   return props.visiable;
// });
const showCalender = ref(false);
const pullDate = ref();
const currentdate = ref();
const currentTemp = ref();
const selectArr = ref();
const countC = ref(0);
const emits = defineEmits(["selectDate", "close"]);

onBeforeMount(() => {
  init();
});

const init = () => {
  nextTick(() => {
    pullDate.value = getAll(props.startDate, props.endDate);
    if (props.dateType === 0) {
      if (typeof props.current === "string") {
        currentdate.value = [{ date: props.current || props.startDate, str: "" }];
      } else {
        currentdate.value = [{ date: props.current[0], str: "" }];
      }
    }
    if (props.dateType === 1) {
      if (typeof props.current === "string") {
        currentdate.value = [
          { date: "", str: "" },
          { date: "", str: "" },
        ];
        console.error("current类型为数组,长度为2!");
      } else {
        currentdate.value = [];
        props.current.forEach((item) => {
          if (typeof item === "string") {
            currentdate.value.push({ date: item, str: "" });
          } else {
            currentdate.value.push(item);
          }
        });
      }
    }
    currentTemp.value = currentdate;
  });
};

const dayClickEvent = (data: any) => {
  if (data.classname && data.classname.indexOf("sl-day") === -1) {
    return;
  }
  if (data.tags && !data.tags.length) {
    return;
  }
  if (props.dateType === 1) {
    if (countC.value >= 1) {
      if (moment(data.date).diff(moment(currentdate.value[0].date)) <= 0) {
        currentdate.value = [];
        currentdate.value[0] = currentTemp.value[0];
        currentdate.value[0].date = data.date;
        selectArr.value = [data];
        return;
      }
      selectArr.value.push(data);
      countC.value = 0;
      currentdate.value[1] = currentTemp.value[1];
      currentdate.value[1].date = data.date;
      emits("selectDate", selectArr);
      selectArr.value = [];
      return;
    }
    selectArr.value = [data];
    countC.value += 1;
    currentdate.value = [];
    currentdate.value[0] = currentTemp.value[0];
    currentdate.value[0].date = data.date;
  } else {
    currentdate.value[0].date = data.date;
    emits("selectDate", data);
  }
};
const pushTag = (yearMonthDay: any) => {
  let tags = [];
  for (let i = 0; i < props.dateJson.length; i++) {
    if (moment(yearMonthDay).format("x") === moment(props.dateJson[i].date).format("x")) {
      for (let key in props.dateJson[i] as Object) {
        if (key == "showData") {
          if (!Object.keys(props.dateJson[i][key]).length) return;
          for (let it in props.dateJson[i][key] as Object) {
            tags.push([it, props.dateJson[i][key][it]]);
          }
        }
      }
      break;
    }
  }
  return tags;
};
const setClass = (start: string, end: string, i: any) => {
  let className = "",
    curstr = "";
  if (i >= moment(start).format("x") && i <= moment(end)) {
    className = "sl-day";
    if (moment(i).format("YYYY-MM-DD") === moment().format("YYYY-MM-DD")) {
      className += " sl-today";
    }
  } else {
    className = "sl-pass";
    if (moment(i).format("YYYY-MM-DD") === moment().format("YYYY-MM-DD")) {
      className += " sl-today";
    }
  }
  return { className, curstr };
};

const getAll = (start: string, end: string) => {
  const sd = Number(moment(start).startOf("month").format("x"));
  const ed = Number(moment(end).startOf("month").format("x"));
  const sdnm = Number(moment(start).format("x"));
  const ednm = Number(moment(end).format("x"));
  let dataObject = {};
  dataObject[sd] = { title: moment(start).format("YYYY年MM月"), date: [] };
  for (let w = 0; w < moment(sdnm).weekday(); w++) {
    dataObject[sd].date.push({
      date: "",
      year: "",
      month: "",
      day: "",
      week: w,
      classname: "",
      curstr: "",
      tags: null,
    }); // 如果当前月份没有存储当前天数用的数组,就创建一个空数组，如果有，就向里面添加一个空对象; (空对象是用来占位置的，用来填充月份前面的空白)
  }
  for (let i = sd; i <= ed; ) {
    const firstDay = Number(moment(i).startOf("month").format("x"));
    if (moment(i).format("x") === moment(moment(i).startOf("month").format("YYYY-MM-DD")).format("x")) {
      // 如果是当月的第一天,添加下个月的数据
      const op = {
        title: moment(i).add(1, "days").format("YYYY年MM月"),
        date: [] as any,
      };
      for (let w = 0; w < moment(i).weekday(); w++) {
        op.date.push({ date: "", year: "", month: "", day: "", week: w, classname: "", curstr: "", tags: [] });
      }
      dataObject[i] = op;
    }
    let className = setClass(start, end, i).className;
    let curstr = setClass(start, end, i).curstr;
    const tag = pushTag(moment(i).format("YYYY-MM-DD"));
    const option = {
      date: moment(i).format("YYYY-MM-DD"),
      year: moment(i).format("YYYY"),
      month: moment(i).format("MM"),
      day: moment(i).format("DD"),
      week: moment(i).weekday(),
      classname: className,
      curstr: curstr,
      tags: tag,
    };
    dataObject[firstDay].date.push(option);
    i = Number(moment(i).add(1, "days").format("x"));
  }
  return dataObject;
};

/** 关闭弹窗 */
const closeCalender = () => {
  emits("close");
};
//   },
</script>

<style lang="scss" scoped>
.sl-date-top {
  color: $main-font-color;
  position: fixed;
  width: 100%;
  height: 250rpx;
  z-index: 99;
  background: $white-color;
}
.sl-select-date {
  color: $main-font-color;
  padding-top: 250rpx;
  .sl-date-title {
    width: 100%;
    height: 72rpx;
    background-color: #f8f8f8;
    font-weight: 600;
    z-index: 9;
  }
  .sl-loading {
    padding: 100px;
    text-align: center;
  }
}
.sl-ul {
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  padding: 30rpx;
}
.sl-li {
  position: relative;
  width: 14%;
  height: 150rpx;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  .sl-li-item {
    flex-direction: column;
  }
  &.sl-pass,
  &.sl-future {
    color: #ccc;
    opacity: 0.5;
  }
  &.sl-day {
    color: $main-font-color;
  }
  .sl-circle {
    position: absolute;
    left: 0;
    right: 0;
    top: 10rpx;
    margin: auto;
    font-size: 24rpx;
    zoom: 0.9;
  }
  .sl-today {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #152281;
    position: relative;
  }
  .sl-day-txt {
    font-size: 36rpx;
    font-weight: 400;
  }
  .sl-curday {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: #ff6600;
    color: $white-color;
    border-radius: 8rpx;
    .sl-hasstr {
      padding-top: 10px;
      display: block;
    }
    .sl-cur-str {
      position: relative;
      display: block;
      z-index: 9;
      background: #ff6600;
    }
  }
  .sl-i-null {
    width: 100%;
    height: 34rpx;
  }
  .sl-i {
    display: block;
    position: absolute;
    font-style: normal;
    height: 34rpx;
    z-index: 20;
    &.date {
      display: none;
      font-style: none;
    }
    &.rest,
    &.discount {
      right: 0px;
      top: 5px;
    }
    &.sellingPrice {
      position: static;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 34rpx;
    }
  }
}

.sl-ul-date {
  padding: 0 30rpx;
  .sl-li {
    height: 60rpx;
  }
}
</style>
