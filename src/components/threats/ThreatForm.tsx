"use client";

import { useState } from "react";
import { createThreat } from "@/services/threat.service";

export function ThreatForm() {
  const [indicator, setIndicator] = useState("");
  const [type, setType] = useState("IP");
  const [severity, setSeverity] = useState(1);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    await createThreat({
      indicator,
      type,
      severity,
    });

    setIndicator("");
    setSeverity(1);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={indicator}
        onChange={(e) =>
          setIndicator(e.target.value)
        }
        placeholder="8.8.8.8"
      />

      <select
        value={type}
        onChange={(e) =>
          setType(e.target.value)
        }
      >
        <option value="IP">IP</option>
        <option value="DOMAIN">DOMAIN</option>
        <option value="HASH">HASH</option>
      </select>

      <input
        type="number"
        min={1}
        max={10}
        value={severity}
        onChange={(e) =>
          setSeverity(Number(e.target.value))
        }
      />

      <button type="submit">
        Registrar
      </button>
    </form>
  );
}