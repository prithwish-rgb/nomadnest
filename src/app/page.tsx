"use client";

import { Suspense } from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useRouter } from 'next/navigation';

function HomeContent() {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [duration, setDuration] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      setDuration(days > 0 ? days.toString() : "1");
    }
  }, [startDate, endDate]);

  useEffect(() => {
    const dest = searchParams.get("destination");
    const tags = searchParams.get("interests");

    if (dest) setDestination(dest);
    if (tags) {
      const tagArray = tags.split(",").map(tag => tag.trim()).filter(Boolean);
      setInterests(tagArray);
    }
  }, [searchParams]);

  const handleCheckboxChange = (interest: string) => {
    setInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleHomeClick = () => {
    router.push('/');
    router.refresh();
  };

  const handleGenerate = async () => {
    if (!destination || !startDate || !endDate || interests.length === 0) {
      toast.error("Please fill in all fields before generating your itinerary.");
      return;
    }

    setLoading(true);
    setItinerary("");

    const fallback = `🧭 Sample Itinerary for ${destination} (${duration} days)\n
Day 1: Arrival & hotel check-in
Day 2: Sightseeing + local food tour
Day 3: Relaxation + shopping
Day 4: Departure`;

    try {
      const res = await fetch("/api/itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination,
          startDate,
          endDate,
          duration,
          interests,
        }),
      });

      const data = await res.json();
      const generated = data?.itinerary?.itinerary;

      if (!res.ok || !generated || typeof generated !== "string") {
        throw new Error("AI failed or returned invalid data");
      }

      setItinerary(generated);

      if (generated.includes("Let the journey begin") || generated.includes("Sample Itinerary")) {
        toast.warning("AI is currently unavailable. Showing a sample itinerary.");
      }

    } catch (error) {
      console.warn("Fallback triggered:", error);
      toast.warning("AI not available. Showing sample itinerary.");
      setItinerary(fallback);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setDestination("");
    setStartDate("");
    setEndDate("");
    setDuration("");
    setInterests([]);
    setItinerary("");
  };

  return (
    <main className=" relative overflow-x-hidden min-h-screen px-4 sm:px-6 py-16 bg-gradient-to-br from-rose-50 via-rose-100 to-violet-50 text-center text-gray-800 bg-floating-shapes">
      <h1 onClick={handleHomeClick} className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-violet-700 drop-shadow-sm">
        NomadNest
      </h1>

      <p className="mb-10 text-base sm:text-lg md:text-xl text-neutral-600 font-medium">
        Plan your next adventure with <span className="text-violet-500 font-semibold">AI magic ✨</span>
      </p>

      <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col gap-4 mb-6">
        <Input
          placeholder="Where do you want to go?"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="rounded-xl border border-neutral-300 shadow-sm focus:ring-2 focus:ring-violet-400"
          suppressHydrationWarning={true}
        />

        <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center">
          <Input
            type="date"
            value={startDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => {
              const newStartDate = e.target.value;
              setStartDate(newStartDate);
              if (endDate && new Date(endDate) < new Date(newStartDate)) {
                setEndDate("");
              }
              if (endDate && newStartDate) {
                const diffTime = new Date(endDate).getTime() - new Date(newStartDate).getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                setDuration(diffDays.toString());
              }
            }}
            className="w-full sm:w-auto flex-1 rounded-xl border border-neutral-300 shadow-sm"
            suppressHydrationWarning={true}
          />

          <Input
            type="date"
            value={endDate}
            min={startDate || new Date().toISOString().split("T")[0]}
            onChange={(e) => {
              const newEndDate = e.target.value;
              if (startDate && new Date(newEndDate) < new Date(startDate)) {
                toast.error("End date cannot be before start date");
                return;
              }
              setEndDate(newEndDate);
              if (startDate && newEndDate) {
                const diffTime = new Date(newEndDate).getTime() - new Date(startDate).getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                setDuration(diffDays.toString());
              }
            }}
            className="w-full sm:w-auto flex-1 rounded-xl border border-neutral-300 shadow-sm"
            suppressHydrationWarning={true}
          />

          <Input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Duration (days)"
            className="w-full sm:w-auto flex-1 rounded-xl border border-neutral-300 shadow-sm"
            suppressHydrationWarning={true}
          />
        </div>

        <div className="text-left">
          <p className="mb-2 font-medium text-neutral-700">What are you into?</p>
          <div className="flex flex-wrap gap-3">
            {["Adventure", "Food", "Relaxation", "Culture", "Nature", "Nightlife"].map((item) => (
              <label
                key={item}
                className={`px-3 py-1 rounded-full cursor-pointer text-sm border transition ${
                  interests.includes(item)
                    ? "bg-violet-100 text-violet-700 border-violet-400"
                    : "bg-white text-neutral-600 border-neutral-300"
                }`}
              >
                <input
                  type="checkbox"
                  value={item}
                  checked={interests.includes(item)}
                  onChange={() => handleCheckboxChange(item)}
                  className="hidden"
                  suppressHydrationWarning={true}
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center mt-4">
          <Button
            onClick={handleGenerate}
            disabled={loading}
            className="px-6 py-2 rounded-xl text-white bg-violet-500 hover:bg-violet-600 shadow-md shadow-violet-200 transition-all"
            suppressHydrationWarning={true}
          >
            {loading ? "Generating..." : "Generate"}
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="px-6 py-2 rounded-xl border-neutral-400 text-neutral-700 hover:border-neutral-600 transition"
            suppressHydrationWarning={true}
          >
            Reset
          </Button>
        </div>
      </div>

      {itinerary && (
        <div className="max-w-3xl mx-auto mt-10 bg-white/90 backdrop-blur-md shadow-inner p-4 text-left border border-neutral-200 rounded-lg">
          <div className="whitespace-pre-wrap overflow-auto max-h-[75vh] sm:max-h-[60vh] text-sm text-gray-800 leading-relaxed">
            {itinerary}
          </div>
        </div>
      )}
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
