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

export interface DeleteContactModalProps {
  open: boolean;
  onClose: () => void;
  userId: string; // ID of the user owning the contact
  contactId: string; // ID of the contact to be deleted
  onDeleteSuccess: () => void; // Callback to trigger a refresh or update UI
}

const DeleteContactModal: React.FC<DeleteContactModalProps> = ({
  open,
  onClose,
  userId,
  contactId,
  onDeleteSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      setLoading(true);

      // Step 1: Delete the contact from the backend
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/contacts/${userId}/${contactId}`
      );

      if (response.data.status === "success") {
        toast({
          description: "Contact deleted successfully.",
        });
        onDeleteSuccess(); // Trigger success callback
      } else {
        toast({
          description: "Failed to delete contact.",
        });
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast({
        description: error?.response.data.message || "An error occurred while deleting the contact.",
      });
    } finally {
      setLoading(false);
      onClose(); // Close the modal after the operation
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
          <DialogTitle className="text-2xl font-bold">Delete Contact</DialogTitle>
          <DialogDescription className="text-gray-500">
            Are you sure you want to delete this contact? This action cannot be undone.
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

export default DeleteContactModal;
