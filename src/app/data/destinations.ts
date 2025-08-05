export interface Destination {
  name: string;
  description: string;
  image?: string;
  tags: string[];
}

export const destinations: Destination[] = [
  {
    name: "Bali, Indonesia",
    description: "A tropical haven with beaches, temples, and yoga retreats.",
    image: "/images/bali.jpg",
    tags: ["beach", "nature", "Asia"],
  },
  {
    name: "Paris, France",
    description: "Romantic city known for its art, cuisine, and Eiffel Tower.",
    image: "/images/paris.jpg",
    tags: ["city", "romantic", "Europe"],
  },
  {
    name: "Kyoto, Japan",
    description: "Historic city full of temples, cherry blossoms, and tea culture.",
    image: "/images/kyoto.jpg",
    tags: ["culture", "Asia", "temples"],
  },
  {
    name: "Banff, Canada",
    description: "Stunning mountain views, lakes, and wildlife in the Rockies.",
    image: "/images/banff.jpg",
    tags: ["mountains", "nature", "North America"],
  },
  {
    name: "Cape Town, South Africa",
    description: "Coastal city with mountains, beaches, and vibrant culture.",
    image: "/images/capetown.jpg",
    tags: ["beach", "Africa", "adventure"],
  },
  {
    name: "Rome, Italy",
    description: "Ancient ruins, Renaissance art, and Italian cuisine await.",
    image: "/images/rome.jpg",
    tags: ["Europe", "history", "culture"],
  },
  {
    name: "Santorini, Greece",
    description: "White-washed houses, blue domes, and stunning sunsets.",
    image: "/images/santorini.jpg",
    tags: ["Europe", "beach", "romantic"],
  },
  {
    name: "Machu Picchu, Peru",
    description: "Iconic Incan ruins set high in the Andes Mountains.",
    image: "/images/machu-picchu.jpg",
    tags: ["history", "adventure", "South America"],
  },
  {
    name: "Queenstown, New Zealand",
    description: "Adventure capital of the world with bungee, skiing, and more.",
    image: "/images/queenstown.jpg",
    tags: ["adventure", "Oceania", "mountains"],
  },
  
];
