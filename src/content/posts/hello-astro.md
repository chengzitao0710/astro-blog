---
title: 用 Astro 重建博客：从动态到静态
date: 2026-08-03
category: 技术
tags:
  - Astro
  - 博客
  - 静态站点
cover: https://76f2f781.cloudflare-imgbed-6ja.pages.dev/file/blog/1785923382206_【哲风壁纸】插画-漫威-漫威宇宙.png
summary: 从 Vue + Python 后端迁移到 Astro 静态站，舍弃后端与登录系统，用 Content Collections 管理 Markdown 内容，部署到 Cloudflare Pages。
pinned: true
draft: false
---

## 为什么改用 Astro

原本的博客基于 Vue 3 + FastAPI，有完整的后台管理、评论系统、GitHub OAuth 登录。随着功能的添加，维护成本变高：服务器成本、数据库备份、依赖升级……于是决定改造成纯静态站。

## 核心改造点

1. **内容源**：从 MySQL 改为 `src/content/posts/*.md`，Obsidian 写完直接复制进来
2. **评论**：后端 API 改为 Giscus（GitHub Discussions）
3. **搜索**：后端 LIKE 查询改为 Pagefind 构建时索引
4. **部署**：Docker + Nginx 改为 Cloudflare Pages 自动构建

## 实现

 博客主要是使用`VibeCoding`实现，使用的`AI`产品时`Trae`。刚开始本来是想实现一个完整的前后端项目，但是去搜索服务器的相关信息，长期使用的话，成本也是不小，所以在`b站`上搜索了一些博客的构建，了解到静态网站的部署，基于`cloudflare`的免费计划部署，又基于开源项目[CloudFlare-ImgBed](https://github.com/MarSeventh/CloudFlare-ImgBed) 部署了自己的图床。在实现的过程中前面主要使用`Trae IDE`进行构建，好像是**2026年7月31日**软件实行了积分机制 ，在积分使用完之后转到了`TRAE Work`产品的使用，新人注册又**2000**积分，每天登录能够领**200**积分，而且还能添加插件。不过，积分的消耗是比较快的，在交流过程，你让它解决两三个小问题，就要使用差不都两百积分。不过，每天优化一个小问题还是没问题的。
 
## 代码示例

```javascript
import { getCollection } from 'astro:content';

const posts = await getCollection('posts', ({ data }) => !data.draft);
```

## 保留的设计

纯黑白渐变配色、浮动药丸导航、网格发光背景、暗色模式、Markdown 渲染样式全部保留，确保视觉一致性。

## 页面展示

![image.png](https://76f2f781.cloudflare-imgbed-6ja.pages.dev/file/blog/1786023292575_image.png)

![image.png](https://76f2f781.cloudflare-imgbed-6ja.pages.dev/file/blog/1786023343938_image.png)

![image.png](https://76f2f781.cloudflare-imgbed-6ja.pages.dev/file/blog/1786023375329_image.png)

![image.png](https://76f2f781.cloudflare-imgbed-6ja.pages.dev/file/blog/1786023410544_image.png)

![image.png](https://76f2f781.cloudflare-imgbed-6ja.pages.dev/file/blog/1786023446666_image.png)

![image.png](https://76f2f781.cloudflare-imgbed-6ja.pages.dev/file/blog/1786023485682_image.png)

我的[Github](https://github.com/chengzitao0710)

> 改造不是推翻重来，而是用更轻的方式延续同样的表达。
