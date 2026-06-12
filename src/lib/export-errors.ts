import {
  BatchError,
} from "@/types/batch-threat";

export function exportErrors(
  errors: BatchError[]
) {
  const csv =
    [
      "row,error",
      ...errors.map(
        (e) =>
          `${e.row},${e.message}`
      ),
    ].join("\n");

  const blob =
    new Blob(
      [csv],
      {
        type:
          "text/csv",
      }
    );

  const url =
    URL.createObjectURL(
      blob
    );

  const a =
    document.createElement(
      "a"
    );

  a.href = url;
  a.download =
    "ingestion-errors.csv";

  a.click();
}