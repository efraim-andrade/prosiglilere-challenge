import {
  type QueryClient,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getCharacterById, getCharacters } from "@/services/getCharacters";
import { type Character, FilterTypeEnum } from "@/types/characters";

type SearchCharacterProps = {
  id: string;
  queryClient: QueryClient;
};

async function searchCharacter({ id, queryClient }: SearchCharacterProps) {
  const allCharactersCache = queryClient.getQueryData<Character[]>([
    "characters",
    FilterTypeEnum.ALL,
  ]);

  const cachedCharacter = allCharactersCache?.find((char) => char.id === id);

  if (cachedCharacter) {
    return cachedCharacter;
  }

  try {
    const data = await getCharacterById(id);

    return data;
  } catch (_) {
    const allCharacters = await getCharacters();

    return allCharacters.find((char) => char.id === id);
  }
}

export function useCharacter(id: string) {
  const queryClient = useQueryClient();

  return useQuery<Character | undefined>({
    queryKey: ["character", id],
    queryFn: () =>
      searchCharacter({
        id,
        queryClient,
      }),
  });
}
