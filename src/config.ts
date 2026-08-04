/**
 * 站点全局配置（替代原 Vue 项目的 siteStore + 后端 /api/site）
 * 静态站所有"动态配置"在此处硬编码，修改后重新构建部署即可
 */

export interface SocialLink {
  name: string
  url: string
}

export interface JourneyItem {
  date: string
  title: string
  desc: string
}

export const siteConfig = {
  // 站点名称（导航栏 + 页脚 + 首页 Hero）
  siteName: 'chengzi',
  // 站点作者
  siteAuthor: 'chengzi',
  // 作者头像（首页 Hero + 关于我；填图床外链或本地 /avatars/xxx.png）
  authorAvatar: 'https://76f2f781.cloudflare-imgbed-6ja.pages.dev/file/1785811146811_和装-125553302_1_.png',
  // 站点 Logo（导航栏品牌徽章；空则显示默认图标）
  siteLogo: 'https://76f2f781.cloudflare-imgbed-6ja.pages.dev/file/1785811184486_eee94d9fe9c4c9ceb3c61b0c5c616923.jpg',
  // 站点简介（SEO meta description）
  siteDescription: '记录技术学习与生活思考的个人博客',
  // 站点关键词（SEO meta keywords）
  siteKeywords: '博客, 技术, 编程, 全栈, Astro',
  // 页脚附加信息
  footerInfo: '用代码记录思考',
  // 备案号（无则留空）
  recordNumber: '',
  // 关于我页面正文（Markdown 字符串，支持标题、列表、加粗、链接等语法）
  aboutContent: `你好，我是 **chengzi**，一名热爱技术的开发者。

## 关于这个博客

这是一个用来记录技术学习笔记与个人思考的地方。我相信 **写作是最好的学习方式**，所以会把平时研究的内容整理成文章分享出来。

## 技术栈

- 后端：Python / FastAPI / Spring Boot/ mybatis-plus
- 数据库：MySQL / Redis / Elasticsearch
- 部署：Docker / Linux 

## 联系方式

欢迎通过下方的社交链接与我交流，期待认识更多志同道合的朋友。`,
  // 旅程时间线（关于我页面展示）
  journey: [
    { date: '2026', title: '搭建博客', desc: 'Vibecoding 个人博客，用 cloudflare 部署上线，开始记录学习笔记与技术思考。' },
  ] as JourneyItem[],
  // 社交链接（关于我页面联系方式卡片）
  socialLinks: [
    { name: 'GitHub', url: 'https://github.com/chengzitao0710' },
  ] as SocialLink[],
  // Giscus 评论配置（https://giscus.app 生成后填入）
  giscus: {
    repo: '', // 形如 'owner/repo'
    repoId: '',
    category: 'Announcements',
    categoryId: '',
    mapping: 'pathname',
    reactionsEnabled: '1',
    emitMetadata: '0',
    inputPosition: 'top',
    theme: 'preferred_color_scheme',
    lang: 'zh-CN',
  },
}

export type SiteConfig = typeof siteConfig
