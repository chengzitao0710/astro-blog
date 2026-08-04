---
title: 用 Astro 重建博客：从动态到静态
date: 2026-08-03
category: 技术
tags: [Astro, 博客, 静态站点]
cover: https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200
summary: 从 Vue + Python 后端迁移到 Astro 静态站，舍弃后端与登录系统，用 Content Collections 管理 Markdown 内容，部署到 Cloudflare Pages。
pinned: true
draft: false
---

## 为什么改用 Astro

原本的博客基于 Vue 3 + FastAPI，有完整的后台管理、评论系统、GitHub OAuth 登录。随着内容积累，维护成本变高：服务器续费、数据库备份、依赖升级……于是决定改造成纯静态站。

## 核心改造点

1. **内容源**：从 MySQL 改为 `src/content/posts/*.md`，Obsidian 写完直接复制进来
2. **评论**：后端 API 改为 Giscus（GitHub Discussions）
3. **搜索**：后端 LIKE 查询改为 Pagefind 构建时索引
4. **部署**：Docker + Nginx 改为 Cloudflare Pages 自动构建

## 代码示例

```javascript
import { getCollection } from 'astro:content';

const posts = await getCollection('posts', ({ data }) => !data.draft);
```

## 保留的设计

纯黑白渐变配色、浮动药丸导航、网格发光背景、暗色模式、Markdown 渲染样式全部保留，确保视觉一致性。

> 改造不是推翻重来，而是用更轻的方式延续同样的表达。
