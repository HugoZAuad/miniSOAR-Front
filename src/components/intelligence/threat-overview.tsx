"use client";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  useThreatIntelligence,
} from "@/hooks/use-threat-intelligence";

export function ThreatOverview() {
  const {
    data = [],
  } =
    useThreatIntelligence();

  const total =
    data.length;

  const critical =
    data.filter(
      (t) =>
        t.riskScore >= 80
    ).length;

  const contained =
    data.filter(
      (t) =>
        t.containment
    ).length;

  const avgRisk =
    data.length
      ? Math.round(
          data.reduce(
            (acc, t) =>
              acc +
              t.riskScore,
            0
          ) /
            data.length
        )
      : 0;

  const cards = [
    {
      title:
        "Total Threats",
      value: total,
    },
    {
      title:
        "Critical",
      value: critical,
    },
    {
      title:
        "Contained",
      value:
        contained,
    },
    {
      title:
        "Average Risk",
      value:
        avgRisk,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {cards.map(
        (card) => (
          <Card
            key={
              card.title
            }
          >
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                {
                  card.title
                }
              </p>

              <h3 className="text-3xl font-bold mt-2">
                {
                  card.value
                }
              </h3>
            </CardContent>
          </Card>
        )
      )}
    </div>
  );
}