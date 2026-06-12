import api, { setAccessToken, setRefreshToken, setUserRole, clearAuth } from "@/lib/axios";
import type { UserRole } from "@/lib/proxy";
import type { LoginInput, LoginResponse, ProfileResponse } from "@/types/auth";

/**
 * LOGIN
 * POST /api/auth/login
 * Body: { username, password }
 */
export async function loginUser(data: LoginInput, rememberMe = false): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/auth/login", data);

  const { accessToken, refreshToken, user } = response.data;

  setAccessToken(accessToken);


  if (rememberMe) {
    setRefreshToken(refreshToken);
  }


  setUserRole(user.role as UserRole);

  return response.data;
}


export async function getMe(): Promise<ProfileResponse["data"]> {
  const response = await api.get<ProfileResponse>("/auth/me");
  return response.data.data;
}


export async function logoutUser(): Promise<void> {
  try {
    await api.post("/auth/logout");
  } catch (error) {
    // Server 401/error saat logout tidak masalah — tetap bersihkan sesi lokal
    console.warn("Logout server error (ignored):", error);
  } finally {
    clearAuth();
  }
}


