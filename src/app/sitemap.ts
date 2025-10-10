import { MetadataRoute } from 'next';
import { client } from '@/lib/sanity.client';

// TODO: 本番環境のドメインに置き換えてください
const baseUrl = 'https://your-domain.com';

interface Post {
  slug: string;
  _updatedAt: string;
}
interface Category {
  slug: string;
}
interface Tag {
  slug: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 動的ルートの情報を取得
  const posts: Post[] = await client.fetch(`*[_type == "post"]{ "slug": slug.current, _updatedAt }`);
  const categories: Category[] = await client.fetch(`*[_type == "category"]{ "slug": slug.current }`);
  const tags: Tag[] = await client.fetch(`*[_type == "tag"]{ "slug": slug.current }`);

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post._updatedAt),
  }));

  const categoryUrls = categories.map((category) => ({
    url: `${baseUrl}/blog/category/${category.slug}`,
    lastModified: new Date(),
  }));

  const tagUrls = tags.map((tag) => ({
    url: `${baseUrl}/blog/tag/${tag.slug}`,
    lastModified: new Date(),
  }));

  // 静的ルート
  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
    },
  ];

  return [...staticUrls, ...postUrls, ...categoryUrls, ...tagUrls];
}
