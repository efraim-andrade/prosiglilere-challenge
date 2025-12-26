import type { HousesEnum } from "@/types/houses";

export type APIResponseCharacter = {
  id: string;
  name: string;
  alternate_names: string[];
  species: string;
  gender: string;
  house: HousesEnum;
  dateOfBirth: string;
  yearOfBirth: number;
  wizard: boolean;
  ancestry: string;
  eyeColour: string;
  hairColour: string;
  wand: {
    wood: string;
    core: string;
    length: number;
  };
  patronus: string;
  hogwartsStudent: boolean;
  hogwartsStaff: boolean;
  actor: string;
  alternate_actors: string[];
  alive: boolean;
  image: string;
};

export type Character = APIResponseCharacter;

export enum FilterTypeEnum {
  ALL = "all",
  STAFF = "staff",
  STUDENTS = "students",
}

export type FilterType = FilterTypeEnum;
