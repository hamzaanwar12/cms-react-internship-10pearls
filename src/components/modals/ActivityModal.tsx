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
import { ActivityLog } from "@/types";

export interface ActivityLogModalProps {
  open: boolean;
  onClose: () => void;
  activityLog: ActivityLog;
}

const ActivityLogModal: React.FC<ActivityLogModalProps> = ({
  open,
  onClose,
  activityLog,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            View Activity Log
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            Detailed information about the selected activity log.
          </DialogDescription>
        </DialogHeader>
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {/* Activity Log ID */}
          <div>
            <Label htmlFor="id" className="text-lg font-semibold">
              ID
            </Label>
            <Input id="id" name="id" value={activityLog.id} disabled />
          </div>

          {/* User ID */}
          <div>
            <Label htmlFor="userId" className="text-lg font-semibold">
              User ID
            </Label>
            <Input
              id="userId"
              name="userId"
              value={activityLog.userId}
              disabled
            />
          </div>

          {/* Action */}
          <div>
            <Label htmlFor="action" className="text-lg font-semibold">
              Action
            </Label>
            <Input
              id="action"
              name="action"
              value={activityLog.action}
              disabled
            />
          </div>

          {/* Timestamp */}
          <div>
            <Label htmlFor="timestamp" className="text-lg font-semibold">
              Timestamp
            </Label>
            <Input
              id="timestamp"
              name="timestamp"
              value={new Date(activityLog.timestamp).toLocaleString()}
              disabled
            />
          </div>

          {/* Details */}
          <div className="col-span-1 sm:col-span-2">
            <Label htmlFor="details" className="text-lg font-semibold">
              Details
            </Label>
            <Input
              id="details"
              name="details"
              value={activityLog.details}
              disabled
            />
          </div>

          {/* Close Button */}
          <div className="col-span-1 sm:col-span-2 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ActivityLogModal;
