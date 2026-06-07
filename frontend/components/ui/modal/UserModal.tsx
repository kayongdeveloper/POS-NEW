import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { UserCircleIcon } from "../../../icons";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function UserModal({ isOpen, onClose }: Props) {
  const handleSave = () => onClose();

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[500px] m-4">
      <div className="no-scrollbar relative w-full max-w-[500px] overflow-y-auto rounded-3xl bg-white dark:bg-gray-900">
        
        {/* Header */}
        <div className="flex items-center gap-3 px-8 py-6 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-50 dark:bg-brand-500/10">
            <UserCircleIcon className="w-6 h-6 text-brand-500" />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Create New User
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Fill in the details to add a new user
            </p>
          </div>
        </div>

        {/* Body */}
        <form className="flex flex-col">
          <div className="px-8 py-6 flex flex-col gap-5">

            {/* Username & Password */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label>Username</Label>
                <Input type="text" placeholder="e.g. johndoe" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Password</Label>
                <Input type="password" placeholder="Min. 8 characters" />
              </div>
            </div>

            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <Label>Full Name</Label>
              <Input type="text" placeholder="e.g. John Doe" />
            </div>

            {/* Role */}
            <div className="flex flex-col gap-1.5">
              <Label>Role</Label>
              <Input type="text" placeholder="e.g. Admin, Cashier" />
            </div>

          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-8 py-5 border-t border-gray-100 dark:border-gray-800">
            <Button size="sm" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave}>
              Create User
            </Button>
          </div>
        </form>

      </div>
    </Modal>
  );
}