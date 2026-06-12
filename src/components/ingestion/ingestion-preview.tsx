import {
  BatchThreat,
} from "@/types/batch-threat";

interface Props {
  threats: BatchThreat[];
}

export function IngestionPreview({
  threats,
}: Props) {
  return (
    <div className="rounded-lg border">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="p-3 text-left">
              Indicator
            </th>

            <th className="p-3 text-left">
              Type
            </th>

            <th className="p-3 text-left">
              Severity
            </th>
          </tr>
        </thead>

        <tbody>
          {threats.map(
            (threat, index) => (
              <tr
                key={index}
                className="border-b"
              >
                <td className="p-3">
                  {
                    threat.indicator
                  }
                </td>

                <td className="p-3">
                  {threat.type}
                </td>

                <td className="p-3">
                  {
                    threat.severity
                  }
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}