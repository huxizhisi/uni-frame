import { defineStore } from "pinia";
import { deepClone } from "@/utils/utils";

type IGlobalState = {
  locale: string;
  anchorData: string;
};

export const useGlobalStore = defineStore("global", {
  state: (): IGlobalState => ({
    locale: "",
    anchorData: "",
  }),
  getters: {
    getAnchorData: (state) => {
      return state.anchorData;
    },
  },
  actions: {
    setLocale(locale: string) {
      this.locale = locale;
    },
    mergeObjSame(obj1: Record<string, any>, obj2: Record<string, any>): Record<string, any> {
      /**
       * 对于 obj2 的每个键，将其转换为小写（lowerKey）。
       * 检查 obj1 是否已包含该小写键，并且对应的值（转换为小写字符串）是否与 obj2 中的值（转换为小写字符串）相同。如果是，则继续检查下一个键；否则，立即返回 false。
       * 如果所有重复的键（大小写不敏感）对应的值都相同（大小写不敏感），则返回 obj1 与 obj2 的浅合并结果；否则，返回 obj1 本身
       */
      return Object.keys(obj2).every((key) => {
        const lowerKey = key.toLowerCase();
        // eslint-disable-next-line
        return !obj1.hasOwnProperty(lowerKey) || obj1[lowerKey].toLowerCase() === obj2[key].toString().toLowerCase();
      })
        ? { ...obj1, ...obj2 }
        : obj1;
    },
    setAnchorData(anchorData: string) {
      if (!anchorData) return;
      /** 一定要JSON格式的数据,所以要额外处理一次(现在可以自己处理 暂时不需要) */
      //   const jsonString = anchorData.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":');
      const data = JSON.parse(deepClone(anchorData));
      let allData = data;
      /** 如果存在旧数据,这里存在需要在页面额外锚点的数据,所以要做合并处理 */
      if (this.anchorData) {
        const oldData = JSON.parse(deepClone(this.anchorData));
        allData = this.mergeObjSame(data, oldData);
      }
      this.anchorData = JSON.stringify(allData);
    },
  },
});
