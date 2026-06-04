"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
<<<<<<< HEAD
import React, { useState } from "react";

const navItems = [
  {
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    label: "Sign In",
    active: true,
  },
  {
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    label: "Dashboard",
    active: false,
  },
  {
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <line x1="9" y1="12" x2="15" y2="12" />
        <line x1="9" y1="16" x2="13" y2="16" />
      </svg>
    ),
    label: "Orders",
    active: false,
  },
  {
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    label: "Staff",
    active: false,
  },
  {
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
      </svg>
    ),
    label: "Settings",
    active: false,
  },
];
=======
import type { AuthUser } from "@/types/auth";
import React, { useState } from "react";
import { loginUser } from "@/services/auth.service";
import { useAuth } from "@/context/AuthContext";
import './sigInForm.css';

/* ─── Floating coffee bean SVG ─── */
function CoffeeBean({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <ellipse cx="20" cy="20" rx="14" ry="9" fill="#5C3317" opacity="0.6" />
      <path
        d="M20 11 Q26 20 20 29 Q14 20 20 11Z"
        fill="#3B1F0A"
        opacity="0.5"
      />
    </svg>
  );
}

/* ─── Steam animation line ─── */
function Steam({ delay = "0s" }: { delay?: string }) {
  return (
    <div
      className="absolute bottom-0 w-0.5 rounded-full bg-gradient-to-t from-transparent via-amber-200/60 to-transparent"
      style={{
        height: "28px",
        animation: "steam 2.5s ease-in-out infinite",
        animationDelay: delay,
      }}
    />
  );
}
>>>>>>> a2ffc571e398e1e324287dfea19567c9532f7aba

