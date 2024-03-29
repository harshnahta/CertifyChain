import { memo } from 'react';
import Link from 'next/link';

const Layout = () => {
  return (
    <nav className="fixed top-0 w-screen flex items-center justify-between flex-wrap bg-white p-6">
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-black border-black hover:text-blue-400 hover:border-blue-400">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link
            href="/"
            className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-blue-400 mr-4"
          >
            Add Certificate
          </Link>
          <Link
            href="/search-certificate"
            className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-blue-400 mr-4"
          >
            Search Certificate
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default memo(Layout);
