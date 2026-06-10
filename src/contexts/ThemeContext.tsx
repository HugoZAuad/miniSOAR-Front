"use client";

import {
  createContext,
  useContext,
} from "react";

import { useTheme } from "next-themes";

interface ThemeContextProps {
  theme?: string;
  setTheme: (theme: string) => void;
  toggleTheme: () => void;
}

const ThemeContext =
  createContext<ThemeContextProps | null>(
    null
  );

export function ThemeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    theme,
    setTheme,
  } = useTheme();

  const toggleTheme = () => {
    setTheme(
      theme === "dark"
        ? "light"
        : "dark"
    );
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context =
    useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useThemeContext must be used inside ThemeContextProvider"
    );
  }

  return context;
}