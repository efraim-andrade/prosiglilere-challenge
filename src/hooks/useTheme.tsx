"use client";

import React, { useContext, useState } from "react";
import { LocalStorageEnum } from "@/types/general";
import { HousesEnum } from "@/types/houses";

type UseThemeData = {
  currentTheme: HousesEnum;
  setCurrentTheme: React.Dispatch<React.SetStateAction<HousesEnum>>;
};

type UseThemeProps = { children: React.ReactNode };

export const UseThemeContext = React.createContext<UseThemeData>(
  {} as UseThemeData,
);

export const ThemeProvider = ({ children }: UseThemeProps) => {
  const localStorage =
    typeof window !== "undefined" ? window.localStorage : null;

  const [currentTheme, setCurrentTheme] = useState<HousesEnum>(
    (localStorage &&
      (localStorage.getItem(LocalStorageEnum.FAVORITE_HOUSE) as HousesEnum)) ||
      HousesEnum.UNKNOWN,
  );

  return (
    <UseThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>
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
