import Link from "next/link";
import React from "react";
import { FaSignInAlt, FaUserAlt, FaUserPlus } from "react-icons/fa";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 lg:px-16 lg:py-6 2xl:px-24">
      <a href="/">
        <img
          alt="Isomorphic"
          width="155"
          height="28"
          decoding="async"
          data-nimg="1"
          className="bg-transparent"
          src="https://isomorphic-furyroad.vercel.app/_next/static/media/logo.a795e14a.svg"
        />
      </a>
      <div className="flex items-center space-x-2 md:space-x-4">
        <Link
          className="inline-flex items-center gap-x-1 rounded-3xl p-2 py-1 text-sm font-medium transition-colors hover:bg-gray-200 md:px-4 md:py-2.5 [&amp;>svg]:w-4 bg-gray-100 text-gray-900 [&amp;>svg]:text-gray-900"
          href="/auth/login"
        >
          <FaSignInAlt />
          <span>Login</span>
        </Link>
        <Link
          className="inline-flex items-center gap-x-1 rounded-3xl p-2 py-1 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 md:px-4 md:py-2.5 [&amp;>svg]:w-4 [&amp;>svg]:text-gray-500"
          href="/auth/register"
        >
          <FaUserPlus />

          <span>Sign Up</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
