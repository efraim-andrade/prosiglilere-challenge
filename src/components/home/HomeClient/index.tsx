"use client";

import { cva } from "class-variance-authority";
import { AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { Filters } from "@/components/home/Filters";
import { ListCharacters } from "@/components/home/ListCharacters";
import { ListHouses } from "@/components/home/ListHouses";
import { Button } from "@/components/ui/button";
import { useCharacters } from "@/hooks/useCharacters";
import { useTheme } from "@/hooks/useTheme";
import {
  type Character,
  type FilterType,
  FilterTypeEnum,
} from "@/types/characters";
import { HousesEnum } from "@/types/houses";

type HomeClientProps = {
  initialCharacters: Character[];
};

export function HomeClient({ initialCharacters }: HomeClientProps) {
  const { currentTheme } = useTheme();

  const [filter, setFilter] = useState<FilterType>(FilterTypeEnum.ALL);

  const {
    data: characters = initialCharacters,
    isLoading,
    isError,
    refetch,
  } = useCharacters(filter);

  const handleFilter = (newFilter: FilterType) => {
    setFilter(newFilter);
  };

  const displayCharacters = (() => {
    if (filter !== FilterTypeEnum.ALL) return characters;

    if (characters.length === 0) return initialCharacters;

    return characters;
  })();

  const homeVariants = cva("p-10 min-h-[calc(100vh-60px)]", {
    variants: {
      house: {
        [HousesEnum.GRYFFINDOR]: "bg-gryffindor/20",
        [HousesEnum.HUFFLEPUFF]: "bg-hufflepuff/20",
        [HousesEnum.RAVENCLAW]: "bg-ravenclaw/20",
        [HousesEnum.SLYTHERIN]: "bg-slytherin/20",
        [HousesEnum.UNKNOWN]: "bg-white border-gray-200",
      },
    },
  });

  return (
    <main
      className={homeVariants({ house: currentTheme || HousesEnum.UNKNOWN })}
    >
      <div>
        <h2 className="text-2xl font-bold mb-4">Houses</h2>

        <ListHouses />
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Characters</h2>

        <Filters filter={filter} handleFilter={handleFilter} />

        {isLoading && (
          <div className="text-center py-10 flex items-center justify-center gap-2">
            <Loader2 className="animate-spin size-10" /> Loading characters...
          </div>
        )}

        {!isLoading && isError && (
          <div className="text-center py-10 flex items-center justify-center gap-2 text-red-500">
            <AlertCircle className="size-10" /> Error loading characters.
            <Button variant="outline" onClick={() => refetch()}>
              Try again
            </Button>
          </div>
        )}

        {!isLoading && !isError && (
          <div>
            <ListCharacters characters={displayCharacters} />
          </div>
        )}
      </div>
    </main>
  );
}
