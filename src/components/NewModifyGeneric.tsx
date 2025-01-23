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

    setSorting(newSort);
    if (onSort && newSort.length > 0) {
      onSort(columnId, newSort[0].desc ? "desc" : "asc");
    }
  };

  const getSortIcon = (columnId: string) => {
    const currentSort = sorting.find((sort) => sort.id === columnId);
    if (!currentSort) {
      return (
        <ChevronsUpDown className="inline-block h-4 w-4 ml-1 text-white" />
      );
    }
    return currentSort.desc ? (
      <ChevronDown className="inline-block h-4 w-4 ml-1" />
    ) : (
      <ChevronUp className="inline-block h-4 w-4 ml-1" />
    );
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
    // <div className="mx-auto  max-w-[250px]  xs:max-w-[420px] sm:min-w-[560px] sm:max-w-[590px] md:max-w-[700px] lg:max-w-full border-black p-1 rounded-md border box-border transition-all duration-300 ease-in-out">
    <div className="mx-auto  max-w-[250px]  xs:max-w-[420px] sm:min-w-[560px] sm:max-w-[590px] md:max-w-[700px] lg:max-w-full  p-1 rounded-md border box-border transition-all duration-300 ease-in-out">
      <div className="overflow-x-auto">
        <Table className="w-full min-w-[360px]">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-blue-link hover:bg-blue-link"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-white text-center cursor-pointer select-none whitespace-nowrap"
                    onClick={() => handleSort(header.id)}
                  >
                    {header.isPlaceholder ? null : (
                      <div className="text-center flex items-center justify-center">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.id !== "Sr." &&
                          header.id !== "Action" &&
                          getSortIcon(header.id)}
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
export function OverflowContainer() {
  return (
    <div className="w-[200px] h-[300px] bg-gray-200 overflow-x-auto overflow-y-hidden whitespace-nowrap">
      <div className="flex">
        <div className="w-[150px] h-[150px] bg-red-500 flex-shrink-0 mr-4"></div>
        <div className="w-[150px] h-[150px] bg-blue-500 flex-shrink-0 mr-4"></div>
        <div className="w-[150px] h-[150px] bg-green-500 flex-shrink-0 mr-4"></div>
        <div className="w-[150px] h-[150px] bg-yellow-500 flex-shrink-0"></div>
      </div>
    </div>
  );
}
