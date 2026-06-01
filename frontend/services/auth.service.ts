import api, { setAccessToken, setRefreshToken, setUserRole, clearAuth } from "@/lib/axios";
import type { UserRole } from "@/lib/proxy";
import type { LoginInput, LoginResponse, ProfileResponse } from "@/types/auth";

/**
 * LOGIN
 * POST /api/auth/login
 * Body: { username, password }
 */
export async function loginUser(data: LoginInput): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/auth/login", data);

  const { accessToken, refreshToken, user } = response.data;

  // Simpan token ke localStorage + cookie
  setAccessToken(accessToken);
  setRefreshToken(refreshToken);

  // Simpan role ke cookie agar middleware bisa membacanya
  setUserRole(user.role as UserRole);

  return response.data;
}

/**
 * GET CURRENT USER PROFILE
 * GET /api/auth/me
 * Requires: Bearer token (auto-attached oleh axios interceptor)
 */
export async function getMe(): Promise<ProfileResponse["data"]> {
  const response = await api.get<ProfileResponse>("/auth/me");
  return response.data.data;
}

/**
 * LOGOUT
 * Hapus semua token & role dari localStorage + cookie
 */
export function logoutUser(): void {
  clearAuth();
}