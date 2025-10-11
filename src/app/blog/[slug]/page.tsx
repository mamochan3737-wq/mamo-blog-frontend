import { client, urlFor } from "@/lib/sanity.client";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import type { Metadata } from 'next';

// TODO: 本番環境のドメインに置き換えてください
const baseUrl = 'https://your-domain.com';

// 型定義
interface Post {
  title: string;
  mainImage: any;
  publishedAt: string;
  _updatedAt: string;
  excerpt: string;
  body: any[];
  author: { name: string };
  categories: { title: string; slug: string; }[];
  tags: { title: string; slug: string; }[];
}

// GROQクエリ
const query = `*[_type == "post" && slug.current == $slug][0] {
  title,
  mainImage,
  publishedAt,
  _updatedAt,
  excerpt,
  body,
  "author": author->{name},
  "categories": categories[]->{title, "slug": slug.current},
  "tags": tags[]->{title, "slug": slug.current}
}`;

// 動的なメタデータ（ページのタイトルなど）を生成する関数
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await client.fetch(query, { slug: params.slug });
  if (!post) {
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist.",
    };
  }

  const imageUrl = post.mainImage ? urlFor(post.mainImage).width(1200).height(630).fit('crop').url() : null;

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${baseUrl}/blog/${params.slug}`,
      siteName: 'mamo-blog',
      type: 'article',
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : [],
      images: imageUrl ? [{ url: imageUrl }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await client.fetch(query, { slug: params.slug });

  if (!post) {
    notFound(); // 記事が見つからない場合は404ページを表示
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    datePublished: post.publishedAt,
    dateModified: post._updatedAt,
    description: post.excerpt,
    image: post.mainImage ? urlFor(post.mainImage).width(1200).height(627).fit('crop').url() : undefined,
    author: {
      '@type': 'Person',
      name: post.author?.name || 'mamo-blog',
    },
    publisher: {
      '@type': 'Organization',
      name: 'mamo-blog',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`, // ロゴ画像はpublicフォルダに配置想定
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${params.slug}`,
    },
  };

  return (
    <article className="py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">{post.title}</h1>
      <div className="text-center text-gray-500 mb-8">
        <span>By {post.author?.name || 'Unknown Author'}</span>
        <span className="mx-2">•</span>
        <time dateTime={post.publishedAt}>
          {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
        </time>
      </div>

      {/* Category and Tag Badges */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {post.categories?.map((category) => (
          <Link
            key={category.slug}
            href={`/blog/category/${category.slug}`}
            className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold hover:bg-gray-300 transition-colors"
          >
            {category.title}
          </Link>
        ))}
        {post.tags?.map((tag) => (
          <Link
            key={tag.slug}
            href={`/blog/tag/${tag.slug}`}
            className="bg-green-100 text-green-800 rounded-full px-3 py-1 text-sm font-semibold hover:bg-green-200 transition-colors"
          >
            #{tag.title}
          </Link>
        ))}
      </div>

      {post.mainImage && (
        <div className="relative w-full h-96 mb-12">
          <Image
            src={urlFor(post.mainImage).url()}
            alt={post.title}
            fill
            className="object-cover rounded-lg shadow-lg"
          />
        </div>
      )}

      {/* 本文の表示エリア */}
      <div className="prose lg:prose-xl max-w-3xl mx-auto">
        <PortableText value={post.body} />
      </div>
    </article>
  );
}
