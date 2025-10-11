import { client } from "@/lib/sanity.client";
import Link from "next/link";

// 型定義
interface SearchResult {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
}

// 検索クエリ
const query = `*[_type == "post" && (title match $query || pt::text(body) match $query)] 
  | score(title match $query, pt::text(body) match $query) 
  | order(_score desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt
  }`;

// ページコンポーネント
export default async function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const q = searchParams.q;

  // qが文字列でない、または空の場合は表示を切り替える
  if (typeof q !== 'string' || !q.trim()) {
    return (
      <section className="py-12">
        <h1 className="text-4xl font-bold text-center mb-12">Search</h1>
        <p className="text-center">ヘッダーの検索ボックスからキーワードを入力してください。</p>
      </section>
    );
  }

  const posts = await client.fetch(query, { query: q });

  return (
    <section className="py-12">
      <h1 className="text-2xl md:text-4xl font-bold text-center mb-12">
        検索結果: <span className="text-blue-600">&quot;{q}&quot;</span>
      </h1>
      
      {posts && posts.length > 0 ? (
        <div className="max-w-3xl mx-auto">
          <ul className="space-y-8">
            {posts.map((post) => (
              <li key={post._id}>
                <Link href={`/blog/${post.slug}`} className="block group">
                  <h2 className="text-2xl font-bold group-hover:text-blue-600 transition-colors">{post.title}</h2>
                  <p className="text-gray-600 mt-2 line-clamp-2">{post.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-center text-gray-600">検索キーワードに一致する記事が見つかりませんでした。</p>
      )}
    </section>
  );
}
