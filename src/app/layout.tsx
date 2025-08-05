
import "./globals.css";
import Providers from "./providers";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import ErrorBoundary from "@/components/ErrorBoundary";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NomadNest - AI-Powered Travel Planning",
  description: "Plan your next adventure with AI magic. Generate personalized travel itineraries for destinations worldwide.",
  keywords: "travel planning, AI itinerary, vacation planner, trip generator",
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "NomadNest - AI-Powered Travel Planning",
    description: "Plan your next adventure with AI magic",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Providers>
          <ErrorBoundary>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
            </div>
          </ErrorBoundary>
        </Providers>
      </body>
    </html>
  );
}

