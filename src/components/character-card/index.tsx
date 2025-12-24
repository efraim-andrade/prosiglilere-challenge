import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import type { Character } from "@/types/characters";

type CharacterCardProps = {
  character: Character;
  priority?: boolean;
};

export function CharacterCard({
  character,
  priority = false,
}: CharacterCardProps) {
  return (
    <Link href={`/character/${character.id}`}>
      <Card house={character.house}>
        <CardContent className="p-0">
          <div className="flex items-center gap-4 p-0">
            {character.image ? (
              <Image
                src={character.image}
                alt={character.name}
                priority={priority}
                fetchPriority={priority ? "high" : "low"}
                sizes="48px"
                width={48}
                height={48}
                className="rounded-full size-12 object-cover object-top"
              />
            ) : (
              <div
                role="img"
                aria-label="empty character image"
                className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500"
              />
            )}

            <CardTitle className="text-lg font-bold">
              {character.name}
            </CardTitle>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
