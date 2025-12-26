"use client";

import { useMemo, useState } from "react";
import { CharacterCard } from "@/components/cards/character-card";
import type { Character } from "@/types/characters";
import { LocalStorageEnum } from "@/types/general";

type ListCharactersProps = {
  characters: Character[];
};

export function ListCharacters({ characters }: ListCharactersProps) {
  const rawStoredFavorites =
    localStorage.getItem(LocalStorageEnum.FAVORITE_CHARACTERS) || "";
  const storedFavorites =
    !!rawStoredFavorites && JSON.parse(rawStoredFavorites);

  const [currentFavorites, setCurrentFavorite] = useState<string[]>(
    storedFavorites || "[]",
  );

  const favoriteSet = useMemo(
    () => new Set<string>(currentFavorites),
    [currentFavorites],
  );

  const { favorites, nonFavorites } = useMemo(() => {
    const favorites: Character[] = [];
    const nonFavorites: Character[] = [];

    for (const character of characters) {
      if (favoriteSet.has(character.id)) {
        favorites.push(character);
        continue;
      }

      nonFavorites.push(character);
    }

    return {
      favorites,
      nonFavorites,
    };
  }, [favoriteSet, characters]);

  const handleFavorite = (id: string) => {
    if (currentFavorites.includes(id)) {
      const withoutClickedCharacter = currentFavorites.filter(
        (favoriteId) => favoriteId !== id,
      );

      localStorage.setItem(
        LocalStorageEnum.FAVORITE_CHARACTERS,
        JSON.stringify(withoutClickedCharacter),
      );

      return setCurrentFavorite(withoutClickedCharacter);
    }

    const withNewFavorite = [...currentFavorites, id];

    localStorage.setItem(
      LocalStorageEnum.FAVORITE_CHARACTERS,
      JSON.stringify(withNewFavorite),
    );

    setCurrentFavorite(withNewFavorite);
  };

  return (
    <div>
      {favorites.length > 0 && (
        <>
          <h5 className="font-bold text-lg mb-2">Favorites</h5>

          <ul className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mb-5">
            {favorites.map((character) => {
              return (
                <CharacterCard
                  priority
                  isFavorite
                  key={character.id}
                  character={character}
                  handleFavorite={handleFavorite}
                />
              );
            })}
          </ul>

          <hr className=" divide-zinc-600 my-5" />
        </>
      )}

      <ul className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {nonFavorites.map((character, index) => (
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
