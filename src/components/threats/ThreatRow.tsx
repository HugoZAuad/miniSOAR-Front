import { Threat } from "@/types/threat";

interface Props {
  threat: Threat;
}

export function ThreatRow({ threat }: Props) {
  return (
    <tr>
      <td>{threat.indicator}</td>
      <td>{threat.type}</td>
      <td>{threat.severity}</td>
      <td>{threat.hybridScore}</td>
      <td>{threat.country}</td>
    </tr>
  );
}