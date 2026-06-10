import { Threat } from "@/types/threat";

interface Props {
  threat: Threat;
}

export function ThreatDetails({
  threat,
}: Props) {
  return (
    <div>
      <h3>{threat.indicator}</h3>

      <p>Type: {threat.type}</p>
      <p>Severity: {threat.severity}</p>
      <p>Country: {threat.country}</p>
      <p>Reputation: {threat.reputationScore}</p>
      <p>Recurrency: {threat.recurrencyCount}</p>
    </div>
  );
}