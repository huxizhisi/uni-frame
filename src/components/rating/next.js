/*
 * @Author: mawenlong
 * @LastEditors: mawenlong
 * @Date: 2024-03-13 15:28:48
 * @LastEditTime: 2024-03-13 15:29:48
 * @Description:
 */
/*
 * @Author: mawenlong
 * @LastEditors: mawenlong
 * @Date: 2024-03-08 10:58:12
 * @LastEditTime: 2024-03-08 10:58:28
 * @Description:
 */

function empty(value) {
  switch (typeof value) {
    case "undefined":
      return true;
    case "string":
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length == 0) return true;
      break;
    case "boolean":
      if (!value) return true;
      break;
    case "number":
      if (value === 0 || isNaN(value)) return true;
      break;
    case "object":
      if (value === null || value.length === 0) return true;
      for (const i in value) {
        return false;
      }
      return true;
  }
  return false;
}

function addStyle(customStyle, target = "object") {
  // 字符串转字符串，对象转对象情形，直接返回
  if (
    empty(customStyle) ||
    (typeof customStyle === "object" && target === "object") ||
    (target === "string" && typeof customStyle === "string")
  ) {
    return customStyle;
  }
  // 字符串转对象
  if (target === "object") {
    // 去除字符串样式中的两端空格(中间的空格不能去掉，比如padding: 20px 0如果去掉了就错了)，空格是无用的
    customStyle = trim(customStyle);
    // 根据";"将字符串转为数组形式
    const styleArray = customStyle.split(";");
    const style = {};
    // 历遍数组，拼接成对象
    for (let i = 0; i < styleArray.length; i++) {
      // 'font-size:20px;color:red;'，如此最后字符串有";"的话，会导致styleArray最后一个元素为空字符串，这里需要过滤
      if (styleArray[i]) {
        const item = styleArray[i].split(":");
        style[trim(item[0])] = trim(item[1]);
      }
    }
    return style;
  }
  // 这里为对象转字符串形式
  let string = "";
  for (const i in customStyle) {
    // 驼峰转为中划线的形式，否则css内联样式，无法识别驼峰样式属性名
    const key = i.replace(/([A-Z])/g, "-$1").toLowerCase();
    string += `${key}:${customStyle[i]};`;
  }
  // 去除两端空格
  return trim(string);
}

function number(value) {
  // eslint-disable-next-line no-useless-escape
  return /^[\+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(value);
}

function addUnit(value = "auto", unit = "") {
  if (!unit) {
    unit = "px";
  }
  value = String(value);
  // 用uView内置验证规则中的number判断是否为数值
  return number(value) ? `${value}${unit}` : value;
}

function sleep(value = 30) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, value);
  });
}

function os() {
  let res =
    // #ifdef MP-WEIXIN
    (res = wx.getDeviceInfo().platform.toLowerCase());
  // #endif
  // #ifndef MP-WEIXIN
  res = uni.getSystemInfoSync().platform.toLowerCase();
  // #endif
  return res;
}

function range(min = 0, max = 0, value = 0) {
  return Math.max(min, Math.min(max, Number(value)));
}

function guid(len = 32, firstU = true, radix = null) {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
  const uuid = [];
  radix = radix || chars.length;

  if (len) {
    // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
    for (let i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
  } else {
    let r;
    // rfc4122标准要求返回的uuid中,某些位为固定的字符
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
    uuid[14] = "4";

    for (let i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
  if (firstU) {
    uuid.shift();
    return `next${uuid.join("")}`;
  }
  return uuid.join("");
}

export default {
  addStyle,
  addUnit,
  sleep,
  os,
  range,
  guid,
};
