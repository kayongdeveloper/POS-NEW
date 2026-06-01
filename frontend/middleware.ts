import { NextResponse, type NextRequest } from "next/server";
import { resolveRoleProxy } from "@/lib/proxy";

export function middleware(request: NextRequest) {
  // Delegasikan seluruh logika ke proxy
  const proxyResult = resolveRoleProxy(request);
  if (proxyResult) return proxyResult;

  return NextResponse.next();
}

export const config = {
  /*
   * Match semua route KECUALI:
   * - _next/static  (static assets)
   * - _next/image   (image optimization)
   * - favicon.ico, gambar, icon publik
   * - api routes (tidak butuh guard frontend)
   */
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images/|icons/|api/).*)",
  ],
};
