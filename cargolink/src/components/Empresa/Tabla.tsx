import React from "react";

type Column = {
  key: string;
  label: string;
};

type Row = Record<string, React.ReactNode>;

type Props = {
  columns: Column[];
  rows: Row[];
  getRowId?: (row: Row, index: number) => string | number | undefined;
};

function Tabla({ columns, rows, getRowId }: Props) {
  return (
    <div>
      <table className="min-w-full table-auto text-sm">
        <thead className="text-slate-300">
          <tr className="text-left">
            {columns.map((col) => (
              <th key={col.key} className="py-2 pr-4 whitespace-nowrap">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {rows.map((row, i) => {
            const providedId = getRowId?.(row, i);
            const fallbackId =
              typeof row.id === "string" || typeof row.id === "number"
                ? row.id
                : undefined;
            const domId = providedId ?? fallbackId;

            return (
              <tr
                key={domId ?? i}
                id={domId !== undefined ? String(domId) : undefined}
                className="hover:bg-slate-800/40"
              >
                {columns.map((col) => (
                  <td key={col.key} className="py-2 pr-4 whitespace-nowrap">
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Tabla;
