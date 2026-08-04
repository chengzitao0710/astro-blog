import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 文章集合：src/content/posts/*.md
// Obsidian 导出的 md 文件放入此目录即可发布
const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      category: z.string().default('未分类'),
      tags: z.array(z.string()).default([]),
      // 封面图：支持图床外链（string）或本地图片（image()）
      cover: z.union([image(), z.string()]).optional(),
      summary: z.string().default(''),
      // 是否置顶（首页排序优先）
      pinned: z.boolean().default(false),
      // 草稿：true 时不会在生产构建输出，dev 模式可见
      draft: z.boolean().default(false),
    }),
});

export const collections = { posts };
