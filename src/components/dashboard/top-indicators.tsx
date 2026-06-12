"use client";

interface Props {
  indicators: {
    indicator: string;
    count: number;
    severity: number;
  }[];
}

export function TopIndicators({
  indicators,
}: Props) {
  return (
    <div className="rounded-xl border p-4">
      <h3 className="font-semibold mb-4">
        Top Indicators
      </h3>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">
              Indicator
            </th>

            <th className="text-left">
              Count
            </th>

            <th className="text-left">
              Severity
            </th>
          </tr>
        </thead>

        <tbody>
          {indicators.map(
            (indicator) => (
              <tr
                key={
                  indicator.indicator
                }
                className="border-b"
              >
                <td className="py-3">
                  {
                    indicator.indicator
                  }
                </td>

                <td>
                  {indicator.count}
                </td>

                <td>
                  {
                    indicator.severity
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