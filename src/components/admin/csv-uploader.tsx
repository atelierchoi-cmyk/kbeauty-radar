"use client";

import { useState } from "react";
import { Upload, AlertCircle, CheckCircle2 } from "lucide-react";
import { parseCsv } from "@/lib/csv";

export function CsvUploader({
  requiredHeaders,
  onImport,
  sampleFilename,
}: {
  requiredHeaders: string[];
  onImport: (rows: Record<string, string>[]) => void;
  sampleFilename: string;
}) {
  const [preview, setPreview] = useState<Record<string, string>[] | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [fileName, setFileName] = useState("");
  const [imported, setImported] = useState(false);

  function handleFile(file: File) {
    setImported(false);
    file.text().then((text) => {
      const { headers, rows } = parseCsv(text);
      setFileName(file.name);

      const missing = requiredHeaders.filter((h) => !headers.includes(h));
      const rowErrors: string[] = [];
      if (missing.length > 0) {
        rowErrors.push(`Missing required column${missing.length > 1 ? "s" : ""}: ${missing.join(", ")}`);
      }
      rows.forEach((row, i) => {
        requiredHeaders.forEach((h) => {
          if (missing.includes(h)) return;
          if (!row[h] || row[h].trim() === "") {
            rowErrors.push(`Row ${i + 2}: missing value for "${h}"`);
          }
        });
      });

      setErrors(rowErrors.slice(0, 20));
      setPreview(rows.slice(0, 10));
    });
  }

  return (
    <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="text-[13.5px] font-semibold">Bulk import: {sampleFilename}</h3>
          <p className="text-[12px] text-[var(--color-ink-faint)]">
            Required columns: {requiredHeaders.join(", ")}
          </p>
        </div>
      </div>

      <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed border-[var(--color-border-strong)] px-4 py-8 text-center hover:border-[var(--color-ink)]">
        <Upload className="h-5 w-5 text-[var(--color-ink-faint)]" />
        <span className="text-[13px] font-medium">{fileName || "Choose a CSV file, or drag it here"}</span>
        <input
          type="file"
          accept=".csv"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
      </label>

      {preview && (
        <div className="mt-4">
          {errors.length === 0 ? (
            <div className="mb-3 flex items-center gap-1.5 text-[12.5px] font-medium text-[var(--color-up)]">
              <CheckCircle2 className="h-4 w-4" /> No validation errors in the previewed rows.
            </div>
          ) : (
            <div className="mb-3 rounded-md bg-[var(--color-down-soft)] p-3">
              <div className="mb-1 flex items-center gap-1.5 text-[12.5px] font-semibold text-[var(--color-down)]">
                <AlertCircle className="h-4 w-4" /> {errors.length} issue{errors.length > 1 ? "s" : ""} found
              </div>
              <ul className="ml-5 list-disc text-[12px] text-[var(--color-down)]">
                {errors.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="scrollbar-thin mb-3 overflow-x-auto rounded-md border border-[var(--color-border)]">
            <table className="w-full min-w-[500px] border-collapse text-[12px]">
              <thead>
                <tr className="bg-[var(--color-surface-raised)] text-left uppercase tracking-wide text-[var(--color-ink-faint)]">
                  {Object.keys(preview[0] ?? {}).map((h) => (
                    <th key={h} className="px-3 py-2 font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {preview.map((row, i) => (
                  <tr key={i} className="border-t border-[var(--color-border)]">
                    {Object.values(row).map((v, j) => (
                      <td key={j} className="px-3 py-2 text-[var(--color-ink-muted)]">
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mb-3 text-[11.5px] text-[var(--color-ink-faint)]">
            Showing first {preview.length} rows for preview.
          </p>

          <button
            disabled={errors.length > 0}
            onClick={() => {
              onImport(preview);
              setImported(true);
            }}
            className="rounded-md bg-[var(--color-ink)] px-4 py-2 text-[13px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Import {preview.length} rows
          </button>
          {imported && <span className="ml-3 text-[12.5px] text-[var(--color-up)]">Imported into this session.</span>}
        </div>
      )}
    </div>
  );
}
