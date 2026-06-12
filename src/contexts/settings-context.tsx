"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface SettingsContextData {
  apiUrl: string;
  apiKey: string;

  setApiUrl: (value: string) => void;
  setApiKey: (value: string) => void;
}

const SettingsContext =
  createContext<SettingsContextData | null>(null);

export function SettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [apiUrl, setApiUrl] = useState("");
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    setApiUrl(
      localStorage.getItem("api-url") ??
        "http://localhost:3001/api/v1"
    );

    setApiKey(
      localStorage.getItem("api-key") ?? ""
    );
  }, []);

  const handleApiUrl = (value: string) => {
    localStorage.setItem("api-url", value);
    setApiUrl(value);
  };

  const handleApiKey = (value: string) => {
    localStorage.setItem("api-key", value);
    setApiKey(value);
  };

  return (
    <SettingsContext.Provider
      value={{
        apiUrl,
        apiKey,
        setApiUrl: handleApiUrl,
        setApiKey: handleApiKey,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error("useSettings");
  }

  return context;
}