"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export interface AppSettings {
  apiUrl: string;
  apiKey: string;
  realtimeEnabled: boolean;
  theme: "light" | "dark" | "system";
}

export const DEFAULT_SETTINGS: AppSettings = {
  apiUrl:
    process.env.NEXT_PUBLIC_API_URL ??
    "http://localhost:3001/api/v1",

  apiKey:
    process.env.NEXT_PUBLIC_API_KEY ??
    "",

  realtimeEnabled: true,

  theme: "dark",
};

interface SettingsContextData {
  settings: AppSettings;

  updateSettings: (
    values: Partial<AppSettings>,
  ) => void;

  resetSettings: () => void;
}

const SettingsContext =
  createContext<
    SettingsContextData | undefined
  >(undefined);

export function SettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, setSettings] =
    useState<AppSettings>(
      DEFAULT_SETTINGS,
    );

  useEffect(() => {
    const stored =
      localStorage.getItem(
        "minisoar-settings",
      );

    if (!stored) {
      return;
    }

    try {
      setSettings(
        JSON.parse(stored),
      );
    } catch {
      localStorage.removeItem(
        "minisoar-settings",
      );
    }
  }, []);

  const updateSettings = (
    values: Partial<AppSettings>,
  ) => {
    setSettings((previous) => {
      const next = {
        ...previous,
        ...values,
      };

      localStorage.setItem(
        "minisoar-settings",
        JSON.stringify(next),
      );

      return next;
    });
  };

  const resetSettings = () => {
    localStorage.removeItem(
      "minisoar-settings",
    );

    setSettings(
      DEFAULT_SETTINGS,
    );
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSettings,
        resetSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context =
    useContext(
      SettingsContext,
    );

  if (!context) {
    throw new Error(
      "useSettings must be used inside SettingsProvider",
    );
  }

  return context;
}