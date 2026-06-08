"use client";

import React, { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import UserModal from "@/components/ui/modal/UserModal";

const users = [
  {
    id: 1,
    name: "Rendi Fitrianda",
    username: "rendifitrianda",
    email: "rendi@gmail.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Budi Santoso",
    username: "budisantoso",
    email: "budi@gmail.com",
    role: "Petugas",
    status: "Active",
  },
  {
    id: 3,
    name: "Andi Wijaya",
    username: "andiwijaya",
    email: "andi@gmail.com",
    role: "User",
    status: "Inactive",
  },
];

export default function BasicTables() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-800">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            User Management
          </h2>
          <p className="text-sm text-gray-500">
            Kelola akun pengguna sistem POS
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Cari user..."
            className="h-10 rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-brand-500 dark:border-gray-700 dark:bg-gray-800"
          />

          <button
            onClick={openModal}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 text-white hover:bg-brand-600"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 5V19M5 12H19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800">
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase">
                User
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase">
                Username
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase">
                Role
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase">
                Status
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold uppercase">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-t border-gray-100 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
              >
                {/* User */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 font-semibold text-brand-600">
                      {user.name.charAt(0)}
                    </div>

                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </td>

                {/* Username */}
                <td className="px-6 py-4 text-sm">@{user.username}</td>

                {/* Role */}
                <td className="px-6 py-4">
                  <span className="rounded-lg bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                    {user.role}
                  </span>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span
                    className={`rounded-lg px-3 py-1 text-xs font-medium ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                {/* Action */}
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    {/* Edit */}
                    <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 hover:bg-blue-50 hover:text-blue-600">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M16.862 3.487a2.25 2.25 0 113.182 3.182L8.25 18.463 4 20l1.537-4.25L16.862 3.487z"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    </button>

                    {/* Delete */}
                    <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 hover:bg-red-50 hover:text-red-600">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M3 6H21M8 6V4H16V6M19 6V20H5V6"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <UserModal isOpen={isModalOpen} onClose={closeModal} />;
    </div>
  );
}
