// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// 站点地址：优先从环境变量读取，适配多环境部署（本地 dev / 预览 / 生产）
const SITE_URL = process.env.SITE_URL || 'https://chengziblog.de5.net';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [mdx(), sitemap()],
  prefetch: true,
  markdown: {
    // 代码块语法高亮使用 shiki，主题与原 highlight.js 风格接近
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: false,
    },
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
  build: {
    // 内联小于 4KB 的样式，减少首屏请求
    inlineStylesheets: 'auto',
  },
});
