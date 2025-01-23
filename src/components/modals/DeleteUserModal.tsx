import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Loader from "@/components/Loader"; // Assume a Loader component exists
import axios from "axios";

export interface DeleteUserModalProps {
  open: boolean;
  onClose: () => void;
  userId: string; // The ID of the user to delete
  performerId: string; // The ID of the person requesting the deletion
  onDeleteSuccess: () => void;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
  open,
  onClose,
  userId,
  performerId,
  onDeleteSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      setLoading(true);

      // Step 1: Delete user from Clerk
      const clerkResponse = await axios.delete(
        `${import.meta.env.VITE_CLERK_API_BASE_URL}/delete-user/${userId}`
      );

      if (clerkResponse.status === 200) {
        toast({
          description: "User deleted successfully from Clerk.",
        });

        // Step 2: Delete user from the backend
        const backendResponse = await axios.delete(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/users/delete-user/${userId}/${performerId}`
        );

        if (backendResponse.data.status === "success") {
          toast({
            description: "User deleted successfully from backend.",
          });
          onDeleteSuccess(); // Trigger a successful deletion
        } else {
          toast({
            description: "Failed to delete user from backend.",
          });
        }
      } else {
        toast({
          description: "Failed to delete user from Clerk.",
        });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast({
        description: "An error occurred while deleting the user.",
      });
    } finally {
      setLoading(false);
      onClose(); // Close the modal after the operation is complete
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        {loading && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center z-10">
            <Loader /> {/* Show Loader */}
          </div>
        )}
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Delete User</DialogTitle>
          <DialogDescription className="text-gray-500">
            Are you sure you want to delete this user? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUserModal;
