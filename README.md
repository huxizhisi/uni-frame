# Uni-Frame

## 简介

**基于 Vue3 + TypeScript + Uni-app + Pinia + Vk-uview-ui + Uni-mini-router 等进行构建的轻量级前端模板框架，适用于中小型的多端项目开发，开箱即用。**
**技术使用: Vue3 + Vite + Pnpm + vk-uview-ui + Pinia + alova + Eslint + Prettier + Husky + lint-staged + commitlint**

## 安装使用

**Node >= 16.14.0**

**pnpm 8.2.0**

## 目录结构

```shell
.
├─ .husky # git hooks
├─ src
│   ├─assets # 静态资源目录
    │   └─ *.scss # 全局样式
│   │
│   ├─components # 组件目录
│   │   ├─ CalenderDate # 日历选择器
│   │   ├─ CascaderCom # 级联选择器(三级)
│   │   ├─ DatePicker # 日期时间选择器
│   │   ├─ DownloadFile # 下载文件组件
│   │   ├─ Dropdown # 下拉菜单组件
│   │   ├─ Navbar # 头部导航组件
│   │   ├─ rating # 评分组件
│   │   ├─ ReadMore # 查看更多组件
│   │   ├─ Stepper # 步进器组件
│   │   ├─ SwiperTabs # Tabs切换组件
│   │   ├─ TextHidden # 文字超出隐藏组件
│   │   ├─ Upload # 上传文件组件
│   │   ├─ Footer # 底部通用组件
│   │   └─...
│   │
│   ├─enums # 枚举/常量
│   │   ├─ cacheEnum.ts
│   │   ├─ httpEnum.ts
│   │   ├─ i18nConstant.ts
│   │   ├─ routerEnum.ts
│   │   └─...
│   │
│   ├─i18n # 国际化目录
│   │
│   ├─locale # 国际化目录
│   │   ├─ en.json # 中文
│   │   ├─ zh.json # 英文
│   │   └─...
│   │
│   ├─pages # 页面
│   │   ├─ index
│   │   │    └─ index.vue
│   │   ├─ template # 示例页面
│   │   │    └─ index.vue
│   │   └─...
│   │
│   ├─router # 路由配置
│   │
│   ├─services # 接口相关
│   │   ├─ api # api
│   │   │    ├─ template.ts
│   │   │    └─...
│   │
│   ├─settings # 设置
│   │   └─ encryptionSetting # 加密设置
│   │
│   ├─store # 状态管理模式(pinia)
│   │   ├─ modules # 数据模块
│   │   │    ├─ auth.ts
│   │   │    └─...
│   │   │
│   │   └─ index.ts
│   │
│   ├─static # 静态公共文件
│   │   ├─ images # 图片
│   │   │    ├─ avatar.png
│   │   │    └─...
│   │   │
│   │   └─ ...
│   │
│   ├─types # 类型文件
│   │   ├─ env.d.ts
│   │   └─ ...
│   │
│   ├─uni_modules # uni-项目依赖模块
│   │   ├─ vk-uview-ui # vk-uview-ui组件库
│   │   └─ ...
│   │
│   ├─utils # 工具类
│   │   ├─ cache # 缓存相关目录
│   │   ├─ http  # request相关目录
│   │   ├─ uniapi  # uni-app相关方法目录
│   │   ├─ cipher.ts  # 加解密相关方法
│   │   ├─ env.ts  # 环境变量相关方法
│   │   ├─ format.ts  # 数据处理相关方法
│   │   ├─ is.ts  # 数据类型校验相关方法
│   │   ├─ reg.ts  # 数据方法校验相关方法
│   │   ├─ utils.ts  # 补充方法
│   │   └─ ...
│   │
│   ├─App.vue
│   ├─main.ts
│
├─ .env
├─ .env.development
├─ .env.production
├─ .eslintrc.js
├─ .gitignore
├─ .npmrc
├─ .prettierignore
├─ .prettierrc.js
├─ .commitlint.config.cjs
├─ default.conf
├─ favicon.ico
├─ index.html
├─ package.json
├─ pnpm-lock.yaml
├─ README.md
├─ tsconfig.json
└─ vite.config.ts

```

## 安装使用

- 安装依赖

```bash
pnpm install
```

- 运行

```bash
# 其他端请查看 package.json script
pnpm dev:mp-weixin
```

- 打包

```bash
# 其他端请查看 package.json script
pnpm build:mp-weixin
```

### 提交类型

| 提交类型   | 标题               | 描述                                                                                  |
| ---------- | ------------------ | ------------------------------------------------------------------------------------- |
| `feat`     | 特征               | 新功能、新特性                                                                        |
| `fix`      | Bug 修复           | bug 修复                                                                              |
| `docs`     | 文档               | 仅文档更改                                                                            |
| `style`    | 风格               | 不影响代码含义的更改（空格、格式、缺少分号等）                                        |
| `refactor` | 代码重构           | 重构，在不影响代码内部行为，功能下的代码修改                                          |
| `perf`     | 性能改进           | 更改代码，以提高性能                                                                  |
| `test`     | 测试               | 添加缺失的测试或纠正现有的测试                                                        |
| `build`    | 构建               | 影响构建系统或外部依赖项的更改（示例范围：gulp、broccoli、npm）                       |
| `ci`       | 持续集成           | 对我们的 CI 配置文件和脚本的更改（示例范围：Travis、Circle、BrowserStack、SauceLabs） |
| `chore`    | 其他文件修改       | 不修改 src 或测试文件的其他更改                                                       |
| `revert`   | 还原               | 恢复之前的提交                                                                        |
| `release`  | 发布新版本         | \-                                                                                    |
| `workflow` | 工作流相关文件修改 | \-                                                                                    |

## 代码格式化规范

1. 在 vscode 中安装插件 Prettier - Code formatter、eslint 插件
2. 在 vscode 中设置 settings.json

```json
// 默认全部使用prettier格式化工具
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true, // 设置保存时格式化
  "eslint.validate": ["javascript", "javascriptreact", "vue"], // vue也要eslint验证
```

可以通过 npx prettier --write. 来批量风格化文件

## 最佳实践

- 基础的功能实现在 src/pages/template/index.vue 文件中查看

##### 1. 导航栏

src/components/Navbar/index 文件
支持左右 Icon 的修改以及插槽的定义，支持搜索以及清除功能，支持对输入的功能触发，详细参数可以查看页面

##### 2. 商品图片加上 util/common/configure.ts 的 IMG_AFTER_FIX 后缀

##### 3. to do ....
