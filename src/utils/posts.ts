import { getCollection, type CollectionEntry } from 'astro:content';

/**
 * 获取所有非草稿文章，按发布日期降序排列。
 * 置顶文章（pinned）自动排前。
 */
export async function getAllPosts(): Promise<CollectionEntry<'posts'>[]> {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.sort((a, b) => {
    // 置顶优先
    const pinDiff = Number(b.data.pinned) - Number(a.data.pinned);
    if (pinDiff !== 0) return pinDiff;
    return b.data.date.getTime() - a.data.date.getTime();
  });
}

/**
 * 获取所有非草稿文章，纯按日期降序（不置顶排序）。
 * 用于归档、上下篇导航等需要纯时间线的场景。
 */
export async function getPostsByDate(): Promise<CollectionEntry<'posts'>[]> {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/**
 * 从文章 data 中提取封面图 URL。
 * 支持图床外链（string）和本地图片（image() 对象）两种格式。
 */
export function getCoverUrl(post: CollectionEntry<'posts'>): string | undefined {
  const cover = post.data.cover;
  if (!cover) return undefined;
  return typeof cover === 'string' ? cover : cover.src;
}

/**
 * 获取相关文章（基于分类和标签匹配度）。
 * 返回最多 count 篇，排除当前文章自身。
 */
export async function getRelatedPosts(
  currentPost: CollectionEntry<'posts'>,
  count = 3,
): Promise<CollectionEntry<'posts'>[]> {
  const allPosts = await getPostsByDate();
  const currentTags = new Set(currentPost.data.tags);
  const currentCategory = currentPost.data.category;

  const scored = allPosts
    .filter((p) => p.id !== currentPost.id)
    .map((p) => {
      let score = 0;
      // 同分类 +2
      if (p.data.category === currentCategory) score += 2;
      // 标签交集，每个 +1
      const sharedTags = p.data.tags.filter((t) => currentTags.has(t));
      score += sharedTags.length;
      return { post: p, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, count).map((s) => s.post);
}
