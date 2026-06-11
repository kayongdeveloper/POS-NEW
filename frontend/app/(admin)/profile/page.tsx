"use client";
import React from "react";
import UserAddressCard from "@/components/user-profile/UserAddressCard";
import UserInfoCard from "@/components/user-profile/UserInfoCard";
import UserMetaCard from "@/components/user-profile/UserMetaCard";
import { useProfile } from "@/hooks/useProfile";

export default function Profile() {
  const { profile, isLoading, error } = useProfile();

  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col gap-4 animate-pulse">
            <div className="h-28 rounded-2xl bg-gray-100 dark:bg-gray-800" />
            <div className="h-48 rounded-2xl bg-gray-100 dark:bg-gray-800" />
            <div className="h-40 rounded-2xl bg-gray-100 dark:bg-gray-800" />
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-800/40 dark:bg-red-500/10 dark:text-red-400">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 fill-current">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 7C12.5523 7 13 7.44772 13 8V12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12V8C11 7.44772 11.4477 7 12 7ZM12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15Z" />
            </svg>
            {error}
          </div>
        )}

        {/* Profile Content */}
        {!isLoading && !error && profile && (
          <div className="space-y-6">
            <UserMetaCard profile={profile} />
            <UserInfoCard profile={profile} />
            <UserAddressCard />
          </div>
        )}
      </div>
    </div>
  );
}
