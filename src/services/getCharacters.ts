import { api } from "@/lib/api";
import type { APIResponseCharacter } from "@/types/characters";

export async function getCharacters() {
  const data = await api<APIResponseCharacter[]>({ endpoint: "characters" });

  return data;
}

export async function getStaff() {
  const data = await api<APIResponseCharacter[]>({
    endpoint: "characters/staff",
  });

  return data;
}

export async function getStudents() {
  const data = await api<APIResponseCharacter[]>({
    endpoint: "characters/students",
  });

  return data;
}

export async function getCharacterById(id: string) {
  const data = await api<APIResponseCharacter[]>({
    endpoint: `character/${id}`,
  });

  return data[0];
}
