import React, { useState, useEffect } from "react";
import useGet from "@/hooks/use-GetHook";
import { GenericTable } from "@/components/NewModifyGeneric";
import { ActivityLog } from "@/types";
import Loader from "@/components/Loader";
import { TableRow, TableCell } from "@/components/ui/table";
import { LuTrash2, LuEye } from "react-icons/lu";
import { FaEdit } from "react-icons/fa";
import GenericPagination from "@/components/GenericPagination";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { truncateString } from "@/utils";

export default function ActivityLogsPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortField] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const user = useSelector((state: RootState) => state.userState.user);
  const userId = user?.id;
  const userRole = user?.role;

  const apiRoute = userRole
    ? userRole === "ADMIN"
      ? `/activity-logs/get-all-logs/${userId}`
      : `/activity-logs/${userId}/logs`
    : "";

  const { data, isLoading, isError } = useGet<{
    statusCode: number;
    status: string;
    message: string;
    data: {
      content: ActivityLog[];
    };
    totalPages: number;
    currentPage: number;
  }>(
    `${import.meta.env.VITE_API_BASE_URL}${apiRoute}?page=${
      currentPage === null ? 0 : currentPage
    }${sortField ? `&sort=${sortField},${sortDirection}` : ""}`
  );

  const handleSort = (field: string, direction: "asc" | "desc") => {
    setSortField(field);
    setSortDirection(direction);
  };

  const columns = React.useMemo(() => {
    const baseColumns = [
      {
        accessorKey: "Sr.",
        header: "Sr",
      },
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "action",
        header: "Action",
      },
      {
        accessorKey: "timestamp",
        header: "Timestamp",
      },
      {
        accessorKey: "details",
        header: "Details",
      },
      {
        header: "Action",
      },
    ];

    if (userRole === "ADMIN") {
      baseColumns.splice(2, 0, {
        accessorKey: "userId",
        header: "User ID",
      });
    }

    return baseColumns;
  }, [userRole]);

  const handleEditLog = (row: ActivityLog) => {
    console.log("Edit log:", row);
  };

  const handleDeleteLog = (row: ActivityLog) => {
    console.log("Delete log:", row);
  };

  const handleViewLog = (row: ActivityLog) => {
    console.log("View log:", row);
  };

  useEffect(() => {
    if (data) {
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    }
  }, [data]);

  if (isLoading) return <Loader />;

  if (isError) {
    return <div>Error fetching activity log data. Please try again later.</div>;
  }

  const activityLogRows = data?.data.content.map((log, index) => (
    <TableRow
      className="items-center text-center justify-between text-sm text-gray-500 cursor-pointer hover:scale-[1.01] hover:bg-gray-300"
      key={log.id}
    >
      <TableCell>{index + 1}</TableCell>
      <TableCell>{log.id}</TableCell>
      {userRole === "ADMIN" && (
        <TableCell>{truncateString(log.userId.toString(), 7)}</TableCell>
      )}
      <TableCell>{log.action}</TableCell>
      <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
      <TableCell>{truncateString(log.details,15)}</TableCell>
      <TableCell>
        <div className="flex gap-1">
          <button
            onClick={() => handleEditLog(log)}
            className="p-1 rounded-full text-blue-500 hover:bg-white hover:text-white"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDeleteLog(log)}
            className="p-1 rounded-full text-red-500 hover:bg-red-500 hover:text-white"
          >
            <LuTrash2 />
          </button>
          <button
            onClick={() => handleViewLog(log)}
            className="p-1 rounded-full text-green-500 hover:bg-green-500 hover:text-white"
          >
            <LuEye />
          </button>
        </div>
      </TableCell>
    </TableRow>
  ));

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-1 flex flex-col gap-4">
      <h1 className="text-xl font-bold mb-4">Activity Log List</h1>
      <GenericTable columns={columns} onSort={handleSort}>
        {activityLogRows}
      </GenericTable>
      <GenericPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
