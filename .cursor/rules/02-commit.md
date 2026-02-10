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

## 发布前检查

- 推荐在 **Node.js >= 20.9.0** 的环境中，执行以下命令作为发布前检查：
  - `npm run test`
  - `npm run build`
- 仅当上述命令在本地均成功通过时，才允许执行 `git push` 或其他触发部署的操作。

## 发布

- 本项目推荐部署到 **Netlify**：
  - 将本仓库通过 GitHub 连接到 Netlify。
  - 在 Netlify 中将 **Build command** 配置为 `npm run build`，将 **Publish directory** 配置为 `out`。
  - 之后 **push 到 main 分支即自动构建并发布**。
- 无需在仓库内写部署脚本；仅需在 Netlify 控制台用 GitHub 导入本项目并按上述方式配置即可。

## 自动发布触发条件

- 当用户在对话中表达类似「改完之后自动发布」「自动发布到线上」「做完这次改动后帮我直接发布」等明确意图时：
  - 你可以在当前会话中自动执行：
    - `npm run test` → 全部通过；
    - `npm run build` → 构建成功；
    - `git add` + `git commit`（使用符合本文件约定的 Conventional Commits 消息）；
    - `git push origin main`，触发 Netlify 自动部署。
  - 若任一命令失败（测试或构建），必须先修复问题并重新运行，**直到全部通过才允许 push**。
- 未收到用户上述「自动发布」类指令时，默认只生成 commit 信息或执行本地 commit，不自动执行 `git push`。
