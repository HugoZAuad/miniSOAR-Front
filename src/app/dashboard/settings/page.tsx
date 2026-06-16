"use client";

import {
  useTheme,
} from "next-themes";

import {
  useSettings,
} from "@/contexts/settings-context";

import {
  Button,
} from "@/components/ui/button";

import {
  Input,
} from "@/components/ui/input";

import {
  Switch,
} from "@/components/ui/switch";

export default function SettingsPage() {
  const {
    settings,
    updateSettings,
    resetSettings,
  } = useSettings();

  const {
    theme,
    setTheme,
  } = useTheme();

  return (
    <div className="space-y-8 max-w-3xl">

      <div>
        <h1 className="text-3xl font-bold">
          Settings
        </h1>

        <p className="text-muted-foreground">
          Runtime configuration
        </p>
      </div>

      <div className="border rounded-xl p-6 space-y-4">

        <h2 className="font-semibold">
          API Configuration
        </h2>

        <Input
          value={
            settings.apiUrl
          }
          placeholder="API URL"
          onChange={(e) =>
            updateSettings({
              apiUrl:
                e.target.value,
            })
          }
        />

        <Input
          type="password"
          value={settings.apiKey}
          placeholder="API KEY"
          onChange={(e) =>
            updateSettings({
              apiKey:
                e.target.value,
            })
          }
        />

      </div>

      <div className="border rounded-xl p-6 space-y-4">

        <h2 className="font-semibold">
          Realtime
        </h2>

        <div className="flex items-center justify-between">

          <span>
            Enable Socket.IO
          </span>

          <Switch
            checked={
              settings.realtimeEnabled
            }
            onCheckedChange={(
              value
            ) =>
              updateSettings({
                realtimeEnabled:
                  value,
              })
            }
          />

        </div>

      </div>

      <div className="border rounded-xl p-6 space-y-4">

        <h2 className="font-semibold">
          Theme
        </h2>

        <div className="flex gap-2">

          <Button
            variant={
              theme ===
                "light"
                ? "default"
                : "outline"
            }
            onClick={() =>
              setTheme(
                "light"
              )
            }
          >
            Light
          </Button>

          <Button
            variant={
              theme ===
                "dark"
                ? "default"
                : "outline"
            }
            onClick={() =>
              setTheme(
                "dark"
              )
            }
          >
            Dark
          </Button>

          <Button
            variant={
              theme ===
                "system"
                ? "default"
                : "outline"
            }
            onClick={() =>
              setTheme(
                "system"
              )
            }
          >
            System
          </Button>

        </div>

      </div>

      <Button
        variant="destructive"
        onClick={
          resetSettings
        }
      >
        Reset Settings
      </Button>

    </div>
  );
}