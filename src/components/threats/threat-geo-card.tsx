"use client";

import { Globe } from "lucide-react";

import { Threat } from "@/types/threat";

interface Props {
  threat: Threat;
}

export function ThreatGeoCard({
  threat,
}: Props) {
  return (
    <div className="border rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Globe className="w-4 h-4" />

        <h3 className="font-semibold">
          Geolocation
        </h3>
      </div>

      <div className="text-3xl font-bold">
        {threat.country ??
          "Unknown"}
      </div>
    </div>
  );
}