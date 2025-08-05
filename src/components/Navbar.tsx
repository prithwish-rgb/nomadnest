"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import Logo from "./Logo";
import ClientOnly from "./ClientOnly";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="w-full px-4 md:px-8 py-4 flex justify-between items-center bg-white border-b border-gray-200 shadow-md z-50">
      <Link
        href="/"
        className="text-[22px] font-bold text-violet-500 hover:text-violet-600 transition-all"
      >
        <Logo />
      </Link>

      <div className="flex gap-4 items-center text-sm font-medium">
        <Link
          href="/explore"
          className="text-violet-500 hover:text-violet-600 transition-all"
        >
          Explore
        </Link>

        <Link
          href="/saved"
          className="text-violet-500 hover:text-violet-600 transition-all"
        >
          Saved
        </Link>

        <Link
          href="/about"
          className="text-violet-500 hover:text-violet-600 transition-all"
        >
          About
        </Link>

        <Link
          href="/contact"
          className="text-violet-500 hover:text-violet-600 transition-all"
        >
          Contact
        </Link>

        <ClientOnly fallback={
          <Button className="bg-violet-500 hover:bg-violet-600 text-white px-4 py-1 rounded-xl shadow-md shadow-violet-200 transition-all">
            Loading...
          </Button>
        }>
          {session ? (
            <Button
              onClick={() => signOut()}
              className="bg-violet-500 hover:bg-violet-600 text-white px-4 py-1 rounded-xl shadow-md shadow-violet-200 transition-all"
            >
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => signIn()}
              className="bg-violet-500 hover:bg-violet-600 text-white px-4 py-1 rounded-xl shadow-md shadow-violet-200 transition-all"
            >
              Login
            </Button>
          )}
        </ClientOnly>
      </div>
    </nav>
  );
}
