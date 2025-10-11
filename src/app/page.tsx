import { client, urlFor } from "@/lib/sanity.client";
import Image from "next/image";
import Link from "next/link";

// GROQクエリ
const query = `*[_type == "post"] | order(publishedAt desc) [0...3] {
  _id,
  title,
  "slug": slug.current,
  mainImage,
  excerpt
}`;

// 型定義
interface Post {
  _id: string;
  title: string;
  slug: string;
  mainImage: any;
  excerpt: string;
}

export default async function Home() {
  const posts = await client.fetch(query);

  return (
    <>
      {/* Hero Section */}
      <section className="text-center py-20">
        <div className="w-[150px] h-[150px] rounded-full mx-auto bg-gray-200 mb-8 flex items-center justify-center">
          <span className="text-gray-400">Image</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          mamoのブログ
        </h1>
        <p className="text-lg text-gray-600">
          WordPressからの脱却を目指して。
        </p>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50 -mx-4 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">自己紹介</h2>
          <p className="text-gray-700 leading-relaxed">
            ここに自己紹介文が入ります。これまでの経歴やスキル、このブログで発信していきたいことなどを記述します。
            柔軟なカスタマイズが可能なシステムを実現するために、Next.jsとSanityを使ってこのブログを構築しています。
          </p>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">実績・経歴</h2>
          <div className="relative border-l-2 border-gray-200 pl-6">
            {/* Timeline Item 1 */}
            <div className="mb-10 relative">
              <div className="absolute -left-[34.5px] w-4 h-4 bg-blue-500 rounded-full mt-1.5 border-2 border-white"></div>
              <time className="text-sm font-semibold text-gray-500">2023 - 現在</time>
              <h3 className="text-xl font-bold text-gray-800 mt-1">役職・プロジェクト名 1</h3>
              <p className="text-gray-600 mt-2">
                ここには、その期間における具体的な業務内容や達成したこと、使用した技術などを記述します。
              </p>
            </div>
            {/* Timeline Item 2 */}
            <div className="mb-10 relative">
              <div className="absolute -left-[34.5px] w-4 h-4 bg-blue-500 rounded-full mt-1.5 border-2 border-white"></div>
              <time className="text-sm font-semibold text-gray-500">2021 - 2023</time>
              <h3 className="text-xl font-bold text-gray-800 mt-1">役職・プロジェクト名 2</h3>
              <p className="text-gray-600 mt-2">
                ここには、その期間における具体的な業務内容や達成したこと、使用した技術などを記述します。
              </p>
            </div>
            {/* Timeline Item 3 */}
            <div className="relative">
              <div className="absolute -left-[34.5px] w-4 h-4 bg-blue-500 rounded-full mt-1.5 border-2 border-white"></div>
              <time className="text-sm font-semibold text-gray-500">2020 - 2021</time>
              <h3 className="text-xl font-bold text-gray-800 mt-1">役職・プロジェクト名 3</h3>
              <p className="text-gray-600 mt-2">
                ここには、その期間における具体的な業務内容や達成したこと、使用した技術などを記述します。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="py-20 bg-gray-50 -mx-4 px-4">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">最新ブログ記事</h2>
          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post._id} href={`/blog/${post.slug}`} className="block group">
                  <div className="overflow-hidden rounded-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300 bg-white">
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
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">記事がまだありません。</p>
          )}
        </div>
      </section>
    </>
  );
}
