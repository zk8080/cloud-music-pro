// api/proxy.js
// 该服务为 vercel serve跨域处理
import { createProxyMiddleware } from "http-proxy-middleware";

module.exports = (req, res) => {
  let target = "";
  // 代理目标地址
  // 这里使用 backend 主要用于区分 vercel serverless 的 api 路径
  // target 替换为你跨域请求的服务器 如： http://baidu.com
  if (req.url.startsWith("/api")) {
    target = "https://netease-cloud-music-api-mu-self.vercel.app/";
  }
  // 创建代理对象并转发请求
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      // 通过路径重写，去除请求路径中的 `/api`
      // 例如 /api/user/login 将被转发到 https://netease-cloud-music-api-mu-self.vercel.app/user/login
      "^/api/": "/"
    }
  })(req, res);
};
