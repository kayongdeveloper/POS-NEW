"use client";
import React from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";

export default function UserAddressCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const handleSave = () => {
    console.log("Saving changes...");
    closeModal();
  };

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-500/10">
              <svg className="fill-brand-500" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C8.13401 2 5 5.13401 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13401 15.866 2 12 2ZM12 11.5C10.6193 11.5 9.5 10.3807 9.5 9C9.5 7.61929 10.6193 6.5 12 6.5C13.3807 6.5 14.5 7.61929 14.5 9C14.5 10.3807 13.3807 11.5 12 11.5Z" fill=""/>
              </svg>
            </div>
            <div>
              <h4 className="text-base font-semibold text-gray-800 dark:text-white/90">
                Address Information
              </h4>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Billing & shipping address
              </p>
            </div>
          </div>

          <button
            onClick={openModal}
            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm transition-colors hover:bg-gray-50 hover:text-brand-500 hover:border-brand-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-brand-400"
          >
            <svg className="fill-current" width="15" height="15" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z" fill=""/>
            </svg>
            Edit
          </button>
        </div>

        {/* Address Fields */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white dark:bg-gray-800 shadow-sm flex-shrink-0">
              <svg className="fill-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM3.5 12C3.5 7.30558 7.30558 3.5 12 3.5C16.6944 3.5 20.5 7.30558 20.5 12C20.5 16.6944 16.6944 20.5 12 20.5C7.30558 20.5 3.5 16.6944 3.5 12Z" fill=""/>
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">Country</p>
              <p className="text-sm font-semibold text-gray-800 dark:text-white/90">Indonesia</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white dark:bg-gray-800 shadow-sm flex-shrink-0">
              <svg className="fill-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C8.13401 2 5 5.13401 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13401 15.866 2 12 2ZM12 11.5C10.6193 11.5 9.5 10.3807 9.5 9C9.5 7.61929 10.6193 6.5 12 6.5C13.3807 6.5 14.5 7.61929 14.5 9C14.5 10.3807 13.3807 11.5 12 11.5Z" fill=""/>
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">City / State</p>
              <p className="text-sm font-semibold text-gray-800 dark:text-white/90">Ketapang</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white dark:bg-gray-800 shadow-sm flex-shrink-0">
              <svg className="fill-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M3 6C3 5.44772 3.44772 5 4 5H20C20.5523 5 21 5.44772 21 6C21 6.55228 20.5523 7 20 7H4C3.44772 7 3 6.55228 3 6ZM3 12C3 11.4477 3.44772 11 4 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H4C3.44772 13 3 12.5523 3 12ZM3 18C3 17.4477 3.44772 17 4 17H14C14.5523 17 15 17.4477 15 18C15 18.5523 14.5523 19 14 19H4C3.44772 19 3 18.5523 3 18Z" fill=""/>
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">Kode POS</p>
              <p className="text-sm font-semibold text-gray-800 dark:text-white/90">004</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white dark:bg-gray-800 shadow-sm flex-shrink-0">
              <svg className="fill-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M4 4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4H4ZM20 6H4V18H20V6ZM6 9C6 8.44772 6.44772 8 7 8H17C17.5523 8 18 8.44772 18 9C18 9.55228 17.5523 10 17 10H7C6.44772 10 6 9.55228 6 9ZM7 12C6.44772 12 6 12.4477 6 13C6 13.5523 6.44772 14 7 14H12C12.5523 14 13 13.5523 13 13C13 12.4477 12.5523 12 12 12H7Z" fill=""/>
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">TAX ID</p>
              <p className="text-sm font-semibold text-gray-800 dark:text-white/90">AS4568384</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[500px] m-4">
        <div className="relative w-full overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900">
          
          {/* Modal Header */}
          <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-500/10">
              <svg className="fill-brand-500" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C8.13401 2 5 5.13401 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13401 15.866 2 12 2ZM12 11.5C10.6193 11.5 9.5 10.3807 9.5 9C9.5 7.61929 10.6193 6.5 12 6.5C13.3807 6.5 14.5 7.61929 14.5 9C14.5 10.3807 13.3807 11.5 12 11.5Z" fill=""/>
              </svg>
            </div>
            <div>
              <h4 className="text-base font-semibold text-gray-800 dark:text-white/90">
                Edit Address
              </h4>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Update your billing & shipping address
              </p>
            </div>
          </div>

          {/* Modal Body */}
          <form className="flex flex-col">
            <div className="px-6 py-5 flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label>Country</Label>
                  <Input type="text" defaultValue="Indonesia" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>City / State</Label>
                  <Input type="text" defaultValue="Ketapang, Indonesia." />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>Kode POS</Label>
                  <Input type="text" defaultValue="004" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>TAX ID</Label>
                  <Input type="text" defaultValue="AS4568384" />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 dark:border-gray-800">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}