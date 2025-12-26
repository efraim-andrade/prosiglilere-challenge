"use client";

import { useState } from "react";
import { HouseCard } from "@/components/cards/house-card";
import { LocalStorageEnum } from "@/types/general";
import { type Houses, HousesEnum } from "@/types/houses";

const houses: Houses[] = [
  { id: "0", name: HousesEnum.GRYFFINDOR },
  { id: "1", name: HousesEnum.HUFFLEPUFF },
  { id: "2", name: HousesEnum.RAVENCLAW },
  { id: "3", name: HousesEnum.SLYTHERIN },
];

export function ListHouses() {
  const localStorage =
    typeof window !== "undefined" ? window.localStorage : null;

  const [currentFavorite, setCurrentFavorite] = useState<string>(
    (!!localStorage && localStorage.getItem(LocalStorageEnum.FAVORITE_HOUSE)) ||
      "",
  );

  const handleFavorite = (id: string) => {
    if (!localStorage) return;

    localStorage.removeItem(LocalStorageEnum.FAVORITE_HOUSE);

    localStorage.setItem(LocalStorageEnum.FAVORITE_HOUSE, id);
    setCurrentFavorite(id);
  };

  const favoriteHouse = houses.find((house) => house.id === currentFavorite);

  return (
    <div>
      {!!favoriteHouse && (
        <HouseCard
          key={favoriteHouse.id}
          house={favoriteHouse}
          handleFavorite={handleFavorite}
          isFavorite
          className="mb-10 max-w-xl mx-auto"
        />
      )}

      <ul className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {houses
          .filter((house) => house.id !== currentFavorite)
          .map((house) => (
            <HouseCard
              key={house.id}
              house={house}
              handleFavorite={handleFavorite}
              isFavorite={currentFavorite === house.id}
            />
          ))}
      </ul>
    </div>
  );
}
