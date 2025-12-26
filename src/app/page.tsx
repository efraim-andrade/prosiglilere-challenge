import type { Metadata } from "next";

import { HomeClient } from "@/components/home/HomeClient";
import { getCharacters } from "@/services/getCharacters";
import type { Character } from "@/types/characters";

export const metadata: Metadata = {
  title: "Harry Potter Characters",
  description:
    "Explore the complete list of Harry Potter characters. Filter by students, staff, or view all characters. Learn about your favorite characters from the wizarding world.",
  openGraph: {
    title: "Harry Potter Characters",
    description: "Explore the complete list of Harry Potter characters",
    type: "website",
  },
};

export default async function Home() {
  let initialCharacters: Character[] = [];

  try {
    initialCharacters = await getCharacters();
  } catch (error) {
    console.error("Failed to fetch initial characters:", error);
  }

  return <HomeClient initialCharacters={initialCharacters} />;
}
