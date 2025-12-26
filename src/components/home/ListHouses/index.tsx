"use client";

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

  const { currentHouse, setCurrentHouse } = useTheme();

  const handleFavorite = (houseName: HousesEnum) => {
    if (!localStorage) return;

    if (currentHouse === houseName) {
      localStorage.removeItem(LocalStorageEnum.FAVORITE_HOUSE);

      setCurrentHouse(HousesEnum.UNKNOWN);

      return setCurrentHouse(HousesEnum.UNKNOWN);
    }

    localStorage.setItem(LocalStorageEnum.FAVORITE_HOUSE, houseName);

    setCurrentHouse(houseName);
  };

  return (
    <div>
      <ul className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {houses.map((house) => (
          <HouseCard
            key={house.name}
            house={house}
            handleFavorite={handleFavorite}
            isFavorite={currentHouse === house.name}
          />
        ))}
      </ul>
    </div>
  );
}
