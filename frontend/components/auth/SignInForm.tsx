"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import type { AuthUser } from "@/types/auth";
import React, { useState } from "react";
import { loginUser } from "@/services/auth.service";
import { useAuth } from "@/context/AuthContext";
import "./sigInForm.css";

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
      const result = await loginUser(
        { username: username.trim(), password },
        isChecked,
      );
      // Simpan user ke global context
      setUser(result.user);
      // Hard navigation (bukan router.push) agar browser mengirim cookie yang
      // baru di-set (jwtToken, userRole) ke server sebelum middleware memeriksa
      const roleHome = result.user.role === "ADMIN" ? "/" : "/KASIR";
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
    <div
      className="flex min-h-screen w-full items-center justify-center p-4 sm:p-6"
      style={{
        background:
          "linear-gradient(135deg, #F5EDE0 0%, #E8D5C0 50%, #D4B89A 100%)",
      }}
    >
      <div
        className="flex w-full max-w-4xl rounded-3xl overflow-hidden"
        style={{
          boxShadow:
            "0 32px 80px rgba(44,24,16,0.28), 0 8px 24px rgba(44,24,16,0.12)",
        }}
      >
        {/* ══════════════════════════════════════
              LEFT PANEL — Brand / Illustration
          ══════════════════════════════════════ */}
        <aside
          className="hidden lg:flex flex-col w-[52%] shrink-0 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(160deg, #1C0F0A 0%, #2C1810 40%, #3D2015 70%, #5C3317 100%)",
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
              />
              {/* Logo circle */}
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(145deg, #5C3317, #3D2015)",
                  boxShadow:
                    "0 8px 32px rgba(245,194,122,0.2), inset 0 1px 0 rgba(245,194,122,0.15)",
                  border: "1.5px solid rgba(245,194,122,0.2)",
                }}
              >
                {/* Coffee cup icon */}
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#F5C27A"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 8h1a4 4 0 0 1 0 8h-1" />
                  <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" />
                  <line x1="6" y1="2" x2="6" y2="4" />
                  <line x1="10" y1="2" x2="10" y2="4" />
                  <line x1="14" y1="2" x2="14" y2="4" />
                </svg>

                {/* Steam lines above cup */}
                <div
                  className="absolute flex gap-1.5"
                  style={{
                    top: "-2px",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
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
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  letterSpacing: "-0.01em",
                }}
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
                  <span
                    className="text-[9px] text-amber-500/50 tracking-wider uppercase text-center"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom version tag */}
            <p
              className="absolute bottom-6 text-[10px] text-amber-900/50 tracking-widest uppercase"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
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
              style={{
                background: "linear-gradient(145deg, #3D2015, #1C0F0A)",
              }}
            >
              <svg
                width="20"
                height="20"
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
            <div>
              <p
                className="text-[10px] tracking-widest text-amber-700/60 uppercase"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                POS System
              </p>
              <h2
                className="text-base font-bold text-stone-800"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Kopi Nusantara
              </h2>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h2
              className="text-3xl font-bold mb-2"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#1C0F0A",
              }}
            >
              Welcome back
            </h2>
            <p
              className="text-sm text-stone-500"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
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
                <svg
                  className="mt-0.5 shrink-0"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
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
                style={{
                  color: "#5C3317",
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "0.05em",
                }}
              >
                USERNAME
              </label>
              <div className="relative">
                {/* Icon */}
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#C8956A"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
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
                style={{
                  color: "#5C3317",
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "0.05em",
                }}
              >
                PASSWORD
              </label>
              <div className="relative">
                {/* Icon */}
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#C8956A"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
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
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="rgba(245,194,122,0.3)"
                      strokeWidth="3"
                    />
                    <path
                      d="M12 2a10 10 0 0 1 10 10"
                      stroke="#F5C27A"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                  Signing in…
                </>
              ) : (
                <>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
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
          <p
            className="text-xs text-center text-stone-500"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
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
          <p
            className="mt-8 text-center text-[10px] text-stone-400 tracking-widest uppercase"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Secured · Kopi Nusantara POS &copy; 2024
          </p>
        </div>
      </div>
    </div>
  );
}
