interface Props {
  total: number;
  valid: number;
  invalid: number;
}

export function IngestionStats({
  total,
  valid,
  invalid,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card title="Total">
        {total}
      </Card>

      <Card title="Valid">
        {valid}
      </Card>

      <Card title="Invalid">
        {invalid}
      </Card>
    </div>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border p-5">
      <p className="text-sm text-muted-foreground">
        {title}
      </p>

      <h2 className="text-3xl font-bold">
        {children}
      </h2>
    </div>
  );
}