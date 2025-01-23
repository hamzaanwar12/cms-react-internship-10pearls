import React, { useState, useEffect } from "react";
import useGetAgain from "@/hooks/use-Get-AgainHook";
import { GenericTable } from "@/components/NewModifyGeneric";

import { User } from "@/types";
import Loader from "@/components/Loader";
import { TableRow, TableCell } from "@/components/ui/table";
import { LuTrash2, LuEye } from "react-icons/lu";
import { FaEdit } from "react-icons/fa";
import { truncateString } from "@/utils";
import GenericPagination from "@/components/GenericPagination";

import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import UserModal from "@/components/modals/UserModal";
import DeleteUserModal from "@/components/modals/DeleteUserModal";

export default function Users() {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortField] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"view" | "edit">("view");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); // State for delete modal

  const [check, setCheck] = useState(false);
  const globalUser: User | null = useSelector(
    (state: RootState) => state.userState.user
  );
  const userId = globalUser?.id;

  // Updated fetch with sorting parameters
  const { data, isLoading, isError } = useGetAgain<{
    statusCode: number;
    status: string;
    message: string;
    data: {
      content: User[];
    };
    totalPages: number;
    currentPage: number;
  }>(
    `${
      import.meta.env.VITE_API_BASE_URL
    }/users/${userId}/paginated-users?page=${currentPage}${
      sortField ? `&sort=${sortField},${sortDirection}` : ""
    }`,
    check
  );

  // Handle sorting
  const handleSort = (field: string, direction: "asc" | "desc") => {
    setSortField(field);
    setSortDirection(direction);
  };

  // Define columns for the table
  const columns = React.useMemo(
    () => [
      {
        accessorKey: "Sr.",
        header: "Sr",
      },
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "username",
        header: "Username",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "role",
        header: "Role",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "contactCount",
        header: "Contacts",
      },
      {
        header: "Action",
      },
    ],
    []
  );

  const handleDeleteUser = (row: User) => {
    setSelectedUser(row); // Set the selected user to delete
    setDeleteModalOpen(true); // Open the delete confirmation modal
  };

  const handleEditUser = (row: User) => {
    console.log("Edit user:", row);
    setSelectedUser(row); // Explicitly set the specific row user
    setModalMode("edit");
    setModalOpen(true);
  };

  const handleViewUser = (row: User) => {
    console.log("View user:", row);
    setSelectedUser(row); // Explicitly set the specific row user
    setModalMode("view");
    setModalOpen(true);
  };

  useEffect(() => {
    if (data) {
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    }
  }, [data]);

  // Handle loading state
  if (isLoading) {
    return <Loader />;
  }

  // Handle error state
  if (isError) {
    console.error("An error occurred while fetching users.");
    return <div>Error fetching user data. Please try again later.</div>;
  }

  const userRows = data?.data.content.map((row, index) => (
    <TableRow
      className="items-center text-center justify-between text-sm text-gray-500 cursor-pointer hover:scale-[1.01] hover:bg-gray-300"
      key={row.id}
    >
      <TableCell>{index + 1}</TableCell>
      <TableCell>{truncateString(row.id, 7)}</TableCell>
      <TableCell>{row.username}</TableCell>
      <TableCell>{row.email}</TableCell>
      <TableCell>{row.role}</TableCell>
      <TableCell>
        <span
          className={`${
            row.status === "ACTIVE" ? "text-green-600" : "text-red-600"
          }`}
        >
          {row.status}
        </span>
      </TableCell>
      <TableCell>{row.contactCount}</TableCell>
      <TableCell>
        <div className="flex space-x-2">
          <button
            onClick={() => handleEditUser(row)}
            className="p-1 rounded-full text-blue-500 hover:bg-blue-500 hover:text-white"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDeleteUser(row)}
            className="p-1 rounded-full text-red-500 hover:bg-red-500 hover:text-white"
          >
            <LuTrash2 />
          </button>
          <button
            onClick={() => handleViewUser(row)}
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

  const handleSuccess = () => {
    setCheck(!check);
  };
  return (
    <div className="p-4 flex flex-col gap-4">
      <h1 className="text-xl font-bold mb-4">User List</h1>
      <GenericTable columns={columns} onSort={handleSort}>
        {userRows}
      </GenericTable>
      <GenericPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {selectedUser && (
        <UserModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          mode={modalMode}
          user={selectedUser}
          onUpdateSuccess={handleSuccess}
        />
      )}
      {selectedUser && (
        <DeleteUserModal
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          userId={selectedUser.id}
          performerId={userId || ""}
          onDeleteSuccess={handleSuccess}
        />
      )}
    </div>
  );
}
