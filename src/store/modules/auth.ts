/*
 * @Author: 马文龙 214170716@qq.com
 * @Date: 2024-09-11 14:39:26
 * @LastEditors: 马文龙 214170716@qq.com
 * @LastEditTime: 2024-09-11 15:30:34
 * @FilePath: \uni-frame\src\store\modules\auth.ts
 * @Description: 基础信息配置
 */

import { defineStore } from "pinia";
import { getCache, removeCache, setCache } from "@/utils/cache";
import { TOKEN_KEY, PHONE_KEY } from "@/enums/cacheEnum";

interface AuthState {
  token?: string;
  phoneNumber?: string;
}

export const useAuthStore = defineStore({
  id: "auth",
  state: (): AuthState => ({
    token: undefined,
    phoneNumber: undefined,
  }),
  getters: {
    getToken: (state) => state.token,
    getPhoneNumber: (state) => state.phoneNumber,
    isLogin: (state): boolean => !!state.token,
    getAuthorization: (state) => {
      return state.token ? { Authorization: `Bearer ${state.token}` } : {};
    },
    getAuthorPhone: (state) => {
      return state.phoneNumber ? { phNum: state.phoneNumber } : {};
    },
  },
  actions: {
    initToken() {
      this.token = getCache<string>(TOKEN_KEY) || undefined;
      this.phoneNumber = getCache<string>(PHONE_KEY) || undefined;
    },
    setToken(token: string | undefined) {
      setCache(TOKEN_KEY, token);
      this.token = token;
    },
    setPhoneNumber(phoneNumber: string | undefined) {
      setCache(PHONE_KEY, phoneNumber);
      this.phoneNumber = phoneNumber;
    },

    /**
     * @description 登出
     */
    // async loginOut(): Promise<any> {
    //   try {
    //     const res = await logout();
    //     removeCache(TOKEN_KEY);
    //     this.setToken(undefined);
    //     return Promise.resolve(res);
    //   } catch (err: any) {
    //     return Promise.reject(err);
    //   }
    // },

    /**
     * @description 刷新token
     */
    // async refreshToken(): Promise<LoginModel> {
    //     try {
    //         const { data } = await refreshToken();
    //         this.setToken(data.token);
    //         return Promise.resolve(data);
    //     } catch (err: any) {
    //         return Promise.reject(err);
    //     }
    // },
  },
});
