import React from "react";

type Column = {
  key: string;
  label: string;
};

type Props = {
  columns: Column[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: Array<Record<string, string | any>>;
};

function Tabla({ columns, rows }: Props) {
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
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-slate-800/40">
              {columns.map((col) => (
                <td key={col.key} className="py-2 pr-4 whitespace-nowrap">
                  {row[col.key] as React.ReactNode}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tabla;
