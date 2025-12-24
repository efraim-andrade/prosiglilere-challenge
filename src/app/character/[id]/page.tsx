"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useCharacter } from "@/hooks/useCharacter";

export default function CharacterPage() {
  const { id } = useParams<{ id: string }>();

  const { data: character } = useCharacter(id);

  if (!character) {
    return (
      <main className="p-10">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="p-10">
      <Image
        src={character?.image}
        alt={character?.name}
        width={200}
        height={200}
        className="rounded-2xl"
      />

      <h1 className="text-2xl font-bold">{character?.name}</h1>

      <p>Species: {character?.species}</p>
      <p>Gender: {character?.gender}</p>
      <p>Origin: {character?.actor}</p>
      <p>Location: {character?.ancestry}</p>
    </main>
  );
}
