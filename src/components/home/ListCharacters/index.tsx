"use client";

import { useState } from "react";
import { CharacterCard } from "@/components/cards/character-card";
import type { Character } from "@/types/characters";
import { LocalStorageEnum } from "@/types/general";

type ListCharactersProps = {
  characters: Character[];
};

export function ListCharacters({ characters }: ListCharactersProps) {
  const [currentFavorite, setCurrentFavorite] = useState<string>(
    localStorage.getItem(LocalStorageEnum.FAVORITE_CHARACTER) || "",
  );

  const handleFavorite = (id: string) => {
    if (currentFavorite === id) {
      localStorage.removeItem(LocalStorageEnum.FAVORITE_CHARACTER);

      return setCurrentFavorite("");
    }

    localStorage.removeItem(LocalStorageEnum.FAVORITE_CHARACTER);

    localStorage.setItem(LocalStorageEnum.FAVORITE_CHARACTER, id);
    setCurrentFavorite(id);
  };

  const favoriteCharacter = characters.find(
    (character) => character.id === currentFavorite,
  );

  return (
    <div>
      {!!favoriteCharacter && (
        <CharacterCard
          character={favoriteCharacter}
          priority
          handleFavorite={handleFavorite}
          isFavorite
          className="mb-10 max-w-xl mx-auto"
        />
      )}

      <ul className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {characters
          .filter((character) => character.id !== currentFavorite)
          .map((character, index) => (
            <CharacterCard
              key={character.id}
              character={character}
              priority={index < 6}
              handleFavorite={handleFavorite}
              isFavorite={false}
            />
          ))}
      </ul>
    </div>
  );
}
