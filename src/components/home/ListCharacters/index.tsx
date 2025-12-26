import { CharacterCard } from "@/components/character-card";
import type { Character } from "@/types/characters";

type ListCharactersProps = {
  characters: Character[];
};

export function ListCharacters({ characters }: ListCharactersProps) {
  return (
    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {characters.map((character, index) => (
        <CharacterCard
          key={character.id}
          character={character}
          priority={index < 6}
        />
      ))}
    </ul>
  );
}
