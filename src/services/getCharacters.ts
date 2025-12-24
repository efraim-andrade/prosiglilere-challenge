import { api } from "@/lib/api";
import type { APIResponseCharacters } from "@/types/characters";

export async function getCharacters() {
  const data = await api<APIResponseCharacters[]>({ endpoint: "characters" });

  return data;
}

export async function getStaff() {
  const data = await api<APIResponseCharacters[]>({
    endpoint: "characters/staff",
  });

  return data;
}

export async function getStudents() {
  const data = await api<APIResponseCharacters[]>({
    endpoint: "characters/students",
  });

  return data;
}
