import { MetadataRoute } from 'next';
import { client } from '@/sanity/lib/client';

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
  const posts = await client.fetch<any>(`*[_type == "post"]{ "slug": slug.current, _updatedAt }`);
  const categories = await client.fetch<any>(`*[_type == "category"]{ "slug": slug.current }`);
  const tags = await client.fetch<any>(`*[_type == "tag"]{ "slug": slug.current }`);

  const postUrls = posts.map((post: Post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post._updatedAt),
  }));

  const categoryUrls = categories.map((category: Category) => ({
    url: `${baseUrl}/blog/category/${category.slug}`,
    lastModified: new Date(),
  }));

  const tagUrls = tags.map((tag: Tag) => ({
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
