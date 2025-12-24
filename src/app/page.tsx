"use client";

import { AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { Filters } from "@/components/home/Filters";
import { ListCharacters } from "@/components/home/ListCharacters";
import { Button } from "@/components/ui/button";
import { useCharacters } from "@/hooks/useCharacters";
import { type FilterType, FilterTypeEnum } from "@/types/characters";

export default function Home() {
  const [filter, setFilter] = useState<FilterType>(FilterTypeEnum.ALL);

  const {
    data: characters = [],
    isLoading,
    isError,
    refetch,
  } = useCharacters(filter);

  const handleFilter = (filter: FilterType) => {
    setFilter(filter);
  };

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

      {!isLoading && !isError && <ListCharacters characters={characters} />}
    </main>
  );
}
