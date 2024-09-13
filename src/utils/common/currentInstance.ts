import { ComponentInternalInstance, getCurrentInstance } from "vue";

//直接获得注入的对应的$u实例
export function $user() {
  const { appContext } = getCurrentInstance() as ComponentInternalInstance;
  const proxy = appContext.config.globalProperties;
  const $u = proxy.$u;
  return $u;
}
