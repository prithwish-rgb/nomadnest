import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Itinerary } from "@/models/Itinerary";
import { format } from "date-fns";
import OpenAI from "openai";
import { itineraryRateLimiter } from "@/lib/rate-limit";
import { itineraryCache } from "@/lib/cache";
import { analytics } from "@/lib/analytics";
import { validateItineraryInput } from "@/lib/validation";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    
    // Validate input
    const validation = validateItineraryInput(body);
    if (!validation.success) {
      return NextResponse.json({ 
        error: "Invalid input", 
        details: validation.errors 
      }, { status: 400 });
    }

    const { destination, startDate, endDate, duration, interests } = body;

    // Rate limiting
    const rateLimitResult = await itineraryRateLimiter.checkLimit(session.user.id);
    if (!rateLimitResult.allowed) {
      return NextResponse.json({
        error: "Rate limit exceeded",
        message: "Too many itinerary generations. Please try again later.",
        resetTime: new Date(rateLimitResult.resetTime).toISOString()
      }, { status: 429 });
    }

    await connectDB();

    const formattedStartDate = startDate ? format(new Date(startDate), "PPP") : "";
    const formattedEndDate = endDate ? format(new Date(endDate), "PPP") : "";

    // Check cache first
    const cacheKey = `${destination}-${duration}-${interests.join(',')}`;
    const cachedItinerary = await itineraryCache.get(cacheKey);
    
    if (cachedItinerary) {
      // Track cache hit
      await analytics.track({
        event: 'itinerary_cache_hit',
        properties: { destination, duration },
        userId: session.user.id
      });
      
      return NextResponse.json({ itinerary: cachedItinerary });
    }

    const fallbackItinerary = `
🗺️ Here's your ${duration}-day itinerary for ${destination} (${formattedStartDate} to ${formattedEndDate}) based on your interests in ${interests}:

Day 1: Arrival and settle in. Explore nearby local cafés.
Day 2: Enjoy activities around ${interests?.[0] || "local culture"}.
Day 3: Relax at scenic spots or try a food tour.
Day 4: Adventure excursion or cultural tour.
Day 5: Wrap-up and souvenirs shopping.

Let the journey begin! 🌍✨
    `;

    let finalItinerary = fallbackItinerary;

    try {
      const prompt = `
Generate a ${duration}-day travel itinerary for ${destination} from ${formattedStartDate} to ${formattedEndDate}.
Base it on the following interests: ${interests.join(", ")}.
Use markdown-style format, starting with Day 1, Day 2, etc.
`;

      const aiResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      });

      const generatedText = aiResponse.choices?.[0]?.message?.content;
      if (generatedText && typeof generatedText === "string") {
        finalItinerary = generatedText;
        
        // Cache the generated itinerary
        await itineraryCache.set(cacheKey, { itinerary: finalItinerary }, 3600); // 1 hour
        
        // Track successful generation
        await analytics.trackItineraryGeneration(destination, parseInt(duration), session.user.id);
      }
    } catch (aiError) {
      console.warn("AI fallback triggered:", aiError);
      
      // Track AI failure
      await analytics.trackError({
        error: "AI generation failed",
        stack: aiError instanceof Error ? aiError.stack : undefined,
        userId: session.user.id
      });
    }

    const newItinerary = await Itinerary.create({
      destination,
      itinerary: finalItinerary,
      userId: session.user.id,
    });

    return NextResponse.json({ itinerary: newItinerary });
  } catch (error) {
    console.error("MongoDB Save Error:", error);
    
    // Track error
    await analytics.trackError({
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined
    });
    
    return NextResponse.json({ error: "Failed to save itinerary." }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const userId = session.user.id;

    // Check cache for user itineraries
    const cacheKey = `user-itineraries-${userId}`;
    const cachedItineraries = await itineraryCache.get(cacheKey);
    
    if (cachedItineraries) {
      return NextResponse.json({ itineraries: cachedItineraries });
    }

    const itineraries = await Itinerary.find({ userId }).sort({ createdAt: -1 });

    const cleanItineraries = itineraries.map((itinerary) => ({
      _id: itinerary._id.toString(),
      destination: itinerary.destination,
      itinerary: itinerary.itinerary?.toString?.() || "",
      createdAt: itinerary.createdAt,
    }));

    // Cache user itineraries for 5 minutes
    await itineraryCache.set(cacheKey, cleanItineraries, 300);

    return NextResponse.json({ itineraries: cleanItineraries });
  } catch (error) {
    console.error("Fetch Error:", error);
    
    // Track error
    await analytics.trackError({
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      url: req.url
    });
    
    return NextResponse.json({ error: "Failed to fetch itineraries." }, { status: 500 });
  }
}
