import { NextResponse, type NextRequest } from "next/server";
import { resolveRoleProxy } from "@/lib/proxy";

export function proxy(request: NextRequest) {
  const proxyResult = resolveRoleProxy(request);

  if (proxyResult) {
    return proxyResult;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images/|icons/|api/).*)",
  ],
};