import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { authenticateToken } from "../../middlewares/authMiddleware.js";
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Mock modul jsonwebtoken
vi.mock("jsonwebtoken", () => ({
  default: {
    verify: vi.fn(),
  },
}));

const mockRequest = (headers: Record<string, string> = {}): Partial<Request> => ({
  headers,
});

const mockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

const mockNext: NextFunction = vi.fn();

describe("authMiddleware - authenticateToken", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.ACCESS_TOKEN_SECRET = "test_access_secret_key_for_testing";
  });

  it("harus merespons 401 jika tidak ada Authorization header", () => {
    const req = mockRequest() as Request;
    const res = mockResponse() as Response;

    authenticateToken(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Akses ditolak, token tidak ditemukan" })
    );
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("harus merespons 401 jika header Authorization tidak memiliki Bearer token", () => {
    const req = mockRequest({ authorization: "InvalidFormat" }) as Request;
    const res = mockResponse() as Response;

    authenticateToken(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("harus merespons 401 jika jwt.verify mengembalikan error", () => {
    const req = mockRequest({ authorization: "Bearer token-tidak-valid" }) as Request;
    const res = mockResponse() as Response;

    // Simulasikan jwt.verify gagal (callback dipanggil dengan error)
    (jwt.verify as Mock).mockImplementation(
      (_token: string, _secret: string, callback: (err: Error | null, decoded: unknown) => void) => {
        callback(new Error("invalid signature"), null);
      }
    );

    authenticateToken(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Token tidak valid atau telah kedaluwarsa" })
    );
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("harus memanggil next() dan set req.user jika token valid", () => {
    const fakePayload = { userId: 1, role: "ADMIN" };
    const req = mockRequest({ authorization: "Bearer valid-token" }) as Request;
    const res = mockResponse() as Response;

    // Simulasikan jwt.verify sukses (callback dipanggil dengan decoded payload)
    (jwt.verify as Mock).mockImplementation(
      (_token: string, _secret: string, callback: (err: Error | null, decoded: unknown) => void) => {
        callback(null, fakePayload);
      }
    );

    authenticateToken(req, res, mockNext);

    expect(req.user).toEqual(fakePayload);
    expect(mockNext).toHaveBeenCalledOnce();
    expect(res.status).not.toHaveBeenCalled();
  });
});
