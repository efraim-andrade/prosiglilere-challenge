"use client";

import { useState } from "react";
import { HouseCard } from "@/components/cards/house-card";
import { useTheme } from "@/hooks/useTheme";
import { LocalStorageEnum } from "@/types/general";
import { type Houses, HousesEnum } from "@/types/houses";

const houses: Houses[] = [
  { name: HousesEnum.GRYFFINDOR },
  { name: HousesEnum.HUFFLEPUFF },
  { name: HousesEnum.RAVENCLAW },
  { name: HousesEnum.SLYTHERIN },
];

export function ListHouses() {
  const localStorage =
    typeof window !== "undefined" ? window.localStorage : null;

  const [currentFavorite, setCurrentFavorite] = useState<string>(
    (!!localStorage && localStorage.getItem(LocalStorageEnum.FAVORITE_HOUSE)) ||
      "",
  );

  const { setCurrentTheme } = useTheme();

  const handleFavorite = (houseName: string) => {
    if (!localStorage) return;

    if (currentFavorite === houseName) {
      localStorage.removeItem(LocalStorageEnum.FAVORITE_HOUSE);

      setCurrentFavorite("");

      return setCurrentTheme(HousesEnum.UNKNOWN);
    }

    localStorage.removeItem(LocalStorageEnum.FAVORITE_HOUSE);

    localStorage.setItem(LocalStorageEnum.FAVORITE_HOUSE, houseName);
    setCurrentFavorite(houseName);

    setCurrentTheme(
      houses.find((house) => house.name === houseName)?.name ||
        HousesEnum.UNKNOWN,
    );
  };

  const favoriteHouse = houses.find((house) => house.name === currentFavorite);
  return (
    <div>
      {!!favoriteHouse && (
        <HouseCard
          key={favoriteHouse.name}
          house={favoriteHouse}
          handleFavorite={handleFavorite}
          isFavorite
          className="mb-10 max-w-xl mx-auto"
        />
      )}

      <ul className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {houses
          .filter((house) => house.name !== currentFavorite)
          .map((house) => (
            <HouseCard
              key={house.name}
              house={house}
              handleFavorite={handleFavorite}
              isFavorite={currentFavorite === house.name}
            />
          ))}
      </ul>
    </div>
  );
}
