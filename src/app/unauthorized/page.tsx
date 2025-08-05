'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-pink-100 px-4">
      <div className="bg-white shadow-lg border border-rose-200 rounded-3xl p-8 md:p-10 max-w-md w-full text-center animate-fade-in">
        <div className="flex justify-center mb-6 text-rose-500">
          <AlertTriangle size={56} strokeWidth={1.5} />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-3">Unauthorized Access</h1>

        <p className="text-gray-600 mb-6 text-sm md:text-base">
          You must be logged in to view this page. Please sign in to continue.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/api/auth/signin" passHref>
            <Button className="bg-rose-500 hover:bg-rose-600 text-white w-full">
              Login
            </Button>
          </Link>

          <Link href="/" passHref>
            <Button variant="outline" className="border-rose-300 text-rose-500 hover:text-white hover:bg-rose-500 w-full">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