export default function SignInForm() {
  const { setUser } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState<AuthUser["username"]>("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!username.trim() || !password.trim()) {
      setErrorMsg("Username dan password wajib diisi.");
      return;
    }

    setIsLoading(true);
    try {
      const result = await loginUser({ username: username.trim(), password }, isChecked);

      // Simpan user ke global context
      setUser(result.user);

      // Hard navigation (bukan router.push) agar browser mengirim cookie yang
      // baru di-set (jwtToken, userRole) ke server sebelum middleware memeriksa
      const roleHome = result.user.role === "ADMIN" ? "/" : "/kasir";
      window.location.href = roleHome;
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Login gagal. Periksa username dan password Anda.";
      setErrorMsg(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
<<<<<<< HEAD
    <div className="flex min-h-screen w-full items-center justify-center bg-[#F5EDE0] dark:bg-gray-950 p-4 sm:p-6">
      <div className="flex w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl">
        {/* ── Sidebar Kiri ── */}
        <aside className="hidden lg:flex flex-col w-56 shrink-0 bg-[#2C1810] px-5 py-8 items-center justify-between">
          {/* Logo */}
          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-[#7C4A2D] flex items-center justify-center mx-auto mb-3">
              {/* Coffee cup icon */}
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#F5C27A"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 8h1a4 4 0 0 1 0 8h-1" />
                <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" />
                <line x1="6" y1="2" x2="6" y2="4" />
                <line x1="10" y1="2" x2="10" y2="4" />
                <line x1="14" y1="2" x2="14" y2="4" />
              </svg>
            </div>
            <span className="inline-block bg-[#F5C27A]/10 text-[#F5C27A] text-[10px] px-3 py-0.5 rounded-full border border-[#F5C27A]/30 tracking-wider mb-2">
              POS SYSTEM
            </span>
            <h2
              className="text-[#F5C27A] text-base font-semibold leading-tight"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Kopi Nusantara
            </h2>
            <p className="text-[#A07060] text-[10px] tracking-[0.15em] mt-1 uppercase">
              Est. 2019
            </p>
          </div>
=======
    <>

>>>>>>> a2ffc571e398e1e324287dfea19567c9532f7aba

      <div
        className="flex min-h-screen w-full items-center justify-center p-4 sm:p-6"
        style={{ background: "linear-gradient(135deg, #F5EDE0 0%, #E8D5C0 50%, #D4B89A 100%)" }}
      >
        <div
          className="flex w-full max-w-4xl rounded-3xl overflow-hidden"
          style={{ boxShadow: "0 32px 80px rgba(44,24,16,0.28), 0 8px 24px rgba(44,24,16,0.12)" }}
        >
          {/* ══════════════════════════════════════
              LEFT PANEL — Brand / Illustration
          ══════════════════════════════════════ */}
          <aside
            className="hidden lg:flex flex-col w-[52%] shrink-0 relative overflow-hidden"
            style={{
              background: "linear-gradient(160deg, #1C0F0A 0%, #2C1810 40%, #3D2015 70%, #5C3317 100%)",
            }}
          >
            {/* Decorative radial glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 70% 60% at 50% 35%, rgba(245,194,122,0.10) 0%, transparent 70%)",
              }}
            />

<<<<<<< HEAD
          {/* Version */}
          <p className="text-[#5A3828] text-[10px] tracking-wide">
            v2.4.1 · POS Terminal
          </p>
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
                <path
                  d="M18.75 10.19C18.75 9.47 18.69 8.95 18.56 8.41H10.18V11.65H15.1C15 12.46 14.47 13.68 13.27 14.49L15.91 16.61C17.78 15.1 18.75 12.86 18.75 10.19Z"
                  fill="#4285F4"
                />
                <path
                  d="M10.18 18.75C12.59 18.75 14.61 17.97 16.09 16.63L13.27 14.49C12.52 15.01 11.51 15.37 10.18 15.37C7.82 15.37 5.81 13.84 5.1 11.73L2.2 13.93C3.67 16.79 6.69 18.75 10.18 18.75Z"
                  fill="#34A853"
                />
                <path
                  d="M5.1 11.73C4.91 11.19 4.8 10.6 4.8 10C4.8 9.4 4.91 8.81 5.09 8.27L2.2 6.07C1.6 7.26 1.25 8.59 1.25 10C1.25 11.41 1.6 12.74 2.2 13.93L5.1 11.73Z"
                  fill="#FBBC05"
                />
                <path
                  d="M10.18 4.63C11.86 4.63 12.99 5.34 13.63 5.94L16.15 3.52C14.6 2.12 12.59 1.25 10.18 1.25C6.69 1.25 3.67 3.21 2.2 6.07L5.09 8.27C5.81 6.16 7.82 4.63 10.18 4.63Z"
                  fill="#EB4335"
                />
              </svg>
              Sign in with Google
            </button>
            <button className="inline-flex items-center justify-center gap-2 py-2.5 text-xs font-normal text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-gray-800 transition-colors dark:bg-white/5 dark:text-white/70 dark:border-white/10 dark:hover:bg-white/10">
              <svg
                width="16"
                height="16"
                viewBox="0 0 21 20"
                fill="currentColor"
              >
                <path d="M15.67 1.875H18.43L12.4 8.758L19.49 18.125H13.94L9.6 12.444L4.63 18.125H1.87L8.31 10.763L1.51 1.875H7.2L11.13 7.068L15.67 1.875ZM14.7 16.475H16.23L6.37 3.438H4.73L14.7 16.475Z" />
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
              <span className="px-3 py-1 text-gray-400 bg-white dark:bg-gray-900">
                or
              </span>
            </div>
          </div>

          {/* Fields */}
          <div className="space-y-4 mb-4">
            <div>
              <Label>
                username <span className="text-red-400">*</span>
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
=======
            {/* Floating beans */}
            <CoffeeBean className="absolute top-10 left-8 w-8 h-8 float-1 opacity-40" />
            <CoffeeBean className="absolute top-24 right-12 w-5 h-5 float-2 opacity-30" />
            <CoffeeBean className="absolute bottom-32 left-14 w-6 h-6 float-3 opacity-35" />
            <CoffeeBean className="absolute bottom-16 right-8 w-10 h-10 float-1 opacity-25" />
            <CoffeeBean className="absolute top-1/2 left-4 w-4 h-4 float-2 opacity-20" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-10 py-12">
              {/* Logo ring */}
              <div className="relative mb-8">
                {/* Outer pulse ring */}
                <div
                  className="absolute inset-0 rounded-full border border-amber-400/30 pulse-ring"
                  style={{ margin: "-12px" }}
>>>>>>> a2ffc571e398e1e324287dfea19567c9532f7aba
                />
                {/* Logo circle */}
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(145deg, #5C3317, #3D2015)",
                    boxShadow: "0 8px 32px rgba(245,194,122,0.2), inset 0 1px 0 rgba(245,194,122,0.15)",
                    border: "1.5px solid rgba(245,194,122,0.2)",
                  }}
                >
                  {/* Coffee cup icon */}
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#F5C27A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 8h1a4 4 0 0 1 0 8h-1" />
                    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" />
                    <line x1="6" y1="2" x2="6" y2="4" />
                    <line x1="10" y1="2" x2="10" y2="4" />
                    <line x1="14" y1="2" x2="14" y2="4" />
                  </svg>

                  {/* Steam lines above cup */}
                  <div className="absolute flex gap-1.5" style={{ top: "-2px", left: "50%", transform: "translateX(-50%)" }}>
                    <Steam delay="0s" />
                    <Steam delay="0.6s" />
                    <Steam delay="1.2s" />
                  </div>
                </div>
              </div>

              {/* Brand text */}
              <div className="text-center mb-10">
                <span
                  className="inline-block text-[10px] tracking-[0.3em] text-amber-300/60 uppercase mb-3 border border-amber-300/20 px-4 py-1 rounded-full"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  POS System
                </span>
                <h1
                  className="text-3xl font-bold text-amber-100 leading-tight mb-2"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: "-0.01em" }}
                >
                  Kopi Nusantara
                </h1>
                <p
                  className="text-amber-400/50 text-xs tracking-[0.25em] uppercase"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Est. 2019
                </p>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 w-full max-w-xs">
                {[
                  { value: "1,240+", label: "Orders Today" },
                  { value: "98%", label: "Uptime" },
                  { value: "12", label: "Branches" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col items-center p-3 rounded-xl"
                    style={{
                      background: "rgba(245,194,122,0.06)",
                      border: "1px solid rgba(245,194,122,0.10)",
                    }}
                  >
                    <span
                      className="text-lg font-bold text-amber-300 leading-none mb-1"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {stat.value}
                    </span>
                    <span className="text-[9px] text-amber-500/50 tracking-wider uppercase text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bottom version tag */}
              <p className="absolute bottom-6 text-[10px] text-amber-900/50 tracking-widest uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
                v2.4.1 · Terminal
              </p>
            </div>
          </aside>

          {/* ══════════════════════════════════════
              RIGHT PANEL — Login Form
          ══════════════════════════════════════ */}
          <div
            className="form-panel flex-1 flex flex-col justify-center px-8 sm:px-12 py-12"
            style={{ background: "#FEFAF5" }}
          >
            {/* Mobile logo (only on small screens) */}
            <div className="flex lg:hidden items-center gap-3 mb-8">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "linear-gradient(145deg, #3D2015, #1C0F0A)" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F5C27A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 8h1a4 4 0 0 1 0 8h-1" /><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" />
                  <line x1="6" y1="2" x2="6" y2="4" /><line x1="10" y1="2" x2="10" y2="4" /><line x1="14" y1="2" x2="14" y2="4" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] tracking-widest text-amber-700/60 uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>POS System</p>
                <h2 className="text-base font-bold text-stone-800" style={{ fontFamily: "'Playfair Display', serif" }}>Kopi Nusantara</h2>
              </div>
            </div>

            {/* Heading */}
            <div className="mb-8">
              <h2
                className="text-3xl font-bold mb-2"
                style={{ fontFamily: "'Playfair Display', serif", color: "#1C0F0A" }}
              >
                Welcome back
              </h2>
              <p className="text-sm text-stone-500" style={{ fontFamily: "'Inter', sans-serif" }}>
                Sign in to your cashier account to continue
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-0">

              {/* ── Error Alert ── */}
              {errorMsg && (
                <div
                  className="mb-5 flex items-start gap-2.5 px-4 py-3 rounded-xl text-sm"
                  style={{
                    background: "rgba(220,38,38,0.07)",
                    border: "1px solid rgba(220,38,38,0.18)",
                    color: "#b91c1c",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  <svg className="mt-0.5 shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {errorMsg}
                </div>
              )}

              {/* ── Username ── */}
              <div className="field-row mb-5">
                <label
                  htmlFor="username"
                  className="block text-xs font-semibold mb-2 tracking-wide"
                  style={{ color: "#5C3317", fontFamily: "'Inter', sans-serif", letterSpacing: "0.05em" }}
                >
                  USERNAME
                </label>
                <div className="relative">
                  {/* Icon */}
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8956A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </span>
                  <Input
                    id="username"
                    placeholder="kasir01"
                    type="text"
                    className="custom-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                  />
                </div>
              </div>

              {/* ── Password ── */}
              <div className="field-row mb-6">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold mb-2 tracking-wide"
                  style={{ color: "#5C3317", fontFamily: "'Inter', sans-serif", letterSpacing: "0.05em" }}
                >
                  PASSWORD
                </label>
                <div className="relative">
                  {/* Icon */}
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8956A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="custom-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute z-30 -translate-y-1/2 right-4 top-1/2 text-stone-400 hover:text-amber-700 transition-colors"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-stone-400" />
                    ) : (
                      <EyeCloseIcon className="fill-stone-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* ── Remember & Forgot ── */}
              <div className="flex items-center justify-between mb-7">
                <label className="flex items-center gap-2.5 cursor-pointer select-none group">
                  <Checkbox checked={isChecked} onChange={setIsChecked} />
                  <span
                    className="text-xs text-stone-500 group-hover:text-stone-700 transition-colors"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Keep me logged in
                  </span>
                </label>
                <Link
                  href="/reset-password"
                  className="text-xs font-semibold transition-colors"
                  style={{ color: "#C8956A", fontFamily: "'Inter', sans-serif" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#7C4A2D")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#C8956A")}
                >
                  Forgot password?
                </Link>
              </div>

              {/* ── Submit Button ── */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn-signin w-full py-3.5 rounded-xl text-sm font-semibold tracking-wide flex items-center justify-center gap-2.5 disabled:opacity-70 disabled:cursor-not-allowed"
                style={{
                  color: "#F5C27A",
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "0.06em",
                }}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      style={{ animation: "spin-loader 0.8s linear infinite" }}
                    >
                      <circle cx="12" cy="12" r="10" stroke="rgba(245,194,122,0.3)" strokeWidth="3" />
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="#F5C27A" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    Signing in…
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                      <polyline points="10 17 15 12 10 7" />
                      <line x1="15" y1="12" x2="3" y2="12" />
                    </svg>
                    Sign in to POS
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-7">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-stone-200" />
              </div>
              <div className="relative flex justify-center">
                <span
                  className="px-4 text-[11px] text-stone-400 bg-[#FEFAF5] tracking-widest uppercase"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  or
                </span>
              </div>
            </div>

            {/* Sign-up link */}
            <p className="text-xs text-center text-stone-500" style={{ fontFamily: "'Inter', sans-serif" }}>
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-semibold transition-colors"
                style={{ color: "#C8956A" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#7C4A2D")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#C8956A")}
              >
                Request access
              </Link>
            </p>

            {/* Footer note */}
            <p className="mt-8 text-center text-[10px] text-stone-400 tracking-widest uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
              Secured · Kopi Nusantara POS &copy; 2024
            </p>
          </div>
<<<<<<< HEAD

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <Checkbox checked={isChecked} onChange={setIsChecked} />
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Keep me logged in
              </span>
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
=======
>>>>>>> a2ffc571e398e1e324287dfea19567c9532f7aba
        </div>
      </div>
    </>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> a2ffc571e398e1e324287dfea19567c9532f7aba
