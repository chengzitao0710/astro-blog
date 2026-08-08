/**
 * 格式化日期为 YYYY-MM-DD
 */
export const formatDate = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

/**
 * 格式化日期为 MM-DD（适合按年分组的归档页）
 */
export const formatShortDate = (date: Date): string => {
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${m}-${d}`;
};

/**
 * 剥离 Markdown 语法，提取纯文本用于字数统计。
 * 去除代码块、行内代码、图片、链接 URL、HTML 标签、frontmatter 等。
 */
function stripMarkdown(text: string): string {
  return text
    // 去除 frontmatter（文件开头的 --- ... --- 块）
    .replace(/^---[\s\S]*?---\n?/, '')
    // 去除围栏代码块 ```...```
    .replace(/```[\s\S]*?```/g, '')
    // 去除行内代码 `code`
    .replace(/`[^`]+`/g, '')
    // 去除图片 ![alt](url)
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    // 去除链接 [text](url) → 保留 text
    .replace(/\[([^\]]*)\]\([^)]+\)/g, '$1')
    // 去除 HTML 标签
    .replace(/<[^>]+>/g, '')
    // 去除 Markdown 标题符号、列表符号、引用符号等
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^[-*+]\s+/gm, '')
    .replace(/^>\s+/gm, '')
    // 去除粗体/斜体标记
    .replace(/(\*{1,3}|_{1,3})(.+?)\1/g, '$2')
    // 去除水平分割线
    .replace(/^(-{3,}|\*{3,}|_{3,})$/gm, '')
    // 去除 KaTeX 公式
    .replace(/\$\$[\s\S]*?\$\$/g, '')
    .replace(/\$[^$]+\$/g, '');
}

/**
 * 估算中文文章阅读时间（约 300 字/分钟）
 * 自动剥离 Markdown 语法和代码块，只统计正文文字。
 */
export const getReadingTime = (text: string): number => {
  const plainText = stripMarkdown(text);
  const charCount = plainText.replace(/\s+/g, '').length;
  return Math.max(1, Math.ceil(charCount / 300));
};

/**
 * 统计文章字数（剥离 Markdown 后的纯文字数）
 */
export const getWordCount = (text: string): number => {
  const plainText = stripMarkdown(text);
  return plainText.replace(/\s+/g, '').length;
};
