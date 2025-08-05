import mongoose from "mongoose";

const ItinerarySchema = new mongoose.Schema({
  destination: { type: String, required: true },
  itinerary: { type: String, required: true },
  userId: { type: String, required: true }, // ✅ required field
}, {
  timestamps: true,
});

export const Itinerary = mongoose.models.Itinerary || mongoose.model("Itinerary", ItinerarySchema);
