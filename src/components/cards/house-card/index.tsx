import { Favorite } from "@/components/favorite";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import type { Houses } from "@/types/houses";

type HouseCardProps = {
  house: Houses;
  priority?: boolean;
  isFavorite: boolean;
  handleFavorite: (id: string) => void;
  className?: string;
};

export function HouseCard({
  house,
  isFavorite,
  handleFavorite,
  className,
}: HouseCardProps) {
  return (
    <Card house={house.name} className={className}>
      <CardContent className="flex items-center p-0">
        <div className="flex items-center gap-4 p-0">
          <CardTitle className="text-lg font-bold pr-1">{house.name}</CardTitle>
        </div>

        <Favorite
          isFavorite={isFavorite}
          characterHouse={house.name}
          characterId={house.id}
          handleFavorite={handleFavorite}
        />
      </CardContent>
    </Card>
  );
}
