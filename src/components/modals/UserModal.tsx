import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User } from "@/types";

export interface UserModalProps {
  open: boolean;
  onClose: () => void;
  mode: "view" | "edit";
  user: User;
  onSave?: (updatedUser: Partial<User>) => void;
}

const UserModal: React.FC<UserModalProps> = ({ open, onClose, mode, user, onSave }) => {
  const [formData, setFormData] = React.useState(user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (onSave) onSave(formData);
    onClose();
  };

  const isEditMode = mode === "edit";
  const isAdmin = user.role === "ADMIN";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === "view" ? "View User" : "Edit User"}</DialogTitle>
          <DialogDescription>
            {mode === "view"
              ? "You are viewing the user details."
              : "Make changes to the user details and click save."}
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4">
          {/* Username */}
          <div>
            <Label htmlFor="username">Username</Label>
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
            <Label htmlFor="email">Email</Label>
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
          <div>
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              name="status"
              value={formData.status}
              disabled={!isEditMode || !isAdmin}
              onChange={handleChange}
              className="p-2 border rounded"
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="DEACTIVATED">Deactivated</option>
              <option value="SUSPENDED">Suspended</option>
            </select>
          </div>

          {/* Action Buttons */}
          {isEditMode && (
            <div className="flex justify-end gap-2">
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
