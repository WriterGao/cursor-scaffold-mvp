# 提交与发布约定

## Conventional Commits

所有 commit message 必须符合 [Conventional Commits](https://www.conventionalcommits.org/)，格式：

```
<type>: <short description>
```

常用 type：

- **feat**：新功能  
  示例：`feat: 添加待办列表增删改查`
- **fix**：修复 bug  
  示例：`fix: 修复列表分页错误`
- **chore**：构建、依赖、脚本等  
  示例：`chore: 升级 Next.js`
- **docs**：仅文档  
  示例：`docs: 更新 API 说明`
- **test**：测试相关  
  示例：`test: 为 Todo API 添加单元测试`

## 提交前必须通过测试

- 在执行 **`git commit`** 前，必须先执行 **`npm run test`** 且全部通过。
- 若测试失败，不得提交；需先修复测试或代码直至通过。

## 发布

- 本项目推荐部署到 **Netlify**：
  - 将本仓库通过 GitHub 连接到 Netlify。
  - 在 Netlify 中将 **Build command** 配置为 `npm run build && npx next export`，将 **Publish directory** 配置为 `out`。
  - 之后 **push 到 main 分支即自动构建并发布**。
- 无需在仓库内写部署脚本；仅需在 Netlify 控制台用 GitHub 导入本项目并按上述方式配置即可。
