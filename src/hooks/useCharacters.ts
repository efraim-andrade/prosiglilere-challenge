import { useQuery } from "@tanstack/react-query";
import { getCharacters, getStaff, getStudents } from "@/services/getCharacters";
import {
  type Character,
  type FilterType,
  FilterTypeEnum,
} from "@/types/characters";

export function useCharacters(filter: FilterType) {
  return useQuery<Character[]>({
    queryKey: ["characters", filter],
    queryFn: () => {
      if (filter === FilterTypeEnum.ALL) return getCharacters();
      if (filter === FilterTypeEnum.STAFF) return getStaff();
      if (filter === FilterTypeEnum.STUDENTS) return getStudents();
      return Promise.resolve([]);
    },
  });
}
