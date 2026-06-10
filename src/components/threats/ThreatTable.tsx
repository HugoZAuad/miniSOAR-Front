import { Threat } from "@/types/threat";
import { ThreatRow } from "./ThreatRow";

interface Props {
  threats: Threat[];
}

export function ThreatTable({ threats }: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Indicator</th>
          <th>Type</th>
          <th>Severity</th>
          <th>Hybrid</th>
          <th>Country</th>
        </tr>
      </thead>

      <tbody>
        {threats.map((threat) => (
          <ThreatRow
            key={threat.id}
            threat={threat}
          />
        ))}
      </tbody>
    </table>
  );
}