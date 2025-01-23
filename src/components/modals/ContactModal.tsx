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
import { Contact } from "@/types";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import Loader from "@/components/Loader";

export interface ContactModalProps {
  open: boolean;
  onClose: () => void;
  mode: "view" | "edit";
  contact: Contact;
  onUpdateSuccess: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({
  open,
  onClose,
  mode,
  contact,
  onUpdateSuccess,
}) => {
  const [formData, setFormData] = React.useState(contact);
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();

  const userAccessor = useSelector((state: RootState) => state.userState.user);
  const isAdmin = userAccessor?.role === "ADMIN";
  const isEditMode = mode === "edit";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/contacts/update/${
          userAccessor?.id
        }/${formData.id}`,
        formData
      );

      if (response.data.status === "success") {
        onUpdateSuccess();
        toast({
          description: "Contact updated successfully.",
        });
      } else if (response.data.status === "error") {
        toast({
          description: response.data.message || "Failed to update contact.",
        });
      }
    } catch (error) {
      console.log(error);
      
      toast({
        description:
        error?.response.data.message ||
          "An error occurred while updating the contact.",
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
            <Loader />
          </div>
        )}
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {isEditMode ? "Edit Contact" : "View Contact"}
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            {isEditMode
              ? "Make changes to the contact details and click save."
              : "You are viewing the contact details."}
          </DialogDescription>
        </DialogHeader>
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {/* ID - Visible for Admin */}
          <div>
            <Label htmlFor="id" className="text-lg font-semibold">
              ID
            </Label>
            <Input id="id" name="id" value={formData.id} disabled />
          </div>

          {/* User ID - Visible for Admin */}
          {isAdmin && (
            <div>
              <Label htmlFor="userId" className="text-lg font-semibold">
                User ID
              </Label>
              <Input
                id="userId"
                name="userId"
                value={formData.userId}
                disabled
              />
            </div>
          )}
          {!isAdmin && (
            <div>
              <Label htmlFor="userId" className="text-lg font-semibold">
                User ID
              </Label>
              <Input
                id="userId"
                name="userId"
                value={userAccessor?.id}
                disabled
              />
            </div>
          )}

          {/* Name */}
          <div>
            <Label htmlFor="name" className="text-lg font-semibold">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              disabled={!isEditMode}
              onChange={handleChange}
            />
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="phone" className="text-lg font-semibold">
              Phone
            </Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              disabled={!isEditMode}
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
              disabled={!isEditMode}
              onChange={handleChange}
            />
          </div>

          {/* Address */}
          <div className="col-span-1 sm:col-span-2">
            <Label htmlFor="address" className="text-lg font-semibold">
              Address
            </Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              disabled={!isEditMode}
              onChange={handleChange}
            />
          </div>

          {/* Created At */}
          <div>
            <Label htmlFor="createdAt" className="text-lg font-semibold">
              Created At
            </Label>
            <Input
              id="createdAt"
              name="createdAt"
              value={new Date(formData.createdAt).toLocaleString()}
              disabled
            />
          </div>

          {/* Updated At */}
          <div>
            <Label htmlFor="updatedAt" className="text-lg font-semibold">
              Updated At
            </Label>
            <Input
              id="updatedAt"
              name="updatedAt"
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

export default ContactModal;
