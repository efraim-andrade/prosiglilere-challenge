"use client";

import React, { useContext, useEffect, useState } from "react";
import { LocalStorageEnum } from "@/types/general";
import { HousesEnum } from "@/types/houses";

type UseThemeData = {
  currentHouse: HousesEnum;
  setCurrentHouse: React.Dispatch<React.SetStateAction<HousesEnum>>;
};

type UseThemeProps = { children: React.ReactNode };

export const UseThemeContext = React.createContext<UseThemeData>(
  {} as UseThemeData,
);

export const ThemeProvider = ({ children }: UseThemeProps) => {
  const [currentHouse, setCurrentHouse] = useState<HousesEnum>(
    HousesEnum.UNKNOWN,
  );

  useEffect(() => {
    setCurrentHouse(
      (localStorage?.getItem(LocalStorageEnum.FAVORITE_HOUSE) as HousesEnum) ||
        HousesEnum.UNKNOWN,
    );
  }, []);

  useEffect(() => {
    localStorage?.setItem(LocalStorageEnum.FAVORITE_HOUSE, currentHouse);
  }, [currentHouse]);

  return (
    <UseThemeContext.Provider value={{ currentHouse, setCurrentHouse }}>
      {children}
    </UseThemeContext.Provider>
  );
};

export function useTheme() {
  const context = useContext(UseThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within an ThemeProvider");
  }

  return context;
}
