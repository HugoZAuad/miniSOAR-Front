import {
  BatchError,
} from "@/types/batch-threat";

export function IngestionErrors({
  errors,
}: {
  errors: BatchError[];
}) {
  if (!errors.length) {
    return null;
  }

  return (
    <div className="rounded-lg border p-4">
      <h3 className="font-semibold mb-4">
        Validation Errors
      </h3>

      <div className="space-y-2">
        {errors.map((error) => (
          <div
            key={error.row}
            className="text-sm text-red-500"
          >
            Row {error.row}:{" "}
            {error.message}
          </div>
        ))}
      </div>
    </div>
  );
}