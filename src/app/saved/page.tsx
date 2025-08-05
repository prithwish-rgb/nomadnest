"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Trash, Copy, LogIn, Lock } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

type ItineraryType = {
  _id: string;
  destination: string;
  itinerary: string;
};

export default function SavedPage() {
  const { status } = useSession();
  const router = useRouter();
  const [itineraries, setItineraries] = useState<ItineraryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // If user is not authenticated, don't fetch data
    if (status === "unauthenticated") {
      setLoading(false);
      return;
    }

    // If still loading session, wait
    if (status === "loading") {
      return;
    }

    const fetchItineraries = async () => {
      try {
        const res = await fetch("/api/itinerary");

        if (!res.ok) {
          const errData = await res.json();
          if (res.status === 401) {
            setError("Please log in to view your saved itineraries.");
          } else {
            setError(errData.error || "Something went wrong.");
          }
          setLoading(false);
          return;
        }

        const data = await res.json();

        if (Array.isArray(data.itineraries)) {
          setItineraries(data.itineraries);
        } else {
          console.error("Expected `itineraries` to be an array, got:", data);
          setError("Unexpected data format.");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch itineraries.");
      } finally {
        setLoading(false);
      }
    };

    fetchItineraries();
  }, [status]);

  // Show loading while checking authentication
  if (status === "loading") {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </main>
    );
  }

  // Show login prompt for unauthenticated users
  if (status === "unauthenticated") {
    return (
      <main className="min-h-screen bg-gradient-to-br from-rose-50 via-rose-100 to-violet-50 flex items-center justify-center px-4">
        <Card className="max-w-md w-full bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <Lock className="h-12 w-12 text-violet-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Access Required
            </h1>
            <p className="text-gray-600 mb-6">
              Please log in to view and manage your saved itineraries.
            </p>
            <div className="space-y-3">
              <Button
                onClick={() => router.push('/')}
                className="w-full bg-violet-500 hover:bg-violet-600"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Go to Login
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push('/')}
                className="w-full"
              >
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading saved itineraries...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-rose-50 via-rose-100 to-violet-50 flex items-center justify-center px-4">
        <Card className="max-w-md w-full bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <div className="text-red-500 mb-4">
              <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-xl font-semibold text-gray-800 mb-2">
              Oops! Something went wrong
            </h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-violet-500 hover:bg-violet-600"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (!itineraries.length) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-rose-50 via-rose-100 to-violet-50 flex items-center justify-center px-4">
        <Card className="max-w-md w-full bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-xl font-semibold text-gray-800 mb-2">
              No Saved Itineraries
            </h1>
            <p className="text-gray-600 mb-6">
              You haven't saved any itineraries yet. Start planning your next adventure!
            </p>
            <Button
              onClick={() => router.push('/')}
              className="bg-violet-500 hover:bg-violet-600"
            >
              Plan a Trip
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-rose-100 to-violet-50 px-4 py-10 sm:px-6 lg:px-10">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
        Saved Itineraries
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence>
          {itineraries
            .filter((item) => item && item._id && item.destination && item.itinerary)
            .map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.25 }}
              >
                <Card className="shadow bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-4 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-semibold mb-2">
                      {item.destination}
                    </h2>
                    <pre className="text-sm sm:text-base text-gray-700 whitespace-pre-wrap">
                      {item.itinerary}
                    </pre>

                    <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:gap-2">
                      <Button
                        variant="destructive"
                        size="sm"
                        className="flex items-center justify-center"
                        onClick={async () => {
                          try {
                            const res = await fetch(`/api/itinerary/${item._id}`, {
                              method: "DELETE",
                            });

                            if (res.ok) {
                              setItineraries((prev) =>
                                prev.filter((i) => i._id !== item._id)
                              );
                              toast.success("Itinerary deleted successfully.");
                            } else {
                              const errText = await res.text();
                              toast.error("Failed to delete: " + errText);
                            }
                          } catch (error) {
                            console.error("Delete error:", error);
                            toast.error("Something went wrong while deleting.");
                          }
                        }}
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </Button>

                      <Button
                        variant="secondary"
                        size="sm"
                        className="flex items-center justify-center"
                        onClick={() => {
                          const fullText = `📍 Destination: ${item.destination}\n\n📝 Itinerary:\n${item.itinerary}`;
                          navigator.clipboard.writeText(fullText);
                          toast.success("Itinerary copied to clipboard!");
                        }}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </main>
  );
}
