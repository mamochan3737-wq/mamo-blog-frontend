import { client, urlFor } from "@/lib/sanity.client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// 型定義
interface Post {
  _id: string;
  title: string;
  slug: string;
  mainImage: any;
  excerpt: string;
  publishedAt: string;
}

interface Tag {
  title: string;
  description?: string;
}

// クエリ
const postsQuery = `*[_type == "post" && $tag in tags[]->slug.current] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  mainImage,
  excerpt,
  publishedAt
}`;

const tagQuery = `
  *[_type == "tag" && slug.current == $tag][0]{
    title,
    description
  }
`;

// メタデータ生成
export async function generateMetadata({ params }: { params: { tag: string } }) {
  const tag = await client.fetch<any>(tagQuery, { tag: params.tag });

  if (!tag) return { title: "Tag Not Found" };
  return { title: `${tag.title} | Blog`, description: tag.description };
}

// ページコンポーネント
export default async function TagPage({ params }: { params: { tag: string } }) {
  const [posts, tag] = await Promise.all([
    client.fetch<any>(postsQuery, { tag: params.tag }),
    client.fetch<any>(tagQuery, { tag: params.tag })
  ]);

  if (!tag) {
    notFound();
  }

  return (
    <section className="py-12">
      <h1 className="text-4xl font-bold text-center mb-2">
        Tag: <span className="text-green-600">{tag.title}</span>
      </h1>
      <p className="text-center text-gray-500 mb-12">
        {posts.length} post(s) found
      </p>
      
      {posts && posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: Post) => (
            <Link key={post._id} href={`/blog/${post.slug}`} className="block group">
              <div className="overflow-hidden rounded-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300 bg-white h-full flex flex-col">
                {post.mainImage && (
                  <div className="relative w-full h-48">
                    <Image
                      src={urlFor(post.mainImage).width(400).height(300).url()}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6 flex-grow flex flex-col">
                  <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed line-clamp-3 mb-4 flex-grow">
                    {post.excerpt}
                  </p>
                  <time dateTime={post.publishedAt} className="text-sm text-gray-500 self-start">
                    {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
                  </time>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">このタグの記事はまだありません。</p>
      )}
    </section>
  );
}
