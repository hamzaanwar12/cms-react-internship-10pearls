import React, { useState, useEffect } from "react";
import useGet from "@/hooks/use-GetHook";
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

export default function Users() {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortField] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"view" | "edit">("view");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const user: User | null = useSelector(
    (state: RootState) => state.userState.user
  );
  const userId = user?.id;

  // Updated fetch with sorting parameters
  const { data, isLoading, isError } = useGet<{
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
    }`
  );

  // Handle sorting
  const handleSort = (field: string, direction: "asc" | "desc") => {
    setSortField(field);
    setSortDirection(direction);
  };

  // Rest of your existing code...

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
    console.log("Delete user:", row);
  };
  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setModalMode("edit");
    setModalOpen(true);
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setModalMode("view");
    setModalOpen(true);
  };

  const handleSaveUser = (updatedUser: Partial<User>) => {
    console.log("Updated User Data: ", updatedUser);
    // Add logic to save user data via API
  };

  useEffect(() => {
    if (data) {
      console.log("data : ", data);
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

  const userRows = data?.data.content.map((user, index) => (
    <TableRow
      className="items-center text-center justify-between text-sm text-gray-500 cursor-pointer hover:scale-[1.01] hover:bg-gray-300"
      key={user.id}
    >
      <TableCell>{index + 1}</TableCell>
      <TableCell>{truncateString(user.id, 7)}</TableCell>
      <TableCell>{user.username}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.role}</TableCell>
      <TableCell>
        <span
          className={`${
            user.status === "ACTIVE" ? "text-green-600" : "text-red-600"
          }`}
        >
          {user.status}
        </span>
      </TableCell>
      <TableCell>{user.contactCount}</TableCell>
      <TableCell>
        <div className="flex space-x-2">
          <button
            onClick={() => handleEditUser(user)}
            className="p-2 rounded-full text-blue-500 hover:bg-white hover:text-white"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDeleteUser(user)}
            className="p-2 rounded-full text-red-500 hover:bg-red-500 hover:text-white"
          >
            <LuTrash2 />
          </button>
          <button
            onClick={() => handleViewUser(user)}
            className="p-2 rounded-full text-green-500 hover:bg-green-500 hover:text-white"
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
          onSave={handleSaveUser}
        />
      )}
    </div>
  );
}
