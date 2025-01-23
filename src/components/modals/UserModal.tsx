import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User } from "@/types";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import Loader from "@/components/Loader"; // Assume a Loader component exists

export interface UserModalProps {
  open: boolean;
  onClose: () => void;
  mode: "view" | "edit";
  user: User;
  onUpdateSuccess: () => void;
}

const UserModal: React.FC<UserModalProps> = ({
  open,
  onClose,
  mode,
  user,
  onUpdateSuccess,
}) => {
  const [formData, setFormData] = React.useState(user);
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();

  const userAccessor: User | null = useSelector(
    (state: RootState) => state.userState.user
  );
  const userRole = userAccessor?.role;
  const isEditMode = mode === "edit";
  const isAdmin = userRole === "ADMIN";

  console.log("User Accessor: ", userAccessor);
  console.log("User received: ", user);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/users/update-user/${
          formData.id
        }/${userAccessor?.id}`,
        formData
      );

      if (response.data.status === "success") {
        onUpdateSuccess();
        toast({
          description: "User updated successfully.",
          // icon: "check-circle", // Success icon
        });
      } else {
        toast({
          description: "Failed to update user.",
          // icon: "x-circle", // Error icon
        });
      }
    } catch (error: any) {
      toast({
        description: "An error occurred while updating the user.",
        // icon: "x-circle", // Error icon
      });
    } finally {
      setLoading(false);
      onClose();
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
          <DialogTitle className="text-2xl font-bold">
            {mode === "view" ? "View User" : "Edit User"}
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            {mode === "view"
              ? "You are viewing the user details."
              : "Make changes to the user details and click save."}
          </DialogDescription>
        </DialogHeader>
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {/* User ID */}
          <div className="col-span-1 sm:col-span-2">
            <Label htmlFor="id" className="text-lg font-semibold">
              User ID
            </Label>
            <Input id="id" name="id" value={formData.id} disabled />
          </div>

          {/* Username */}
          <div>
            <Label htmlFor="username" className="text-lg font-semibold">
              Username
            </Label>
            <Input
              id="username"
              name="username"
              value={formData.username}
              disabled={!isEditMode || isAdmin}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className="text-lg font-semibold">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              disabled={!isEditMode || isAdmin}
              onChange={handleChange}
            />
          </div>

          {/* Status */}
          <div className="">
            <Label htmlFor="status" className="text-lg font-semibold">
              Status
            </Label>
            <select
              id="status"
              name="status"
              value={formData.status}
              disabled={!isEditMode || !isAdmin}
              onChange={handleChange}
              className={
                isEditMode && isAdmin
                  ? "p-2 border rounded hover:bg-black hover:text-white block mt-1"
                  : "mt-1 block text-black bg-white"
              }
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="DEACTIVATED">Deactivated</option>
              <option value="SUSPENDED">Suspended</option>
            </select>
          </div>

          {/* Created At */}
          <div>
            <Label htmlFor="created_at" className="text-lg font-semibold">
              Created At
            </Label>
            <Input
              id="created_at"
              name="created_at"
              value={new Date(formData.createdAt).toLocaleString()}
              disabled
            />
          </div>

          {/* Updated At */}
          <div>
            <Label htmlFor="updated_at" className="text-lg font-semibold">
              Updated At
            </Label>
            <Input
              id="updated_at"
              name="updated_at"
              value={new Date(formData.updatedAt).toLocaleString()}
              disabled
            />
          </div>

          {/* Action Buttons */}
          {isEditMode && (
            <div className="col-span-1 sm:col-span-2 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="button" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserModal;
