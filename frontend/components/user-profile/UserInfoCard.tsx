"use client";
import { useModal } from "../../hooks/useModal";
import type { ProfileResponse } from "@/types/auth";

type ProfileData = ProfileResponse["data"];

interface UserInfoCardProps {
  profile: ProfileData;
}

export default function UserInfoCard({ profile }: UserInfoCardProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const handleSave = () => {
    console.log("Saving changes...");
    closeModal();
  };

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:bg-gray-dark dark:border-gray-800 lg:p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-500/10">
            <svg className="fill-brand-500" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 14.1526 4.3002 16.1184 5.61936 17.616C6.17279 15.3096 8.24852 13.5955 10.7246 13.5955H13.2746C15.7509 13.5955 17.8268 15.31 18.38 17.6167C19.6996 16.119 20.5 14.153 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5ZM17.0246 18.8566V18.8455C17.0246 16.7744 15.3457 15.0955 13.2746 15.0955H10.7246C8.65354 15.0955 6.97461 16.7744 6.97461 18.8455V18.856C8.38223 19.8895 10.1198 20.5 12 20.5C13.8798 20.5 15.6171 19.8898 17.0246 18.8566ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11.9991 7.25C10.8847 7.25 9.98126 8.15342 9.98126 9.26784C9.98126 10.3823 10.8847 11.2857 11.9991 11.2857C13.1135 11.2857 14.0169 10.3823 14.0169 9.26784C14.0169 8.15342 13.1135 7.25 11.9991 7.25Z" fill=""/>
            </svg>
          </div>
          <div>
            <h4 className="text-base font-semibold text-gray-800 dark:text-white/90">
              Personal Information
            </h4>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Account & contact details
            </p>
          </div>
        </div>

        {/* <button
          onClick={openModal}
          className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm transition-colors hover:bg-gray-50 hover:text-brand-500 hover:border-brand-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-brand-400"
        >
          <svg className="fill-current" width="15" height="15" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z" fill=""/>
          </svg>
          Edit
        </button> */}
      </div>

      {/* Info Fields */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">

        <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white dark:bg-gray-800 shadow-sm flex-shrink-0">
            <svg className="fill-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 3.5C9.51472 3.5 7.5 5.51472 7.5 8C7.5 10.4853 9.51472 12.5 12 12.5C14.4853 12.5 16.5 10.4853 16.5 8C16.5 5.51472 14.4853 3.5 12 3.5ZM9 8C9 6.34315 10.3431 5 12 5C13.6569 5 15 6.34315 15 8C15 9.65685 13.6569 11 12 11C10.3431 11 9 9.65685 9 8ZM6 20.5C6 17.1863 8.68629 14.5 12 14.5C15.3137 14.5 18 17.1863 18 20.5C18 20.7761 17.7761 21 17.5 21C17.2239 21 17 20.7761 17 20.5C17 17.7386 14.7614 15.5 12 15.5C9.23858 15.5 7 17.7386 7 20.5C7 20.7761 6.77614 21 6.5 21C6.22386 21 6 20.7761 6 20.5Z" fill=""/>
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">Full Name</p>
            <p className="text-sm font-semibold text-gray-800 dark:text-white/90 truncate">{profile.name}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white dark:bg-gray-800 shadow-sm flex-shrink-0">
            <svg className="fill-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 3.5C9.51472 3.5 7.5 5.51472 7.5 8C7.5 10.4853 9.51472 12.5 12 12.5C14.4853 12.5 16.5 10.4853 16.5 8C16.5 5.51472 14.4853 3.5 12 3.5ZM9 8C9 6.34315 10.3431 5 12 5C13.6569 5 15 6.34315 15 8C15 9.65685 13.6569 11 12 11C10.3431 11 9 9.65685 9 8ZM6 20.5C6 17.1863 8.68629 14.5 12 14.5C15.3137 14.5 18 17.1863 18 20.5C18 20.7761 17.7761 21 17.5 21C17.2239 21 17 20.7761 17 20.5C17 17.7386 14.7614 15.5 12 15.5C9.23858 15.5 7 17.7386 7 20.5C7 20.7761 6.77614 21 6.5 21C6.22386 21 6 20.7761 6 20.5Z" fill=""/>
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">Username</p>
            <p className="text-sm font-semibold text-gray-800 dark:text-white/90 truncate">{profile.username}</p>
          </div>
        </div>

        {/* <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white dark:bg-gray-800 shadow-sm flex-shrink-0">
            <svg className="fill-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M3.75 5.25C3.33579 5.25 3 5.58579 3 6V18C3 18.4142 3.33579 18.75 3.75 18.75H20.25C20.6642 18.75 21 18.4142 21 18V6C21 5.58579 20.6642 5.25 20.25 5.25H3.75ZM4.5 7.1194V17.25H19.5V7.1194L12.3479 13.166C12.1469 13.3382 11.8531 13.3382 11.6521 13.166L4.5 7.1194ZM18.3975 6.75H5.6025L12 12.6419L18.3975 6.75Z" fill=""/>
            </svg>
          </div> */}
          {/* <div className="min-w-0">
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">Email Address</p>
            <p className="text-sm font-semibold text-gray-800 dark:text-white/90 truncate">rendi.fitrianda@ui.com</p>
          </div> */}
        {/* </div> */}

        {/* <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white dark:bg-gray-800 shadow-sm shrink-0">
            <svg className="fill-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M6.00994 3.75C5.18749 3.74788 4.4235 4.17048 3.98772 4.87295L3.24076 6.07089C2.65587 7.00066 2.71209 8.20659 3.38322 9.07279C5.14729 11.3551 7.24085 13.3921 9.57829 15.0878C10.4607 15.7342 11.649 15.769 12.5688 15.1731L13.7432 14.3934C14.4094 13.9498 14.7612 13.1564 14.6379 12.3597L14.5168 11.5795C14.4529 11.1728 14.6009 10.7615 14.9086 10.4896L16.7558 8.84539C17.3081 8.35636 17.4528 7.55274 17.1048 6.90388L16.4609 5.69803C16.0677 4.96681 15.2939 4.52417 14.4648 4.56467L13.3519 4.61851C12.8796 4.6418 12.4285 4.41601 12.1623 4.02261L11.548 3.12756C11.1304 2.51823 10.4416 2.15588 9.70625 2.16324L8.05266 2.17949C7.28503 2.18715 6.58258 2.60066 6.20184 3.26938L6.00994 3.75ZM5.0023 5.65C5.16948 5.38282 5.46459 5.22003 5.78 5.2201L7.43359 5.20386C7.60513 5.20212 7.76577 5.28637 7.86168 5.42887L8.47604 6.32392C8.97394 7.06076 9.80631 7.50282 10.6918 7.45908L11.8047 7.40524C11.9774 7.39685 12.1425 7.47989 12.2388 7.62438L12.8828 8.83023C12.9553 8.96713 12.9263 9.13525 12.8118 9.23897L10.9646 10.8832C10.1853 11.5748 9.84266 12.6325 10.0605 13.6523L10.1816 14.4325C10.2098 14.6137 10.1259 14.793 9.97133 14.8908L8.79694 15.6706C8.36551 15.9572 7.80352 15.9384 7.39099 15.6234C5.17803 14.0239 3.19339 12.0944 1.52145 9.93783C1.2356 9.57169 1.21395 9.06576 1.46693 8.67598L2.21389 7.47804C2.35386 7.25656 2.59 7.11474 2.84863 7.11156L4.50222 7.0953C4.73785 7.09303 4.94693 6.95569 5.0411 6.74603L5.0023 5.65Z" fill=""/>
            </svg>
          </div> */}
          {/* <div className="min-w-0">
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">Phone</p>
            <p className="text-sm font-semibold text-gray-800 dark:text-white/90 truncate">+09 363 398 46</p>
          </div> */}
        {/* </div> */}

        <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 lg:col-span-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white dark:bg-gray-800 shadow-sm shrink-0">
            <svg className="fill-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M4 4C3.44772 4 3 4.44772 3 5V19C3 19.5523 3.44772 20 4 20H20C20.5523 20 21 19.5523 21 19V5C21 4.44772 20.5523 4 20 4H4ZM5 18V6H19V18H5ZM7 9C7 8.44772 7.44772 8 8 8H16C16.5523 8 17 8.44772 17 9C17 9.55228 16.5523 10 16 10H8C7.44772 10 7 9.55228 7 9ZM8 12C7.44772 12 7 12.4477 7 13C7 13.5523 7.44772 14 8 14H13C13.5523 14 14 13.5523 14 13C14 12.4477 13.5523 12 13 12H8Z" fill=""/>
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">Role</p>
            <p className="text-sm font-semibold text-gray-800 dark:text-white/90">{profile.role}</p>
          </div>
        </div>

      </div>

    </div>
  );
}