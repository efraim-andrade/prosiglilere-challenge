import { cva } from "class-variance-authority";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Houses, HousesEnum } from "@/types/houses";

type HouseCardProps = {
  house: Houses;
  priority?: boolean;
  isFavorite: boolean;
  handleFavorite: (id: HousesEnum) => void;
  className?: string;
};

export function HouseCard({
  house,
  isFavorite,
  handleFavorite,
  className,
}: HouseCardProps) {
  const houseVariants = cva("", {
    variants: {
      favorite: {
        favorite: "opacity-100",
        notFavorite: "opacity-40",
      },
    },
    defaultVariants: {
      favorite: isFavorite ? "favorite" : "notFavorite",
    },
  });

  return (
    <Card
      house={house.name}
      className={cn(
        "p-0",
        className,
        houseVariants({ favorite: isFavorite ? "favorite" : "notFavorite" }),
      )}
    >
      <CardContent className="flex items-center p-0">
        <Button
          variant="ghost"
          onClick={() => handleFavorite(house.name)}
          className="flex items-center gap-4 p-7 w-full"
        >
          <CardTitle className="text-lg font-bold pr-1">{house.name}</CardTitle>
        </Button>
      </CardContent>
    </Card>
  );
}
