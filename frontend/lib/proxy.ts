
import { NextResponse, type NextRequest } from "next/server";

// ─── Tipe Role ────────────────────────────────────────────────────────────────

export type UserRole = "ADMIN" | "KASIR";

// ─── Konstanta Route ──────────────────────────────────────────────────────────

/** Halaman yang bisa diakses tanpa login */
export const PUBLIC_ROUTES = ["/login", "/signup", "/reset-password"];

/** Prefix route khusus ADMIN */
export const ADMIN_ROUTES = ["/", "/products", "/form-elements", "/transactions"];

/** Prefix route khusus KASIR */
export const KASIR_ROUTES = ["/kasir"];

/** Default redirect setelah login berhasil per role */
export const ROLE_HOME: Record<UserRole, string> = {
  ADMIN: "/",
  KASIR: "/kasir",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────


export function matchesRouteGroup(pathname: string, routes: string[]): boolean {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );
}


export function isPublicRoute(pathname: string): boolean {
  return matchesRouteGroup(pathname, PUBLIC_ROUTES);
}


export function isAdminRoute(pathname: string): boolean {
  return matchesRouteGroup(pathname, ADMIN_ROUTES);
}


export function isKasirRoute(pathname: string): boolean {
  return matchesRouteGroup(pathname, KASIR_ROUTES);
}


export function isValidRole(role: string | undefined): role is UserRole {
  return role === "ADMIN" || role === "KASIR";
}

// ─── Proxy Handler Utama ──────────────────────────────────────────────────────


export function resolveRoleProxy(request: NextRequest): NextResponse | null {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("jwtToken")?.value;
  const rawRole = request.cookies.get("userRole")?.value;
  const role = isValidRole(rawRole) ? rawRole : null;

  // ── 1. Public Routes ──────────────────────────────────────────────────────

  if (isPublicRoute(pathname)) {
   
    if (token && role) {
      const home = ROLE_HOME[role];
      return NextResponse.redirect(new URL(home, request.url));
    }
   
    return null;
  }

 
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ── 3. Sudah login tapi role tidak dikenali → logout paksa ───────────────

  if (!role) {
    const loginUrl = new URL("/login", request.url);
    const response = NextResponse.redirect(loginUrl);
    // Hapus cookie rusak
    response.cookies.delete("jwtToken");
    response.cookies.delete("userRole");
    return response;
  }

  // ── 4. KASIR mencoba akses route ADMIN → redirect ke /kasir ──────────────

  if (role === "KASIR" && isAdminRoute(pathname)) {
    return NextResponse.redirect(new URL(ROLE_HOME.KASIR, request.url));
  }

  // ── 5. ADMIN mencoba akses route KASIR → redirect ke / ───────────────────

  if (role === "ADMIN" && isKasirRoute(pathname)) {
    return NextResponse.redirect(new URL(ROLE_HOME.ADMIN, request.url));
  }

  // ── 6. Semua aman → lanjutkan ─────────────────────────────────────────────

  return null;
}

// ─── Cookie Helpers (digunakan dari client-side service) ──────────────────────


export const COOKIE_ROLE_MAX_AGE = 60 * 60 * 24 * 7; // 7 hari

export function buildRoleCookieString(role: UserRole): string {
  return `userRole=${role}; path=/; SameSite=Lax; max-age=${COOKIE_ROLE_MAX_AGE}`;
}

export function clearRoleCookieString(): string {
  return "userRole=; path=/; max-age=0";
}
