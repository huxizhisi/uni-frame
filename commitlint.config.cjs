/*
 * @Author: 马文龙 214170716@qq.com
 * @Date: 2024-09-11 14:39:24
 * @LastEditors: 马文龙 214170716@qq.com
 * @LastEditTime: 2024-09-13 18:05:18
 * @FilePath: \uni-frame\commitlint.config.cjs
 * @Description:
 */

// 例：feat: 增加功能

module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // 新功能(feature)
        "fix", // 修补bug
        "docs", // 文档(documentation)
        "style", // 格式、样式(不影响代码运行的变动)
        "refactor", // 代码重构
        "perf", // 性能改进
        "test", // 添加测试
        "ci", // 持续集成
        "chore", // 构建过程或辅助工具的变动
        "revert", // 回滚到上一个版本
        "workflow", // 工作流改进
        "mod", // 不确定分类的修改
        "wip", // 开发中
        "build", // 打包构建
        "types", // 类型修改
        "release", // 版本发布
        "resolve a conflict", // 解决冲突
        "merge branch", // 合并分支
        "dependencies", // 依赖项修改
        "devDependencies", // 开发依赖修改
        "strengthen", // 加强，巩固
      ],
    ],
    "subject-full-stop": [0, "never"],
    "subject-case": [0, "never"],
  },
};
