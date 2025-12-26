"use client";

import { cva } from "class-variance-authority";
import { Star, StarOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HousesEnum } from "@/types/houses";

type FavoriteProps = {
  isFavorite: boolean;
  house?: HousesEnum;
  id: string;
  handleFavorite: (id: string) => void;
  className?: string;
};

export function Favorite({
  id,
  house,
  className,
  isFavorite,
  handleFavorite,
}: FavoriteProps) {
  const styles = {
    button: cva(cn(className, "ml-auto"), {
      variants: {
        house: {
          [HousesEnum.GRYFFINDOR]: "bg-gryffindor/40 hover:bg-gryffindor/90",
          [HousesEnum.HUFFLEPUFF]: "bg-hufflepuff/40 hover:bg-hufflepuff/90",
          [HousesEnum.RAVENCLAW]: "bg-ravenclaw/40 hover:bg-ravenclaw/90",
          [HousesEnum.SLYTHERIN]: "bg-slytherin/40 hover:bg-slytherin/90",
          [HousesEnum.UNKNOWN]: "bg-zinc-400/40 hover:bg-zinc-400/40",
        },
      },
    }),
    icon: cva("size-4 transition-colors", {
      variants: {
        color: {
          gold:
            house === HousesEnum.HUFFLEPUFF
              ? "text-yellow-900"
              : "text-yellow-300",
          black: "text-zinc-800",
        },
      },
    }),
  };

  const StarIcon = isFavorite ? StarOff : Star;

  return (
    <Button
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      onClick={() => handleFavorite(id)}
      variant="ghost"
      className={styles.button({
        house: house || HousesEnum.UNKNOWN,
      })}
    >
      <StarIcon
        className={styles.icon({
          color: isFavorite ? "gold" : "black",
        })}
      />
    </Button>
  );
}
