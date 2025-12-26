"use client";

import { cva } from "class-variance-authority";
import { Star, StarOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HousesEnum } from "@/types/houses";

type FavoriteProps = {
  isFavorite: boolean;
  characterHouse: HousesEnum;
  characterId: string;
  handleFavorite: (id: string) => void;
};

export function Favorite({
  isFavorite,
  characterHouse,
  characterId,
  handleFavorite,
}: FavoriteProps) {
  const styles = {
    button: cva("ml-auto", {
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
            characterHouse === HousesEnum.HUFFLEPUFF
              ? "text-yellow-900"
              : "text-yellow-300",
          black: "text-zinc-800",
        },
      },
    }),
  };

  const StarIcon = isFavorite ? Star : StarOff;

  return (
    <Button
      onClick={() => handleFavorite(characterId)}
      variant="ghost"
      className={styles.button({
        house: characterHouse || HousesEnum.UNKNOWN,
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
