"use client";

import { Trash2, Pencil } from "lucide-react";
import type { ReactNode } from "react";

export interface AdminColumn<T> {
  key: string;
  label: string;
  render: (row: T) => ReactNode;
}

export function AdminTable<T extends { id: string }>({
  rows,
  columns,
  onEdit,
  onDelete,
}: {
  rows: T[];
  columns: AdminColumn<T>[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}) {
  return (
    <div className="scrollbar-thin overflow-x-auto rounded-[var(--radius-card)] border border-[var(--color-border)]">
      <table className="w-full min-w-[600px] border-collapse text-[13px]">
        <thead>
          <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface-raised)] text-left text-[11px] uppercase tracking-wide text-[var(--color-ink-faint)]">
            {columns.map((c) => (
              <th key={c.key} className="px-4 py-2.5 font-medium">
                {c.label}
              </th>
            ))}
            {(onEdit || onDelete) && <th className="px-4 py-2.5 font-medium text-right">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-surface-raised)]">
              {columns.map((c) => (
                <td key={c.key} className="px-4 py-3">
                  {c.render(row)}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-1">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(row)}
                        className="rounded p-1.5 text-[var(--color-ink-faint)] hover:bg-[var(--color-cobalt-soft)] hover:text-[var(--color-cobalt)]"
                        aria-label="Edit"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(row)}
                        className="rounded p-1.5 text-[var(--color-ink-faint)] hover:bg-[var(--color-down-soft)] hover:text-[var(--color-down)]"
                        aria-label="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={columns.length + 1} className="px-4 py-8 text-center text-[13px] text-[var(--color-ink-faint)]">
                No records yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
