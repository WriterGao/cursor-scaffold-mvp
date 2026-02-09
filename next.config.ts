import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * 使用静态导出，`next build` 会在 `out/` 目录生成静态文件，
   * 方便部署到 Netlify、GitHub Pages 等静态托管平台。
   */
  output: "export",
};

export default nextConfig;
