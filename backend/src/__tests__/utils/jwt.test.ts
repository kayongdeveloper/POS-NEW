/**
 * jwt.test.ts
 *
 * Catatan implementasi:
 * jwt.ts membaca ACCESS_TOKEN_SECRET dan REFRESH_TOKEN_SECRET sebagai
 * module-level constants saat pertama kali diimport. Karena ESM module caching,
 * nilai tersebut tidak bisa diubah setelah import. Oleh karena itu:
 *
 * 1. Test "token decode" menggunakan secret dari .env yang sudah terbaca
 * 2. Test "throw jika env tidak ada" menggunakan modul terpisah yang
 *    di-reimport dengan vi.resetModules()
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import jwt from "jsonwebtoken";

// Secret yang digunakan oleh jwt.ts (dibaca dari .env via dotenv)
const ACTUAL_ACCESS_SECRET = "23t82f3vwkwevwhywcuedq6efq";
const ACTUAL_REFRESH_SECRET = "askjbdjasbdg#^$@%$ihsabadvasuvdasbdui";

describe("JWT Utils", () => {
  // -----------------------------------------------------------------------
  // generateAccessToken
  // -----------------------------------------------------------------------
  describe("generateAccessToken", () => {
    it("harus menghasilkan string token yang tidak kosong", async () => {
      const { generateAccessToken } = await import("../../utils/jwt.js");
      const token = generateAccessToken(1, "ADMIN");

      expect(typeof token).toBe("string");
      expect(token.length).toBeGreaterThan(0);
      // JWT format: header.payload.signature
      expect(token.split(".")).toHaveLength(3);
    });

    it("harus membuat token dengan payload userId dan role yang benar", async () => {
      const { generateAccessToken } = await import("../../utils/jwt.js");
      const token = generateAccessToken(42, "CASHIER");
      // Decode tanpa verifikasi untuk cek payload
      const decoded = jwt.decode(token) as { userId: number; role: string };

      expect(decoded.userId).toBe(42);
      expect(decoded.role).toBe("CASHIER");
    });

    it("token harus expire setelah 15 menit (900 detik)", async () => {
      const { generateAccessToken } = await import("../../utils/jwt.js");
      const token = generateAccessToken(1, "ADMIN");
      const decoded = jwt.decode(token) as { exp: number; iat: number };

      expect(decoded.exp - decoded.iat).toBe(900);
    });

    it("token harus bisa diverifikasi menggunakan secret yang benar", async () => {
      const { generateAccessToken } = await import("../../utils/jwt.js");
      const token = generateAccessToken(5, "MANAGER");

      // Verifikasi dengan secret yang sama dengan yang dipakai jwt.ts
      expect(() =>
        jwt.verify(token, ACTUAL_ACCESS_SECRET)
      ).not.toThrow();
    });

    it("token harus GAGAL diverifikasi dengan secret yang salah", async () => {
      const { generateAccessToken } = await import("../../utils/jwt.js");
      const token = generateAccessToken(1, "ADMIN");

      expect(() => jwt.verify(token, "secret-yang-salah")).toThrow();
    });

    it("dua user berbeda harus menghasilkan access token yang berbeda", async () => {
      const { generateAccessToken } = await import("../../utils/jwt.js");
      const token1 = generateAccessToken(1, "ADMIN");
      const token2 = generateAccessToken(2, "CASHIER");

      expect(token1).not.toBe(token2);
    });
  });

  // -----------------------------------------------------------------------
  // generateRefreshToken
  // -----------------------------------------------------------------------
  describe("generateRefreshToken", () => {
    it("harus menghasilkan string token yang tidak kosong", async () => {
      const { generateRefreshToken } = await import("../../utils/jwt.js");
      const token = generateRefreshToken(10);

      expect(typeof token).toBe("string");
      expect(token.split(".")).toHaveLength(3);
    });

    it("harus membuat token dengan payload userId yang benar", async () => {
      const { generateRefreshToken } = await import("../../utils/jwt.js");
      const token = generateRefreshToken(99);
      const decoded = jwt.decode(token) as { userId: number };

      expect(decoded.userId).toBe(99);
    });

    it("token harus expire setelah 7 hari (604800 detik)", async () => {
      const { generateRefreshToken } = await import("../../utils/jwt.js");
      const token = generateRefreshToken(1);
      const decoded = jwt.decode(token) as { exp: number; iat: number };

      expect(decoded.exp - decoded.iat).toBe(604800);
    });

    it("token harus bisa diverifikasi menggunakan secret yang benar", async () => {
      const { generateRefreshToken } = await import("../../utils/jwt.js");
      const token = generateRefreshToken(7);

      expect(() =>
        jwt.verify(token, ACTUAL_REFRESH_SECRET)
      ).not.toThrow();
    });

    it("token harus GAGAL diverifikasi dengan secret yang salah", async () => {
      const { generateRefreshToken } = await import("../../utils/jwt.js");
      const token = generateRefreshToken(1);

      expect(() => jwt.verify(token, "secret-yang-salah")).toThrow();
    });

    it("dua user berbeda harus menghasilkan refresh token yang berbeda", async () => {
      const { generateRefreshToken } = await import("../../utils/jwt.js");
      const token1 = generateRefreshToken(1);
      const token2 = generateRefreshToken(2);

      expect(token1).not.toBe(token2);
    });
  });

  // -----------------------------------------------------------------------
  // verifyRefreshToken
  // -----------------------------------------------------------------------
  describe("verifyRefreshToken", () => {
    it("harus mengembalikan payload userId yang benar untuk token valid", async () => {
      const { generateRefreshToken, verifyRefreshToken } = await import("../../utils/jwt.js");
      const token = generateRefreshToken(25);

      const payload = verifyRefreshToken(token);

      expect(payload.userId).toBe(25);
    });

    it("harus throw error untuk token string yang tidak valid", async () => {
      const { verifyRefreshToken } = await import("../../utils/jwt.js");

      expect(() => verifyRefreshToken("ini-bukan-token")).toThrow();
    });

    it("harus throw error untuk token yang dimanipulasi (tampered)", async () => {
      const { generateRefreshToken, verifyRefreshToken } = await import("../../utils/jwt.js");
      const token = generateRefreshToken(1);

      // Ubah signature token (bagian ke-3 setelah split ".")
      const [header, payload] = token.split(".");
      const tamperedToken = `${header}.${payload}.signature-palsu`;

      expect(() => verifyRefreshToken(tamperedToken)).toThrow();
    });

    it("harus throw error untuk token yang sudah kadaluarsa", async () => {
      const { verifyRefreshToken } = await import("../../utils/jwt.js");

      // Buat token expired secara manual dengan secret yang sama
      const expiredToken = jwt.sign(
        { userId: 99 },
        ACTUAL_REFRESH_SECRET,
        { expiresIn: 0 }
      );

      expect(() => verifyRefreshToken(expiredToken)).toThrow();
    });

    it("token access seharusnya GAGAL diverifikasi sebagai refresh token", async () => {
      const { generateAccessToken, verifyRefreshToken } = await import("../../utils/jwt.js");
      // Access token dibuat dengan ACCESS_SECRET, bukan REFRESH_SECRET
      const accessToken = generateAccessToken(1, "ADMIN");

      // verifyRefreshToken menggunakan REFRESH_SECRET — harus throw
      expect(() => verifyRefreshToken(accessToken)).toThrow();
    });
  });
});
