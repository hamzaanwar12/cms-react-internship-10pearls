import React from "react";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface GenericTableProps<TData> {
  columns: ColumnDef<TData>[];
  children: React.ReactNode;
  onSort?: (field: string, direction: "asc" | "desc") => void;
}

export function GenericTable<TData>({
  columns,
  children,
  onSort,
}: GenericTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const handleSort = (columnId: string) => {
    const currentSort = sorting[0];
    let newSort: SortingState = [];

    if (!currentSort || currentSort.id !== columnId) {
      newSort = [{ id: columnId, desc: false }];
    } else if (currentSort.id === columnId && !currentSort.desc) {
      newSort = [{ id: columnId, desc: true }];
    }
    // If it's already desc, clicking again will clear the sort

    setSorting(newSort);
    if (onSort && newSort.length > 0) {
      onSort(columnId, newSort[0].desc ? "desc" : "asc");
    }
  };

  const getSortIcon = (columnId: string) => {
    const currentSort = sorting.find(sort => sort.id === columnId);
    if (!currentSort) {
      return <ChevronsUpDown className="inline-block h-4 w-4 ml-1 text-white" />;
    }
    return currentSort.desc ? 
      <ChevronDown className="inline-block h-4 w-4 ml-1" /> : 
      <ChevronUp className="inline-block h-4 w-4 ml-1" />;
  };

  const table = useReactTable({
    data: [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
    onSortingChange: setSorting,
  });

  return (
    <div className="rounded-md border box-border p-2">
      <div className="w-full max-w-[450px] overflow-x-visible sm:max-w-full sm:min-w-[500px] md:w-full md:overflow-x-hidden lg:max-w-none">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-blue-link hover:bg-blue-link">
                {headerGroup.headers.map((header) => (
                  <TableHead 
                    key={header.id} 
                    className="text-white text-center cursor-pointer select-none"
                    onClick={() => handleSort(header.id)}
                  >
                    {header.isPlaceholder ? null : (
                      <div className="flex  text-center items-center  justify-center">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.id !== "Sr." && header.id !== "Action" && getSortIcon(header.id)}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>{children}</TableBody>
        </Table>
      </div>
    </div>
  );
}