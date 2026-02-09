# Cursor 自然语言全流程脚手架（MVP）

用 **自然语言** 描述需求，由 Cursor 按规范完成：需求设计 → 方案设计 → 代码实现 → 测试 → 提交准备 → 发布。

## 技术栈（首轮固定）

- **Next.js 全栈**（App Router + API Routes）+ TypeScript + Tailwind
- **测试**：Vitest + React Testing Library
- **部署**：Netlify（连 GitHub 即自动部署）

## 怎么用

1. **在 Cursor 里用自然语言提需求**  
   例如：「做一个待办列表，能增删改查，要能部署到网上。」

2. **让 Cursor 按全流程执行**  
   项目已配置 `.cursor/rules/`，Agent 会按顺序：
   - 先写 `docs/requirements.md`（需求）
   - 再写 `docs/design.md`（方案）
   - 再按 design 实现代码
   - 写测试并跑 `npm run test` 通过
   - 生成 Conventional Commit 信息（并可执行 commit）

3. **本地开发**
   ```bash
   npm install   # 若未安装依赖
   npm run dev   # 开发
   npm run test  # 测试
   npm run build # 构建
   ```

4. **发布**  
   - 本地在 **Node.js >= 20.9.0** 的环境中先执行：  
     `npm run test` 与 `npm run build`，确保测试与构建均通过。  
   - 把本仓库用 GitHub 连接到 [Netlify](https://www.netlify.com/)，在 Netlify 中将 **Build command** 配置为 `npm run build`，**Publish directory** 配置为 `out`，**push 到 main 即自动构建并发布**，无需在项目里写部署脚本。

## 项目结构

- `.cursor/rules/`：全流程、Next.js、提交约定（Cursor 必读）
- `docs/requirements.md`、`docs/design.md`：需求与方案（由 Cursor 按需求填写）
- `app/`：页面与 API（Next.js App Router）

## 建议 Node 版本

Next.js 16 与当前 Vitest 推荐 **Node.js >= 20**。若本地为 Node 18，可 `nvm use 20` 或升级 Node 后再 `npm install` 与 `npm run test`。

（本行用于测试自动部署，可根据需要删除。）
