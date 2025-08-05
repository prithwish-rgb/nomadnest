// components/Footer.tsx
"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className=" w-full bg-gradient-to-r from-rose-100 via-violet-100 to-rose-100 text-gray-800 px-6 md:px-16 py-5 mt-5 border-t border-gray-200 shadow-inner">

      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-bold text-violet-500">NomadNest</h3>
          <p className="text-sm mt-2">Craft your perfect journey with AI.</p>
        </div>

        <div>
          <h4 className="text-md font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li><Link href="/" className="hover:text-violet-500 transition-colors duration-300">Home</Link></li>
            <li><Link href="/explore" className="hover:text-violet-500 transition-colors duration-300">Explore</Link></li>
            <li><Link href="/saved" className="hover:text-violet-500 transition-colors duration-300">Saved Plans</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-md font-semibold mb-2">Pages</h4>
          <ul className="space-y-1 text-sm">
            <li><Link href="/about" className="hover:text-violet-500 transition-colors duration-300">About</Link></li>
            <li><Link href="/contact" className="hover:text-violet-500 transition-colors duration-300">Contact</Link></li>
            <li><Link href="/terms" className="hover:text-violet-500 transition-colors duration-300">Terms</Link></li>
            <li><Link href="/privacy" className="hover:text-violet-500 transition-colors duration-300">Privacy</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-md font-semibold mb-2">Get in Touch</h4>
          <p className="text-sm">Have feedback or questions? <br />We’d love to hear from you!</p>
          <Link href="/contact" className="inline-block mt-2 text-violet-500 hover:underline text-sm">
            Contact Us →
          </Link>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-10">
        &copy; {new Date().getFullYear()} NomadNest. All rights reserved.
      </div>
    </footer>
  );
}
