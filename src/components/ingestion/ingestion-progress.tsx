interface Props {
  progress: number;
}

export function IngestionProgress({
  progress,
}: Props) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Import Progress</span>
        <span>{progress}%</span>
      </div>

      <div className="h-3 rounded bg-muted">
        <div
          className="h-3 rounded bg-primary transition-all"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    </div>
  );
}