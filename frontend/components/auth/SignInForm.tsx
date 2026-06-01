"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import React, { useState } from "react";

const navItems = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    label: "Sign In",
    active: true,
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
    label: "Dashboard",
    active: false,
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/>
      </svg>
    ),
    label: "Orders",
    active: false,
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    label: "Staff",
    active: false,
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
      </svg>
    ),
    label: "Settings",
    active: false,
  },
];

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#F5EDE0] dark:bg-gray-950 p-4 sm:p-6">
      <div className="flex w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl">

        {/* ── Sidebar Kiri ── */}
        <aside className="hidden lg:flex flex-col w-56 shrink-0 bg-[#2C1810] px-5 py-8 items-center justify-between">
          {/* Logo */}
          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-[#7C4A2D] flex items-center justify-center mx-auto mb-3">
              {/* Coffee cup icon */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F5C27A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 8h1a4 4 0 0 1 0 8h-1"/>
                <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z"/>
                <line x1="6" y1="2" x2="6" y2="4"/>
                <line x1="10" y1="2" x2="10" y2="4"/>
                <line x1="14" y1="2" x2="14" y2="4"/>
              </svg>
            </div>
            <span className="inline-block bg-[#F5C27A]/10 text-[#F5C27A] text-[10px] px-3 py-0.5 rounded-full border border-[#F5C27A]/30 tracking-wider mb-2">
              POS SYSTEM
            </span>
            <h2 className="text-[#F5C27A] text-base font-semibold leading-tight" style={{ fontFamily: "'Georgia', serif" }}>
              Kopi Nusantara
            </h2>
            <p className="text-[#A07060] text-[10px] tracking-[0.15em] mt-1 uppercase">Est. 2019</p>
          </div>

          {/* Nav */}
          <nav className="w-full flex flex-col gap-1.5">
            {navItems.map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  item.active
                    ? "bg-[#3D2015] text-[#F5C27A]"
                    : "text-[#A07060] hover:text-[#C8956A]"
                }`}
              >
                {item.icon}
                {item.label}
              </div>
            ))}
          </nav>

          {/* Version */}
          <p className="text-[#5A3828] text-[10px] tracking-wide">v2.4.1 · POS Terminal</p>
        </aside>

        {/* ── Form Kanan ── */}
        <div className="flex-1 bg-white dark:bg-gray-900 flex flex-col justify-center px-8 py-10">
          {/* Back link */}
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
            >
              <ChevronLeftIcon />
              Back to dashboard
            </Link>
          </div>

          {/* Heading */}
          <div className="mb-6">
            <h1
              className="text-2xl font-semibold text-gray-800 dark:text-white/90 mb-1"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Welcome back
            </h1>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Sign in to your cashier account to continue
            </p>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button className="inline-flex items-center justify-center gap-2 py-2.5 text-xs font-normal text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-gray-800 transition-colors dark:bg-white/5 dark:text-white/70 dark:border-white/10 dark:hover:bg-white/10">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d="M18.75 10.19C18.75 9.47 18.69 8.95 18.56 8.41H10.18V11.65H15.1C15 12.46 14.47 13.68 13.27 14.49L15.91 16.61C17.78 15.1 18.75 12.86 18.75 10.19Z" fill="#4285F4"/>
                <path d="M10.18 18.75C12.59 18.75 14.61 17.97 16.09 16.63L13.27 14.49C12.52 15.01 11.51 15.37 10.18 15.37C7.82 15.37 5.81 13.84 5.1 11.73L2.2 13.93C3.67 16.79 6.69 18.75 10.18 18.75Z" fill="#34A853"/>
                <path d="M5.1 11.73C4.91 11.19 4.8 10.6 4.8 10C4.8 9.4 4.91 8.81 5.09 8.27L2.2 6.07C1.6 7.26 1.25 8.59 1.25 10C1.25 11.41 1.6 12.74 2.2 13.93L5.1 11.73Z" fill="#FBBC05"/>
                <path d="M10.18 4.63C11.86 4.63 12.99 5.34 13.63 5.94L16.15 3.52C14.6 2.12 12.59 1.25 10.18 1.25C6.69 1.25 3.67 3.21 2.2 6.07L5.09 8.27C5.81 6.16 7.82 4.63 10.18 4.63Z" fill="#EB4335"/>
              </svg>
              Sign in with Google
            </button>
            <button className="inline-flex items-center justify-center gap-2 py-2.5 text-xs font-normal text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-gray-800 transition-colors dark:bg-white/5 dark:text-white/70 dark:border-white/10 dark:hover:bg-white/10">
              <svg width="16" height="16" viewBox="0 0 21 20" fill="currentColor">
                <path d="M15.67 1.875H18.43L12.4 8.758L19.49 18.125H13.94L9.6 12.444L4.63 18.125H1.87L8.31 10.763L1.51 1.875H7.2L11.13 7.068L15.67 1.875ZM14.7 16.475H16.23L6.37 3.438H4.73L14.7 16.475Z"/>
              </svg>
              Sign in with X
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100 dark:border-gray-800" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 py-1 text-gray-400 bg-white dark:bg-gray-900">or</span>
            </div>
          </div>

          {/* Fields */}
          <div className="space-y-4 mb-4">
            <div>
              <Label>
                Email <span className="text-red-400">*</span>
              </Label>
              <Input placeholder="cashier@kopinusantara.id" type="email" />
            </div>
            <div>
              <Label>
                Password <span className="text-red-400">*</span>
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                >
                  {showPassword ? (
                    <EyeIcon className="fill-gray-400 dark:fill-gray-500" />
                  ) : (
                    <EyeCloseIcon className="fill-gray-400 dark:fill-gray-500" />
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <Checkbox checked={isChecked} onChange={setIsChecked} />
              <span className="text-xs text-gray-500 dark:text-gray-400">Keep me logged in</span>
            </div>
            <Link
              href="/reset-password"
              className="text-xs text-[#7C4A2D] hover:text-[#5A3828] dark:text-[#C8956A] transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            className="w-full py-3 rounded-xl text-sm font-medium tracking-wide transition-colors"
            style={{
              background: "#2C1810",
              color: "#F5C27A",
              fontFamily: "'Georgia', serif",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#3D2015")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#2C1810")}
          >
            Sign in
          </button>

          {/* Sign Up */}
          <p className="mt-5 text-xs text-center text-gray-500 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-[#7C4A2D] hover:text-[#5A3828] dark:text-[#C8956A] font-medium"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 