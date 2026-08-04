// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// 站点地址（部署后改为实际域名，影响 RSS / sitemap 绝对链接）
// Cloudflare Pages 部署后请在此处填入正式域名
const SITE_URL = 'https://chengziblog.de5.net';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [mdx(), sitemap()],
  markdown: {
    // 代码块语法高亮使用 shiki，主题与原 highlight.js 风格接近
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: true,
    },
  },
  build: {
    // 内联小于 4KB 的样式，减少首屏请求
    inlineStylesheets: 'auto',
  },
});
