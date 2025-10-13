import Link from 'next/link';
import SearchBox from './SearchBox';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold font-heading text-rose-600">
          mamo-blog
        </Link>
        <nav className="hidden md:flex space-x-6 items-center">
          <Link href="/" className="text-gray-600 hover:text-rose-600 transition-colors">
            ホーム
          </Link>
          <Link href="/blog" className="text-gray-600 hover:text-rose-600 transition-colors">
            ブログ
          </Link>
          {/* TODO: Add other navigation links */}
        </nav>
        <div>
          <SearchBox />
        </div>
      </div>
    </header>
  );
};

export default Header;
