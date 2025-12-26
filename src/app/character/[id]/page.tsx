import { cva } from "class-variance-authority";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { LabelText } from "@/components/label-text";
import { cn } from "@/lib/utils";
import { getCharacterById, getCharacters } from "@/services/getCharacters";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const character = await getCharacterById(id);

  if (!character) {
    return {
      title: "Character Not Found",
    };
  }

  return {
    title: `${character.name}`,
    description: `${character.name} is a ${character.species}${character.house ? ` from ${character.house}` : ""}. ${character.alive ? "Alive" : "Deceased"}. Actor: ${character.actor || "Unknown"}.`,
    openGraph: {
      title: character.name,
      description: `Learn about ${character.name}, a ${character.species}${character.house ? ` from ${character.house}` : ""}`,
      images: character.image ? [{ url: character.image }] : [],
      type: "website",
    },
    twitter: {
      card: "summary",
      title: character.name,
      description: `Learn about ${character.name}`,
      images: character.image ? [character.image] : [],
    },
  };
}

export async function generateStaticParams() {
  try {
    const characters = await getCharacters();

    return characters.map((character) => ({
      id: character.id,
    }));
  } catch (_) {
    return [];
  }
}

export default async function CharacterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const character = await getCharacterById(id);

  const backgroundVariants = cva(
    "p-10 flex items-center flex-col min-h-[calc(100vh-60px)]",
    {
      variants: {
        house: {
          Gryffindor: "bg-gryffindor/60 bg-cover text-red-950",
          Hufflepuff: "bg-hufflepuff/60 bg-cover text-yellow-950",
          Ravenclaw: "bg-ravenclaw/60 bg-cover text-blue-950",
          Slytherin: "bg-slytherin/60 bg-cover text-green-950",
          Unknown: "",
        },
      },
      defaultVariants: {
        house: "Unknown",
      },
    },
  );

  if (!character) {
    notFound();
  }

  return (
    <main className={cn(backgroundVariants({ house: character.house }))}>
      {character.image && (
        <Image
          src={character.image}
          alt={character.name}
          width={200}
          height={200}
          className="rounded-2xl"
          priority
        />
      )}

      <div className="mt-6 text-center ">
        <h1 className="text-2xl font-bold">{character.name}</h1>
        {character.alternate_names.length > 0 && (
          <p>{character.alternate_names.join(", ")}</p>
        )}
      </div>

      <div className="mt-4 space-y-2 text-center">
        <LabelText label="Species" text={character.species} />

        <LabelText label="Gender" text={character.gender} />

        {character.actor && <LabelText label="Actor" text={character.actor} />}
        {character.ancestry && (
          <LabelText label="Ancestry" text={character.ancestry} />
        )}

        <LabelText label="Alive" text={character.alive ? "Yes" : "No"} />

        {character.hairColour && (
          <LabelText label="Hair Colour" text={character.hairColour} />
        )}

        {character.dateOfBirth && (
          <LabelText label="Date of Birth" text={character.dateOfBirth} />
        )}

        {character.house && <LabelText label="House" text={character.house} />}

        {character.patronus && (
          <LabelText label="Patronus" text={character.patronus} />
        )}
      </div>
    </main>
  );
}
