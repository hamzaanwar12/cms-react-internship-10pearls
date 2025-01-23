import React, { useState, useEffect } from "react";
import useGetAgain from "@/hooks/use-Get-AgainHook";
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
import ContactModal from "@/components/modals/ContactModal";
import DeleteContactModal from "@/components/modals/DeleteContactModel";
// import { OverflowContainer } from "@/components/NewModifyGeneric";
export default function ContactsPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortField] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"view" | "edit">("view");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); // State for delete modal

  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [check, setCheck] = useState<boolean>(false);

  const user: User | null = useSelector(
    (state: RootState) => state.userState.user
  );
  const userId = user?.id;
  const userRole = user?.role;

  const apiRoute = userRole
    ? userRole === "ADMIN"
      ? `/contacts/get-all-contacts/${userId}/paginated`
      : `/contacts/user/${userId}/paginated`
    : "";

  const { data, isLoading, isError } = useGetAgain<{
    statusCode: number;
    status: string;
    message: string;
    data: {
      content: Contact[];
    };
    totalPages: number;
    currentPage: number;
  }>(
    `${import.meta.env.VITE_API_BASE_URL}${apiRoute}?page=${currentPage}${
      sortField ? `&sort=${sortField},${sortDirection}` : ""
    }`,
    check
  );

  const handleSort = (field: string, direction: "asc" | "desc") => {
    setSortField(field);
    setSortDirection(direction);
  };

  const handleViewContact = (contact: Contact) => {
    setSelectedContact(contact);
    setModalMode("view");
    setModalOpen(true);
  };

  const handleEditContact = (contact: Contact) => {
    setSelectedContact(contact);
    setModalMode("edit");
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedContact(null);
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
  }, [userRole]);

  const handleDeleteContact = (row: Contact) => {
    console.log("Delete contact:", row);
    setSelectedContact(row); // Set the selected user to delete
    setDeleteModalOpen(true); // Open the delete confirmation modal
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
      <TableCell>{contact.address || "Not added"}</TableCell>
      <TableCell>{new Date(contact.createdAt).toLocaleDateString()}</TableCell>
      <TableCell>
        <div className="flex space-x-2">
          {userRole === "ADMIN" && contact.userId == userId && (
            <button
              onClick={() => handleEditContact(contact)}
              className="p-1 rounded-full text-blue-500 hover:bg-blue-500 hover:text-white"
            >
              <FaEdit />
            </button>
          )}
          {userRole !== "ADMIN" && (
            <button
              onClick={() => handleEditContact(contact)}
              className="p-1 rounded-full text-blue-500 hover:bg-blue-500 hover:text-white"
            >
              <FaEdit />
            </button>
          )}
          {userRole !== "ADMIN" && (
            <button
              onClick={() => handleDeleteContact(contact)}
              className="p-1 rounded-full text-red-500 hover:bg-red-500 hover:text-white"
            >
              <LuTrash2 />
            </button>
          )}

          {userRole === "ADMIN" && contact.userId == userId && (
            <button
              onClick={() => handleDeleteContact(contact)}
              className="p-1 rounded-full text-red-500 hover:bg-red-500 hover:text-white"
            >
              <LuTrash2 />
            </button>
          )}

          <button
            onClick={() => handleViewContact(contact)}
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
    <div className="p-2 flex flex-col gap-4">
      <h1 className="text-xl font-bold mb-4">Contact List</h1>
      {data?.data.content.length !== 0 ? (
        <>
          <GenericTable columns={columns} onSort={handleSort}>
            {contactRows}
          </GenericTable>
          <GenericPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <div className="text-center text-red-500">No contacts found.</div>
      )}

      {/* <OverflowContainer /> */}
      {modalOpen && selectedContact && (
        <ContactModal
          open={modalOpen}
          onClose={handleModalClose}
          mode={modalMode}
          contact={selectedContact}
          onUpdateSuccess={handleSuccess}
        />
      )}
      {selectedContact && (
        <DeleteContactModal
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          userId={ selectedContact?.userId || userId || ""}
          contactId={selectedContact?.id || 0}
          onDeleteSuccess={handleSuccess}
        />
      )}
    </div>
  );
}
