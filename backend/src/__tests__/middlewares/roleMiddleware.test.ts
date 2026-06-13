import { describe, it, expect, vi, beforeEach } from "vitest";
import { authorizeRoles } from "../../middlewares/roleMiddleware.js";
import type { Request, Response, NextFunction } from "express";

const mockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

describe("roleMiddleware - authorizeRoles", () => {
  let mockNext: NextFunction;

  beforeEach(() => {
    mockNext = vi.fn();
  });

  it("harus merespons 401 jika req.user tidak ada (belum login)", () => {
    const req = {} as Request; // tidak ada req.user
    const res = mockResponse() as Response;

    authorizeRoles("ADMIN")(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: "fail",
        message: "Tidak ada otorisasi, silakan login terlebih dahulu",
      })
    );
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("harus merespons 403 jika role user tidak ada dalam daftar role yang diizinkan", () => {
    const req = { user: { userId: 1, role: "CASHIER" } } as Request;
    const res = mockResponse() as Response;

    authorizeRoles("ADMIN")(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: "fail",
        message: expect.stringContaining("CASHIER"),
      })
    );
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("harus memanggil next() jika role user ada dalam daftar role yang diizinkan (single role)", () => {
    const req = { user: { userId: 2, role: "ADMIN" } } as Request;
    const res = mockResponse() as Response;

    authorizeRoles("ADMIN")(req, res, mockNext);

    expect(mockNext).toHaveBeenCalledOnce();
    expect(res.status).not.toHaveBeenCalled();
  });

  it("harus memanggil next() jika role user ada dalam daftar role yang diizinkan (multiple roles)", () => {
    const req = { user: { userId: 3, role: "CASHIER" } } as Request;
    const res = mockResponse() as Response;

    authorizeRoles("ADMIN", "CASHIER", "MANAGER")(req, res, mockNext);

    expect(mockNext).toHaveBeenCalledOnce();
    expect(res.status).not.toHaveBeenCalled();
  });

  it("harus merespons 403 jika role user bukan salah satu dari multiple roles yang diizinkan", () => {
    const req = { user: { userId: 4, role: "GUEST" } } as Request;
    const res = mockResponse() as Response;

    authorizeRoles("ADMIN", "CASHIER")(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(mockNext).not.toHaveBeenCalled();
  });
});
