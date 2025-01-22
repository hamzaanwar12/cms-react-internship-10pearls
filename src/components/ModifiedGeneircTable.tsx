import React from "react";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { LuArrowUpDown, LuTrash2, LuEye } from "react-icons/lu";
import { FaEdit } from "react-icons/fa";

interface GenericTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  onEdit: (row: TData) => void;
  onDelete: (row: TData) => void;
  onView: (row: TData) => void;
}

export function GenericTable<TData>({
  data,
  columns,
  onEdit,
  onDelete,
  onView,
}: GenericTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
    onSortingChange: setSorting,
  });

  return (
    <div className="rounded-md border box-border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-blue-500">
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="text-white">
                  {header.isPlaceholder ? null : (
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() =>
                        header.column.toggleSorting(
                          header.column.getIsSorted() === "asc"
                        )
                      }
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && (
                        <LuArrowUpDown className="ml-2 h-4 w-4" />
                      )}
                    </div>
                  )}
                </TableHead>
              ))}
              <TableHead className="text-white">Actions</TableHead>
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, index) => (
              <TableRow
                key={row.id}
                className="border-b border-gray-500 transition-transform hover:scale-[1.0001] hover:bg-gray-700 hover:text-white"
              >
                <TableCell>{index + 1}</TableCell>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                <TableCell>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(row.original)}
                      className="p-2 rounded-full text-blue-500 hover:bg-white hover:text-white "
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => onDelete(row.original)}
                      className="p-2 rounded-full text-red-500 hover:bg-red-500 hover:text-white"
                    >
                      <LuTrash2 />
                    </button>
                    <button
                      onClick={() => onView(row.original)}
                      className="p-2 rounded-full text-green-500 hover:bg-green-500 hover:text-white"
                    >
                      <LuEye />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length + 1} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
