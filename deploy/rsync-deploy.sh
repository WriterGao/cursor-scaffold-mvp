#!/usr/bin/env bash
# 将本地 out/ 通过 rsync 同步到自建服务器
# 用法：在项目根目录执行
#   DEPLOY_HOST=1.2.3.4 DEPLOY_USER=www DEPLOY_PATH=/var/www/cursor-scaffold-mvp ./deploy/rsync-deploy.sh
# 或：./deploy/rsync-deploy.sh 1.2.3.4 www /var/www/cursor-scaffold-mvp
# 前置：本地已执行 npm run build，且 SSH 免密或密钥已配置

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
OUT_DIR="$ROOT_DIR/out"

if [[ ! -d "$OUT_DIR" ]]; then
  echo "错误：未找到 out/ 目录，请先在项目根目录执行 npm run build"
  exit 1
fi

if [[ -n "$3" ]]; then
  DEPLOY_HOST="${1}"
  DEPLOY_USER="${2}"
  DEPLOY_PATH="${3}"
fi

if [[ -z "$DEPLOY_HOST" || -z "$DEPLOY_USER" || -z "$DEPLOY_PATH" ]]; then
  echo "用法："
  echo "  环境变量：DEPLOY_HOST=主机 DEPLOY_USER=用户 DEPLOY_PATH=远程目录 $0"
  echo "  或参数：  $0 <主机> <用户> <远程目录>"
  exit 1
fi

RSYNC_TARGET="${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}"
echo "同步 out/ -> ${RSYNC_TARGET}"
rsync -avz --delete "$OUT_DIR/" "$RSYNC_TARGET/"
echo "部署完成。"
