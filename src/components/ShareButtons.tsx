'use client';

import { usePathname } from 'next/navigation';

// TODO: サイトのドメインが確定したら、こちらのURLを本番用に書き換えてください
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

const X_ICON_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  <path d="M18 6 6 18"/>
  <path d="m6 6 12 12"/>
</svg>
`;

export default function ShareButtons({ title }: { title: string }) {
  const pathname = usePathname();
  const shareUrl = `${siteUrl}${pathname}`;

  const twitterShareUrl = new URL('https://twitter.com/intent/tweet');
  twitterShareUrl.searchParams.set('url', shareUrl);
  twitterShareUrl.searchParams.set('text', title);

  return (
    <div className="flex items-center gap-4 mt-8 pt-8 border-t">
      <p className="text-lg font-semibold">この記事をシェアする:</p>
      <a
        href={twitterShareUrl.toString()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors"
        aria-label="Share on X"
      >
        <span dangerouslySetInnerHTML={{ __html: X_ICON_SVG }} />
      </a>
    </div>
  );
}
