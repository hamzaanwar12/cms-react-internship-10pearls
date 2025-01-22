import React, { useState, useEffect } from "react";
import useGet from "@/hooks/use-GetHook";
import { GenericTable } from "@/components/NewModifyGeneric";
import { User, Contact } from "@/types";
import Loader from "@/components/Loader";
import { TableRow, TableCell } from "@/components/ui/table";
import { LuTrash2, LuEye } from "react-icons/lu";
import { FaEdit } from "react-icons/fa";
import { truncateString } from "@/utils";
import GenericPagination from "@/components/GenericPagination";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function ContactsPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortField] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const user: User | null = useSelector((state: RootState) => state.userState.user);
  const userId = user?.id;
  const userRole = user?.role;

  const apiRoute = userRole
    ? userRole === "ADMIN"
      ? `/contacts/get-all-contacts/${userId}/paginated`
      : `/contacts/user/${userId}/paginated`
    : "";

  const { data, isLoading, isError } = useGet<{
    statusCode: number;
    status: string;
    message: string;
    data: {
      content: Contact[];
    };
    totalPages: number;
    currentPage: number;
  }>(`${import.meta.env.VITE_API_BASE_URL}${apiRoute}?page=${currentPage}${
    sortField ? `&sort=${sortField},${sortDirection}` : ""
  }`);

  const handleSort = (field: string, direction: "asc" | "desc") => {
    setSortField(field);
    setSortDirection(direction);
  };

  const columns = React.useMemo(
    () => {
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
          accessorKey: "name",
          header: "Name",
        },
        {
          accessorKey: "phone",
          header: "Phone",
        },
        {
          accessorKey: "email",
          header: "Email",
        },
        {
          accessorKey: "address",
          header: "Address",
        },
        {
          accessorKey: "createdAt",
          header: "Created At",
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
    },
    [userRole]
  );

  const handleEditContact = (row: Contact) => {
    console.log("Edit contact:", row);
  };

  const handleDeleteContact = (row: Contact) => {
    console.log("Delete contact:", row);
  };

  const handleViewContact = (row: Contact) => {
    console.log("View contact:", row);
  };

  useEffect(() => {
    if (data) {
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    }
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    console.error("An error occurred while fetching contacts.");
    return <div>Error fetching contact data. Please try again later.</div>;
  }

  const contactRows = data?.data.content.map((contact, index) => (
    <TableRow
      className="items-center text-center justify-between text-sm text-gray-500 cursor-pointer hover:scale-[1.01] hover:bg-gray-300"
      key={contact.id}
    >
      <TableCell>{index + 1}</TableCell>
      <TableCell>{contact.id}</TableCell>
      {userRole === "ADMIN" && (
        <TableCell>{truncateString(contact.userId.toString(), 7)}</TableCell>
      )}
      <TableCell>{contact.name}</TableCell>
      <TableCell>{contact.phone}</TableCell>
      <TableCell>{contact.email}</TableCell>
      <TableCell>{contact.address}</TableCell>
      <TableCell>{new Date(contact.createdAt).toLocaleDateString()}</TableCell>
      <TableCell>
        <div className="flex space-x-2">
          <button
            onClick={() => handleEditContact(contact)}
            className="p-2 rounded-full text-blue-500 hover:bg-white hover:text-white"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDeleteContact(contact)}
            className="p-2 rounded-full text-red-500 hover:bg-red-500 hover:text-white"
          >
            <LuTrash2 />
          </button>
          <button
            onClick={() => handleViewContact(contact)}
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
      <h1 className="text-xl font-bold mb-4">Contact List</h1>
      <GenericTable columns={columns} onSort={handleSort}>
        {contactRows}
      </GenericTable>
      <GenericPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}