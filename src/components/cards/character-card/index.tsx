import Image from "next/image";
import Link from "next/link";
import { Favorite } from "@/components/favorite";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Character } from "@/types/characters";

type CharacterCardProps = {
  character: Character;
  priority?: boolean;
  isFavorite: boolean;
  handleFavorite: (id: string) => void;
  className?: string;
};

export function CharacterCard({
  character,
  isFavorite,
  handleFavorite,
  priority = false,
  className,
}: CharacterCardProps) {
  return (
    <Card house={character.house} className={cn("p-0", className)}>
      <CardContent className="flex items-center p-0 relative">
        <Link
          href={`/character/${character.id}`}
          className="flex items-center gap-4 p-4 w-full"
        >
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
              className="w-12 h-12 rounded-full bg-gray-400/40 flex items-center justify-center"
            />
          )}

          <CardTitle className="text-lg font-bold pr-1">
            {character.name}
          </CardTitle>
        </Link>

        <Favorite
          isFavorite={isFavorite}
          house={character.house}
          id={character.id}
          handleFavorite={handleFavorite}
          className="absolute right-4"
        />
      </CardContent>
    </Card>
  );
}
