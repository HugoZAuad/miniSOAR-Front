"use client";

import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Threat } from "@/types/threat";

interface Props {
  threat: Threat;
}

export function ThreatActions({
  threat,
}: Props) {
  return (
    <div className="border rounded-xl p-5">
      <h3 className="font-semibold mb-4">
        Actions
      </h3>

      <div className="flex flex-wrap gap-3">

        <Button>
          Contain
        </Button>

        <Button
          variant="outline"
        >
          Release
        </Button>

        <Button
          variant="outline"
        >
          <Download
            className="w-4 h-4 mr-2"
          />
          Export IOC
        </Button>

        <Button
          variant="secondary"
          onClick={() =>
            window.open(
              `https://www.virustotal.com/gui/search/${threat.indicator}`,
              "_blank"
            )
          }
        >
          VirusTotal
        </Button>

      </div>
    </div>
  );
}