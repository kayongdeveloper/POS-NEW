// ─── Request Types ───────────────────────────────────────────────────────────

export interface LoginInput {
  username: string;
  password: string;
}

// ─── Response Types ───────────────────────────────────────────────────────────

export interface AuthUser {
  id: number;
  username: string;
  name: string;
  role: string;
}

export interface LoginResponse {
  message: string;
  status: string;
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}

export interface ProfileResponse {
  status: string;
  message: string;
  data: {
    id: number;
    name: string;
    username: string;
    role: string;
    createdAt: string;
  };
}

// ─── Auth State ───────────────────────────────────────────────────────────────

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}