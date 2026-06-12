export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-4 gap-4">
        {Array.from({
          length: 4,
        }).map((_, i) => (
          <div
            key={i}
            className="h-32 rounded-xl border animate-pulse"
          />
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="h-96 rounded-xl border animate-pulse" />
        <div className="h-96 rounded-xl border animate-pulse" />
      </div>
    </div>
  );
}