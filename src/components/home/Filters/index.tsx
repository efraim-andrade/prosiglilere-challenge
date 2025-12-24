import { Button } from "@/components/ui/button";
import { type FilterType, FilterTypeEnum } from "@/types/characters";

type FiltersProps = {
  filter: FilterType;
  handleFilter: (filter: FilterType) => void;
};

export function Filters({ filter, handleFilter }: FiltersProps) {
  const buttonProps: Record<
    FilterTypeEnum,
    React.ComponentProps<typeof Button>
  > = {
    [FilterTypeEnum.ALL]: {
      onClick: () => handleFilter(FilterTypeEnum.ALL),
      variant: filter === FilterTypeEnum.ALL ? "default" : "outline",
    },
    [FilterTypeEnum.STAFF]: {
      onClick: () => handleFilter(FilterTypeEnum.STAFF),
      variant: filter === FilterTypeEnum.STAFF ? "default" : "outline",
    },
    [FilterTypeEnum.STUDENTS]: {
      onClick: () => handleFilter(FilterTypeEnum.STUDENTS),
      variant: filter === FilterTypeEnum.STUDENTS ? "default" : "outline",
    },
  };

  return (
    <div className="flex gap-2 mb-4">
      <Button {...buttonProps[FilterTypeEnum.ALL]}>All</Button>

      <Button {...buttonProps[FilterTypeEnum.STAFF]}>Staff</Button>

      <Button {...buttonProps[FilterTypeEnum.STUDENTS]}>Students</Button>
    </div>
  );
}
