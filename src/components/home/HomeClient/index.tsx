"use client";

import { AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { Filters } from "@/components/home/Filters";
import { ListCharacters } from "@/components/home/ListCharacters";
import { Button } from "@/components/ui/button";
import { useCharacters } from "@/hooks/useCharacters";
import {
  type Character,
  type FilterType,
  FilterTypeEnum,
} from "@/types/characters";

type HomeClientProps = {
  initialCharacters: Character[];
};

export function HomeClient({ initialCharacters }: HomeClientProps) {
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

  return (
    <main className="p-10">
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
        <ListCharacters characters={displayCharacters} />
      )}
    </main>
  );
}
