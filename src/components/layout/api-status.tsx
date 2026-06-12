"use client";

import { useApiHealth } from "@/hooks/use-api-health";

export function ApiStatus() {
  const {
    isSuccess,
    isError,
  } = useApiHealth();

  return (
    <div className="flex items-center gap-2">
      <div
        className={`h-2 w-2 rounded-full ${
          isSuccess
            ? "bg-green-500"
            : isError
            ? "bg-red-500"
            : "bg-yellow-500"
        }`}
      />

      <span className="text-sm">
        {isSuccess
          ? "Online"
          : isError
          ? "Offline"
          : "Checking"}
      </span>
    </div>
  );
}