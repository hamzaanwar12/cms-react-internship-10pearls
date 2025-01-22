import React from "react";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  //   TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface GenericTableProps<TData> {
  columns: ColumnDef<TData>[]; // Columns for the table
  children: React.ReactNode; // Rows are passed directly as children
}

export function GenericTable<TData>({
  columns,
  children,
}: GenericTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data: [], // Empty because data is provided directly via rows
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
    onSortingChange: setSorting,
  });

  return (
    <div className="rounded-md border box-border p-2">
      {/* Table container with responsive behavior */}
      <div className="w-full max-w-[450px] overflow-x-visible sm:max-w-full sm:min-w-[500px] md:w-full md:overflow-x-hidden lg:max-w-none">
        <Table>
          {/* Table Header */}
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-blue-link hover:bg-blue-link">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-white text-center">
                    {header.isPlaceholder ? null : (
                      <div
                        className="text-center items-center"
                        onClick={() =>
                          header.column.toggleSorting(
                            header.column.getIsSorted() === "asc"
                          )
                        }
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          {/* Table Body */}
          <TableBody>{children}</TableBody>
        </Table>
      </div>
    </div>
  );
}
