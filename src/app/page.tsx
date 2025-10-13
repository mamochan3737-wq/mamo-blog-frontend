import { client, urlFor } from "@/lib/sanity.client";
import Image from "next/image";
import Link from "next/link";
import FadeInOnScroll from "@/components/FadeInOnScroll";

// クエリ
const postsQuery = `*[_type == "post"] | order(publishedAt desc) [0...3] {
  _id,
  title,
  "slug": slug.current,
  mainImage,
  excerpt
}`;

const authorQuery = `*[_type == "author"][0] {
  image
}`;

// 型定義
interface Post {
  _id: string;
  title: string;
  slug: string;
  mainImage: any;
  excerpt: string;
}

interface Author {
  image: any;
}

export default async function Home() {
  const [posts, author] = await Promise.all([
    client.fetch<Post[]>(postsQuery),
    client.fetch<Author>(authorQuery)
  ]);

  return (
    <>
      {/* Hero Section */}
      <section className="text-center py-20">
        {author?.image && (
          <div className="relative w-40 h-40 rounded-full mx-auto mb-8 shadow-lg">
            <Image 
              src={urlFor(author.image).url()}
              alt="プロフィール画像"
              fill
              className="rounded-full object-cover"
            />
          </div>
        )}
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
          ふわっと主婦のAI副業日記
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          〜プログラミング挫折から「バイブコーディング」と出会うまで〜
        </p>
      </section>

      {/* About Section */}
      <FadeInOnScroll>
        <section className="py-16 bg-gray-50 -mx-4 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">自己紹介</h2>
            <p className="text-gray-700 leading-relaxed">
              プログラミングスクールで学ぶも挫折してしまった私が、AIとバイブコーディングに出会い、少しずつ副業の道を切り開いていく日々を綴ります。挫折や迷いも正直にシェアしながら、主婦目線でのAI副業の楽しさや学び方、コツをわかりやすく発信。「興味はあるけど一歩踏み出せない…」そんなあなたに、少し勇気とヒントを届けるブログです。
            </p>
          </div>
        </section>
      </FadeInOnScroll>

      {/* Experience Section */}
      <FadeInOnScroll>
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold mb-12 text-center">実績・経歴</h2>
            <div className="relative border-l-2 border-gray-200 pl-6">
              {/* Timeline Item 1 */}
              <div className="mb-10 relative">
                <div className="absolute -left-[34.5px] w-4 h-4 bg-rose-500 rounded-full mt-1.5 border-2 border-white"></div>
                <time className="text-sm font-semibold text-gray-500">2023 - 現在</time>
                <h3 className="text-xl font-bold mt-1">役職・プロジェクト名 1</h3>
                <p className="text-gray-600 mt-2">
                  ここには、その期間における具体的な業務内容や達成したこと、使用した技術などを記述します。
                </p>
              </div>
              {/* Timeline Item 2 */}
              <div className="mb-10 relative">
                <div className="absolute -left-[34.5px] w-4 h-4 bg-rose-500 rounded-full mt-1.5 border-2 border-white"></div>
                <time className="text-sm font-semibold text-gray-500">2021 - 2023</time>
                <h3 className="text-xl font-bold mt-1">役職・プロジェクト名 2</h3>
                <p className="text-gray-600 mt-2">
                  ここには、その期間における具体的な業務内容や達成したこと、使用した技術などを記述します。
                </p>
              </div>
              {/* Timeline Item 3 */}
              <div className="relative">
                <div className="absolute -left-[34.5px] w-4 h-4 bg-rose-500 rounded-full mt-1.5 border-2 border-white"></div>
                <time className="text-sm font-semibold text-gray-500">2020 - 2021</time>
                <h3 className="text-xl font-bold mt-1">役職・プロジェクト名 3</h3>
                <p className="text-gray-600 mt-2">
                  ここには、その期間における具体的な業務内容や達成したこと、使用した技術などを記述します。
                </p>
              </div>
            </div>
          </div>
        </section>
      </FadeInOnScroll>

      {/* Latest Posts Section */}
      <FadeInOnScroll>
        <section className="py-20 bg-gray-50 -mx-4 px-4">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold mb-12 text-center">最新ブログ記事</h2>
            {posts && posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post: Post) => (
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
                        <h3 className="text-xl font-bold mb-2 group-hover:text-rose-600 transition-colors">
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
      </FadeInOnScroll>
    </>
  );
}
