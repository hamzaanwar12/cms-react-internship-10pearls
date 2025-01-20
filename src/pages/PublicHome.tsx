import React from "react";
import useGet from "@/hooks/use-GetHook"; // Assuming the hook is in the same directory

type User = {
  id: number;
  username: string;
  email: string;
  name: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deactivatedAt: string | null;
  deactivatedBy: string | null;
  contactCount: number;
};

export default function PublicHome() {
  const { data, isLoading, isError } = useGet<{
    statusCode: number;
    status: string;
    message: string;
    data: User[];
  }>("http://localhost:8000/api/users/get-users");

  // Handle loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (isError) {
    console.error("An error occurred while fetching users.");
    return <div>Error fetching user data. Please try again later.</div>;
  }

  // Handle successful data response
  return (
    <div>
      <h1 className="text-xl font-bold">User List</h1>
      <ul className="mt-4">
        {data?.data.map((user) => (
          <li
            key={user.id}
            className="p-4 border-b border-gray-200 flex justify-between items-center"
          >
            <div>
              <p className="text-lg font-semibold">{user.name}</p>
              <p className="text-sm text-gray-500">
                Role: {user.role} | Status: {user.status}
              </p>
              <p className="text-sm text-gray-500">Email: {user.email}</p>
            </div>
            <div className="text-sm text-gray-400">
              Contacts: {user.contactCount}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
