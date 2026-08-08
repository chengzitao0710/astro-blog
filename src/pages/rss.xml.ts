import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { siteConfig } from '../config';
import { getPostsByDate } from '../utils/posts';

export async function GET(context: APIContext) {
  const posts = await getPostsByDate();

  return rss({
    title: siteConfig.siteName,
    description: siteConfig.siteDescription,
    // context.site 来自 astro.config.mjs 的 site 配置
    site: context.site ?? 'https://example.com',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.summary,
      pubDate: post.data.date,
      link: `/posts/${post.id}/`,
      categories: [post.data.category, ...post.data.tags],
    })),
    customData: `<language>zh-CN</language>`,
  });
}
