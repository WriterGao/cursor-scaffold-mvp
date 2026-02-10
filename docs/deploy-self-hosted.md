# 自建服务器与 Docker 部署

本项目使用 Next.js 静态导出（`output: "export"`），`npm run build` 生成 `out/` 目录（纯 HTML/CSS/JS），**运行时不需要 Node**，可用 Nginx 托管或 Docker 内 Nginx 托管。

## 一、自建服务器（Nginx 托管 out/）

### 前置条件

- 服务器已安装 Nginx、开放 80（或其它端口）。
- 本机或 CI 能通过 SSH 访问服务器（免密或密钥）。

### 服务器准备

1. 创建站点目录，例如：
   ```bash
   sudo mkdir -p /var/www/cursor-scaffold-mvp
   sudo chown "$USER" /var/www/cursor-scaffold-mvp
   ```
2. Nginx 配置：复制 [deploy/nginx.conf.example](../deploy/nginx.conf.example) 到服务器（如 `/etc/nginx/sites-available/cursor-scaffold-mvp`），修改其中的 `root` 为上述目录，启用站点并重载：
   ```bash
   sudo ln -s /etc/nginx/sites-available/cursor-scaffold-mvp /etc/nginx/sites-enabled/
   sudo nginx -t && sudo nginx -s reload
   ```

### 部署方式 A：本地脚本 rsync

在项目根目录执行 `npm run build` 后，用脚本把 `out/` 同步到服务器：

```bash
# 环境变量方式
DEPLOY_HOST=你的服务器IP或域名 DEPLOY_USER=登录用户 DEPLOY_PATH=/var/www/cursor-scaffold-mvp ./deploy/rsync-deploy.sh

# 或参数方式
chmod +x deploy/rsync-deploy.sh
./deploy/rsync-deploy.sh 你的服务器IP 登录用户 /var/www/cursor-scaffold-mvp
```

需事先配置 SSH 免密或密钥，保证 `rsync` 能访问 `DEPLOY_USER@DEPLOY_HOST`。

### 部署方式 B：GitHub Actions 自动部署

push 到 `main` 时会触发 [.github/workflows/deploy-self-hosted.yml](../.github/workflows/deploy-self-hosted.yml)：在 GitHub 上构建、测试、生成 `out/`，再通过 SSH 将 `out/` 同步到你的服务器。

**所需 Secrets**（仓库 Settings → Secrets and variables → Actions）：

| Secret 名称         | 说明                         |
|---------------------|------------------------------|
| `SSH_PRIVATE_KEY`   | 部署用 SSH 私钥（完整内容）   |
| `DEPLOY_HOST`       | 服务器 IP 或域名              |
| `DEPLOY_USER`       | SSH 登录用户名                |
| `DEPLOY_PATH`       | 服务器上静态文件根目录，如 `/var/www/cursor-scaffold-mvp` |

未配置上述 Secrets 时，workflow 仍会执行构建与测试，仅部署步骤会因条件不满足而跳过，不会报错。

**流程**：每次 push 到 `main` → 构建 + 测试 → 上传 `out/` 为 artifact → 部署 job 下载 artifact 并通过 rsync 推到 `DEPLOY_PATH`。

---

## 二、Docker 部署

### 构建与运行

在项目根目录：

```bash
# 构建镜像
docker build -t cursor-scaffold-mvp .

# 运行（映射到本机 3000 端口）
docker run -p 3000:80 cursor-scaffold-mvp
```

浏览器访问 `http://localhost:3000`。

### 使用 docker-compose

```bash
docker compose up -d
```

默认映射 3000:80。停止：`docker compose down`。

### 从 GitHub Container Registry (GHCR) 拉取（可选）

若在 CI 中增加「构建并推送 Docker 镜像」的 job，服务器上可定期或通过 webhook 执行：

```bash
docker pull ghcr.io/你的用户名/cursor-scaffold-mvp:latest
docker compose up -d
```

具体 GHCR 的配置与 workflow 写法可在现有 deploy-self-hosted 流程上增加一个 job，使用 `docker/build-push-action` 与 `docker/login-action`（GHCR）即可，此处不展开。

---

## 三、与 Netlify 的关系

- 不修改、不删除现有 Netlify 配置；push 到 `main` 后 Netlify 仍会按原样部署。
- 自建部署由 GitHub Actions 在 push 时额外执行；若未配置 `DEPLOY_*` 与 `SSH_PRIVATE_KEY`，仅自建部署步骤跳过，Netlify 不受影响。
- 若希望只保留自建部署，可在 Netlify 后台断开仓库或关闭自动部署。

---

## 四、构建环境说明

- **构建**需 Node ≥ 20.9.0（本地、Docker 构建阶段、GitHub Actions 均使用 Node 20）。
- **运行时**仅需 Nginx 或 Docker 提供的 Nginx，无需在服务器上安装 Node。
