"use client";

import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-white rounded-lg shadow dark:bg-gray-800 w-full">
      <div className="w-full mx-auto max-w-screen-xl p-4 flex flex-col items-center justify-center">
        <span className="text-sm text-gray-500 dark:text-gray-400 text-center">
          © 2023{" "}
          <Link href="/" className="hover:underline">
            Recipes™
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};
