import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import Image from "next/image";

interface User {
  id: number;
  avatar: string;
  name: string;
  email: string;
  username: string;
  role: string;
  status: "Active" | "Inactive" | "Pending";
}

const tableData: User[] = [
  {
    id: 1,
    avatar: "/images/user/user-17.jpg",
    name: "Lindsey Curtis",
    email: "lindsey@example.com",
    username: "lindsey.curtis",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    avatar: "/images/user/user-18.jpg",
    name: "Kaiya George",
    email: "kaiya@example.com",
    username: "kaiya.george",
    role: "Cashier",
    status: "Active",
  },
  {
    id: 3,
    avatar: "/images/user/user-17.jpg",
    name: "Zain Geidt",
    email: "zain@example.com",
    username: "zain.geidt",
    role: "Cashier",
    status: "Pending",
  },
  {
    id: 4,
    avatar: "/images/user/user-20.jpg",
    name: "Abram Schleifer",
    email: "abram@example.com",
    username: "abram.s",
    role: "Admin",
    status: "Inactive",
  },
  {
    id: 5,
    avatar: "/images/user/user-21.jpg",
    name: "Carla George",
    email: "carla@example.com",
    username: "carla.george",
    role: "Cashier",
    status: "Active",
  },
];

const roleBadgeStyle = (role: string) => {
  switch (role) {
    case "Admin":
      return "bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400";
    case "Cashier":
      return "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400";
    default:
      return "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400";
  }
};

export default function UserTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      {/* Table Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-white/[0.05]">
        <div>
          <div className="flex items-center gap-2 mb-2">
          </div>
          <h3 className="text-sm font-semibold text-gray-800 dark:text-white/90">
            User Management
          </h3>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
            {tableData.length} total users
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs text-gray-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            {tableData.filter((u) => u.status === "Active").length} Active
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[700px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] bg-gray-50/50 dark:bg-white/[0.02]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 text-start"
                >
                  User
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 text-start"
                >
                  Username
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 text-start"
                >
                  Role
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 text-start"
                >
                  Status
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 text-start"
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {tableData.map((user) => (
                <TableRow
                  key={user.id}
                  className="hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors"
                >
                  {/* User */}
                  <TableCell className="px-5 py-3.5 text-start">
                    <div className="flex items-center gap-3">
                      <div className="relative flex-shrink-0">
                        <div className="w-9 h-9 overflow-hidden rounded-full ring-2 ring-gray-100 dark:ring-white/10">
                          <Image
                            width={36}
                            height={36}
                            src={user.avatar}
                            alt={user.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        {user.status === "Active" && (
                          <span className="absolute bottom-0 right-0 block w-2.5 h-2.5 rounded-full bg-green-500 ring-2 ring-white dark:ring-gray-900" />
                        )}
                      </div>
                      <div>
                        <span className="block text-sm font-medium text-gray-800 dark:text-white/90">
                          {user.name}
                        </span>
                        <span className="block text-xs text-gray-400 dark:text-gray-500">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  {/* Username */}
                  <TableCell className="px-5 py-3.5 text-start">
                    <span className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                      <svg
                        className="fill-gray-300 dark:fill-gray-600"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4zm0 2h16v2.586l-8 8-8-8V6zm0 4.828 7.293 7.293a1 1 0 0 0 1.414 0L20 10.828V18H4v-7.172z"
                          fill=""
                        />
                      </svg>
                      @{user.username}
                    </span>
                  </TableCell>

                  {/* Role */}
                  <TableCell className="px-5 py-3.5 text-start">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium ${roleBadgeStyle(user.role)}`}
                    >
                      {user.role}
                    </span>
                  </TableCell>

                  {/* Status */}
                  <TableCell className="px-5 py-3.5 text-start">
                    <Badge
                      size="sm"
                      color={
                        user.status === "Active"
                          ? "success"
                          : user.status === "Pending"
                            ? "warning"
                            : "error"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>

                  {/* Action */}
                  <TableCell className="px-5 py-3.5 text-start">
                    <div className="flex items-center gap-2">
                      <button className="flex items-center justify-center w-8 h-8 rounded-lg border border-gray-200 bg-white text-gray-500 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-brand-500/10 dark:hover:text-brand-400">
                        <svg
                          className="fill-current"
                          width="14"
                          height="14"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                            fill=""
                          />
                        </svg>
                      </button>
                      <button className="flex items-center justify-center w-8 h-8 rounded-lg border border-gray-200 bg-white text-gray-500 transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-red-500/10 dark:hover:text-red-400">
                        <svg
                          className="fill-current"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M9 3a1 1 0 0 0-1 1H5a1 1 0 0 0 0 2h14a1 1 0 1 0 0-2h-3a1 1 0 0 0-1-1H9zM6 7a1 1 0 0 1 1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V8a1 1 0 1 1 2 0v10a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V8a1 1 0 0 1 1-1zm3 2a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1z"
                            fill=""
                          />
                        </svg>
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Table Footer */}
      <div className="flex items-center justify-between px-5 py-3.5 border-t border-gray-100 dark:border-white/[0.05]">
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Showing {tableData.length} of {tableData.length} users
        </p>
        <div className="flex items-center gap-1">
          <button
            className="flex items-center justify-center w-7 h-7 rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-white/[0.03] disabled:opacity-40"
            disabled
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button className="flex items-center justify-center w-7 h-7 rounded-lg bg-brand-500 text-white text-xs font-medium">
            1
          </button>
          <button
            className="flex items-center justify-center w-7 h-7 rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-white/[0.03] disabled:opacity-40"
            disabled
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18l6-6-6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
