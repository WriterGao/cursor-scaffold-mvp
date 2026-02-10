---
name: auto-publish
description: Runs test and build, then commits and pushes to main to trigger Netlify deploy. Use when the user says 自动发布、自动发布到线上、改完之后自动发布、推送代码、帮我发布、发布到线上、push 并部署, or "push and deploy" / "deploy to production".
---

# 自动发布到线上

在用户表达「自动发布」「推送代码」「发布到线上」等意图时，按本流程在同一会话内自动执行，不得只回复步骤让用户自己做。

## 触发短语（任一即触发）

- 自动发布 / 自动发布到线上
- 改完之后自动发布 / 这次改完帮我直接发布
- 推送代码 / 帮我推送
- 发布到线上 / push 并部署

## 执行流程（必须按顺序）

1. **环境检查与切换**  
   - 执行 `node -v`。
   - 若版本 **≥20.9.0**：直接继续下一步，构建时执行 `npm run build` 即可。
   - 若版本 **&lt; 20.9.0**：先在本会话中尝试切换环境，执行：
     ```bash
     source ~/.nvm/nvm.sh 2>/dev/null && nvm use 20 && node -v
     ```
     若输出为 `v20.x.x`，视为可切换，**后续构建必须**在带 nvm 的命令中执行（见第 3 步）。若 nvm 不可用或命令失败、仍非 20.x，则提示用户在本机执行 `nvm use 20` 或升级 Node，并停止、不执行 push。

2. **测试**  
   - 执行 `npm run test`。  
   - 若失败：修复测试或代码直至通过，再继续；**不得在测试未通过时提交或 push**。

3. **构建**  
   - 若当前环境 Node 已 ≥20.9.0：执行 `npm run build`。
   - 若当前环境 Node &lt; 20.9.0 或曾依赖 nvm 切换：执行以下命令，确保用 Node 20 构建：
     ```bash
     source ~/.nvm/nvm.sh 2>/dev/null && nvm use 20 && npm run build
     ```
   - 若失败：修复构建错误直至通过，再继续；**不得在构建未通过时 push**。

4. **提交与推送**  
   - 执行 `git status`、`git diff`（必要时 `git log -3 --oneline`）了解改动。  
   - 根据改动生成符合 **Conventional Commits** 的 commit message（见项目 `.cursor/rules/02-commit.md`）。  
   - 执行 `git add`（要提交的文件）、`git commit -m "<message>"`。  
   - 执行 `git push origin main`，由 Netlify 自动部署。

5. **结果**  
   - 若 push 成功：简短说明已推送，Netlify 会自动部署。  
   - 若在某步失败且无法在本会话修复：明确说明卡在哪一步、原因（如 Node 版本、测试失败、构建失败），并给出用户可执行的具体命令或修改建议。

## 约束

- **未通过测试或构建时，禁止执行 `git push`。**
- Commit message 必须符合项目约定（feat/fix/docs/chore/test + 简短描述）。
- 仅 push 到 `main`；不修改分支名或 remote 名称，除非用户明确要求。

## 与本项目规则的关系

- 提交格式与发布前检查以 `.cursor/rules/02-commit.md` 为准。  
- 全流程顺序与「自动发布模式」以 `.cursor/rules/00-full-flow.md` 为准；本 Skill 保证在用户说出触发短语时，Agent 必定按上述步骤执行并实际运行命令，而不是只输出说明。
