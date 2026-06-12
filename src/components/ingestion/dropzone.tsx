"use client";

interface Props {
  onFile: (
    file: File
  ) => void;
}

export function Dropzone({
  onFile,
}: Props) {
  function handleDrop(
    e: React.DragEvent
  ) {
    e.preventDefault();

    const file =
      e.dataTransfer.files[0];

    if (file) {
      onFile(file);
    }
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) =>
        e.preventDefault()
      }
      className="
        border-2
        border-dashed
        rounded-xl
        p-12
        text-center
      "
    >
      <p className="font-medium">
        Drop CSV file here
      </p>

      <p className="text-sm text-muted-foreground">
        or click to upload
      </p>
    </div>
  );
}