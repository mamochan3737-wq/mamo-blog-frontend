import type { Metadata } from "next";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-body",
  display: "swap",
});

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ふわっと主婦のAI副業日記 〜コーディングで叶える小さな夢〜",
  description: "プログラミングスクールで学ぶも挫折してしまった私が、AIとバイブコーディングに出会い、少しずつ副業の道を切り開いていく日々を綴ります。挫折や迷いも正直にシェアしながら、主婦目線でのAI副業の楽しさや学び方、コツをわかりやすく発信。「興味はあるけど一歩踏み出せない…」そんなあなたに、少し勇気とヒントを届けるブログです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} ${notoSerifJP.variable}`}>
      <body>
        <div className="flex flex-col min-h-screen font-body">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
