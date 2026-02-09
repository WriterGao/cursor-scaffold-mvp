# Next.js 项目规范

本项目使用 **Next.js App Router** 全栈，TypeScript。请遵守以下约定。

## 目录结构

- **页面与布局**：`app/` 下按路由组织，使用 `page.tsx`、`layout.tsx`。
- **API 接口**：`app/api/` 下按资源组织，例如 `app/api/todos/route.ts`。
- **组件**：可放在 `app/` 下的 `components/` 或项目根目录 `components/`；组件文件使用 PascalCase。
- **类型与工具**：可放在 `lib/` 或 `types/`，与 API 响应保持一致。

## API 约定

- 路径：REST 风格，如 `GET/POST /api/todos`、`GET/PATCH/DELETE /api/todos/[id]`。
- 响应格式统一为：`{ code?: number, message?: string, data?: T }`，错误时使用合适 HTTP 状态码并返回 `message`。
- 使用 **Route Handlers**（`route.ts` 中的 `GET`、`POST`、`PUT`、`PATCH`、`DELETE` 等导出函数）。

## 代码风格

- TypeScript 严格模式，为 API 与组件提供明确类型。
- 不写裸 `fetch`：对 API 的调用可封装在 `lib/api.ts` 或按模块封装，便于与 `docs/design.md` 中的接口一致。
- 新页面或新 API 需与 **`docs/design.md`** 和 **`docs/requirements.md`** 一致；若尚未有设计文档，先补设计再实现。
