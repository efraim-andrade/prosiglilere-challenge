export enum HousesEnum {
  GRYFFINDOR = "Gryffindor",
  HUFFLEPUFF = "Hufflepuff",
  RAVENCLAW = "Ravenclaw",
  SLYTHERIN = "Slytherin",
  UNKNOWN = "Unknown",
}

export type Houses = {
  id: string;
  name: HousesEnum;
};
