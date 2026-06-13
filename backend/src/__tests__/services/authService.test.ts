import { describe, it, expect, vi, beforeEach } from "vitest";
import { AuthService } from "../../service/authService.js";
import bcrypt from "bcrypt";

// ─── Mock Prisma Client ───────────────────────────────────────────────────────
vi.mock("../../lib/prisma.js", () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
    },
    refreshToken: {
      create: vi.fn(),
      delete: vi.fn(),
      deleteMany: vi.fn(),
      findUnique: vi.fn(),
    },
  },
}));

// ─── Mock bcrypt ──────────────────────────────────────────────────────────────
vi.mock("bcrypt", () => ({
  default: {
    compare: vi.fn(),
  },
}));

// ─── Mock JWT Utils ───────────────────────────────────────────────────────────
vi.mock("../../utils/jwt.js", () => ({
  generateAccessToken: vi.fn().mockReturnValue("mock-access-token"),
  generateRefreshToken: vi.fn().mockReturnValue("mock-refresh-token"),
  verifyRefreshToken: vi.fn(),
}));

// Import setelah mock agar mock sudah aktif
import { prisma } from "../../lib/prisma.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../utils/jwt.js";
import type { Mock } from "vitest";

// ─── Data Dummy ───────────────────────────────────────────────────────────────
const dummyUser = {
  id: 1,
  name: "Agus Admin",
  username: "agus",
  password: "hashed_password",
  role: "ADMIN",
  deletedAt: null,
  createdAt: new Date("2024-01-01"),
};

describe("AuthService", () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
    vi.clearAllMocks();
    process.env.ACCESS_TOKEN_SECRET = "test_access_secret_key_for_testing";
    process.env.REFRESH_TOKEN_SECRET = "test_refresh_secret_key_for_testing";
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // getProfile
  // ─────────────────────────────────────────────────────────────────────────────
  describe("getProfile", () => {
    it("harus mengembalikan data user jika userId valid", async () => {
      const selectedUser = {
        id: 1,
        name: "Agus Admin",
        username: "agus",
        role: "ADMIN",
        createdAt: dummyUser.createdAt,
      };
      (prisma.user.findUnique as Mock).mockResolvedValue(selectedUser);

      const result = await authService.getProfile(1);

      expect(prisma.user.findUnique).toHaveBeenCalledWith(
        expect.objectContaining({ where: { id: 1 } })
      );
      expect(result).toEqual(selectedUser);
    });

    it("harus throw error jika user tidak ditemukan", async () => {
      (prisma.user.findUnique as Mock).mockResolvedValue(null);

      await expect(authService.getProfile(999)).rejects.toThrow(
        "User tidak ditemukan"
      );
    });
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // login
  // ─────────────────────────────────────────────────────────────────────────────
  describe("login", () => {
    it("harus berhasil login dan mengembalikan tokens + data user", async () => {
      (prisma.user.findUnique as Mock).mockResolvedValue(dummyUser);
      (bcrypt.compare as Mock).mockResolvedValue(true);
      (prisma.refreshToken.create as Mock).mockResolvedValue({});

      const result = await authService.login({
        username: "agus",
        password: "password123",
      });

      expect(result.user.username).toBe("agus");
      expect(result.user.role).toBe("ADMIN");
      expect(result.accessToken).toBe("mock-access-token");
      expect(result.refreshToken).toBe("mock-refresh-token");
      expect(prisma.refreshToken.create).toHaveBeenCalledOnce();
    });

    it("harus throw error jika username tidak ditemukan", async () => {
      (prisma.user.findUnique as Mock).mockResolvedValue(null);

      await expect(
        authService.login({ username: "tidakada", password: "pass" })
      ).rejects.toThrow("Invalid username or password");
    });

    it("harus throw error jika password salah", async () => {
      (prisma.user.findUnique as Mock).mockResolvedValue(dummyUser);
      (bcrypt.compare as Mock).mockResolvedValue(false);

      await expect(
        authService.login({ username: "agus", password: "wrongpassword" })
      ).rejects.toThrow("Username atau password salah");
    });

    it("harus throw ZodError jika input tidak valid (username kosong)", async () => {
      // Zod akan throw karena username min(1)
      await expect(
        authService.login({ username: "", password: "pass" })
      ).rejects.toThrow();
    });

    it("harus throw ZodError jika input tidak valid (password kosong)", async () => {
      await expect(
        authService.login({ username: "agus", password: "" })
      ).rejects.toThrow();
    });
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // logout
  // ─────────────────────────────────────────────────────────────────────────────
  describe("logout", () => {
    it("harus menghapus semua refresh token milik user", async () => {
      (prisma.refreshToken.deleteMany as Mock).mockResolvedValue({ count: 2 });

      await authService.logout(1);

      expect(prisma.refreshToken.deleteMany).toHaveBeenCalledWith({
        where: { userId: 1 },
      });
    });
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // refresh
  // ─────────────────────────────────────────────────────────────────────────────
  describe("refresh", () => {
    const storedToken = {
      token: "old-refresh-token",
      user: dummyUser,
    };

    it("harus berhasil merotasi refresh token dan mengembalikan tokens baru", async () => {
      (prisma.refreshToken.findUnique as Mock).mockResolvedValue(storedToken);
      (verifyRefreshToken as Mock).mockReturnValue({ userId: 1 });
      (prisma.refreshToken.delete as Mock).mockResolvedValue({});
      (prisma.refreshToken.create as Mock).mockResolvedValue({});
      (generateAccessToken as Mock).mockReturnValue("new-access-token");
      (generateRefreshToken as Mock).mockReturnValue("new-refresh-token");

      const result = await authService.refresh("old-refresh-token");

      expect(result.accessToken).toBe("new-access-token");
      expect(result.refreshToken).toBe("new-refresh-token");
      // Token lama harus dihapus (token rotation)
      expect(prisma.refreshToken.delete).toHaveBeenCalledWith({
        where: { token: "old-refresh-token" },
      });
      // Token baru harus disimpan
      expect(prisma.refreshToken.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ token: "new-refresh-token" }),
        })
      );
    });

    it("harus throw error jika refresh token tidak ada di database", async () => {
      (prisma.refreshToken.findUnique as Mock).mockResolvedValue(null);

      await expect(
        authService.refresh("token-tidak-ada-di-db")
      ).rejects.toThrow("Refresh token tidak valid atau sudah digunakan");
    });

    it("harus throw error dan hapus token jika refresh token expired/invalid", async () => {
      (prisma.refreshToken.findUnique as Mock).mockResolvedValue(storedToken);
      (verifyRefreshToken as Mock).mockImplementation(() => {
        throw new Error("jwt expired");
      });
      (prisma.refreshToken.delete as Mock).mockResolvedValue({});

      await expect(authService.refresh("old-refresh-token")).rejects.toThrow(
        "Refresh token kedaluwarsa atau tidak valid"
      );

      // Token yang expired harus dihapus dari DB (security: revoke)
      expect(prisma.refreshToken.delete).toHaveBeenCalledWith({
        where: { token: "old-refresh-token" },
      });
    });
  });
});
