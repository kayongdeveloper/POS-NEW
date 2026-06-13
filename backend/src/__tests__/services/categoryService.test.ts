import { describe, it, expect, vi, beforeEach } from "vitest";
import { CategoryService } from "../../service/categoryService.js";

// ─── Mock Prisma Client ───────────────────────────────────────────────────────
vi.mock("../../lib/prisma.js", () => ({
  prisma: {
    category: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      count: vi.fn(),
    },
  },
}));

import { prisma } from "../../lib/prisma.js";
import type { Mock } from "vitest";

// ─── Data Dummy ───────────────────────────────────────────────────────────────
const dummyCategory = {
  id: 1,
  name: "Makanan",
  description: "Kategori produk makanan",
  deletedAt: null,
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
};

describe("CategoryService", () => {
  let categoryService: CategoryService;

  beforeEach(() => {
    categoryService = new CategoryService();
    vi.clearAllMocks();
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // getAllCategories
  // ─────────────────────────────────────────────────────────────────────────────
  describe("getAllCategories", () => {
    it("harus mengembalikan daftar kategori dengan pagination default (page=1, limit=10)", async () => {
      (prisma.category.findMany as Mock).mockResolvedValue([dummyCategory]);
      (prisma.category.count as Mock).mockResolvedValue(1);

      const result = await categoryService.getAllCategories({});

      expect(result.status).toBe("success");
      expect(result.data).toHaveLength(1);
      expect(result.meta.page).toBe(1);
      expect(result.meta.limit).toBe(10);
      expect(result.meta.total).toBe(1);
      expect(result.meta.totalPages).toBe(1);
      expect(result.meta.nextPage).toBeNull();
      expect(result.meta.prevPage).toBeNull();
    });

    it("harus memanggil prisma.findMany dengan skip yang benar untuk halaman ke-2", async () => {
      (prisma.category.findMany as Mock).mockResolvedValue([]);
      (prisma.category.count as Mock).mockResolvedValue(25);

      await categoryService.getAllCategories({ page: 2, limit: 10 });

      expect(prisma.category.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ skip: 10, take: 10 })
      );
    });

    it("harus menyertakan filter search pada whereClause jika parameter search diberikan", async () => {
      (prisma.category.findMany as Mock).mockResolvedValue([]);
      (prisma.category.count as Mock).mockResolvedValue(0);

      await categoryService.getAllCategories({ search: "minuman" });

      expect(prisma.category.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            name: { contains: "minuman", mode: "insensitive" },
          },
        })
      );
    });

    it("harus menghitung nextPage dan prevPage dengan benar saat halaman lebih dari 1", async () => {
      (prisma.category.findMany as Mock).mockResolvedValue([dummyCategory]);
      (prisma.category.count as Mock).mockResolvedValue(30); // 3 halaman dengan limit 10

      const result = await categoryService.getAllCategories({ page: 2, limit: 10 });

      expect(result.meta.nextPage).toBe(3);
      expect(result.meta.prevPage).toBe(1);
    });
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // getCategoryById
  // ─────────────────────────────────────────────────────────────────────────────
  describe("getCategoryById", () => {
    it("harus mengembalikan kategori jika id ditemukan", async () => {
      (prisma.category.findUnique as Mock).mockResolvedValue(dummyCategory);

      const result = await categoryService.getCategoryById(1);

      expect(result.status).toBe("success");
      expect(result.data).toEqual(dummyCategory);
      expect(result.message).toContain("1");
    });

    it("harus throw error jika kategori tidak ditemukan", async () => {
      (prisma.category.findUnique as Mock).mockResolvedValue(null);

      await expect(categoryService.getCategoryById(999)).rejects.toThrow(
        "Kategori tidak ditemukan"
      );
    });
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // createCategory
  // ─────────────────────────────────────────────────────────────────────────────
  describe("createCategory", () => {
    it("harus berhasil membuat kategori baru dengan data valid", async () => {
      (prisma.category.create as Mock).mockResolvedValue(dummyCategory);

      const result = await categoryService.createCategory({
        name: "Makanan",
        description: "Kategori produk makanan",
      });

      expect(result).toEqual(dummyCategory);
      expect(prisma.category.create).toHaveBeenCalledOnce();
      expect(prisma.category.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: { name: "Makanan", description: "Kategori produk makanan" },
        })
      );
    });

    it("harus throw ZodError jika nama kategori kosong", async () => {
      await expect(
        categoryService.createCategory({ name: "" })
      ).rejects.toThrow();
    });

    it("harus throw ZodError jika nama kategori kurang dari 3 karakter", async () => {
      await expect(
        categoryService.createCategory({ name: "AB" })
      ).rejects.toThrow();
    });

    it("harus throw ZodError jika nama kategori lebih dari 50 karakter", async () => {
      const namaKelewatPanjang = "A".repeat(51);
      await expect(
        categoryService.createCategory({ name: namaKelewatPanjang })
      ).rejects.toThrow();
    });

    it("harus berhasil jika description tidak disertakan (opsional)", async () => {
      (prisma.category.create as Mock).mockResolvedValue({
        ...dummyCategory,
        description: null,
      });

      const result = await categoryService.createCategory({ name: "Minuman" });

      expect(result).toBeDefined();
      expect(prisma.category.create).toHaveBeenCalledOnce();
    });
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // updateCategory
  // ─────────────────────────────────────────────────────────────────────────────
  describe("updateCategory", () => {
    it("harus berhasil mengupdate kategori yang ditemukan", async () => {
      const updatedData = { ...dummyCategory, name: "Minuman Segar" };
      (prisma.category.findUnique as Mock).mockResolvedValue(dummyCategory);
      (prisma.category.update as Mock).mockResolvedValue(updatedData);

      const result = await categoryService.updateCategory(1, {
        name: "Minuman Segar",
      });

      expect(result.name).toBe("Minuman Segar");
      expect(prisma.category.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 1 },
          data: { name: "Minuman Segar" },
        })
      );
    });

    it("harus throw error jika kategori yang akan diupdate tidak ditemukan", async () => {
      (prisma.category.findUnique as Mock).mockResolvedValue(null);

      await expect(
        categoryService.updateCategory(999, { name: "Baru" })
      ).rejects.toThrow("Kategori tidak ditemukan");
    });
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // deleteCategory (soft delete)
  // ─────────────────────────────────────────────────────────────────────────────
  describe("deleteCategory", () => {
    it("harus berhasil melakukan soft delete pada kategori yang ada", async () => {
      (prisma.category.findUnique as Mock).mockResolvedValue(dummyCategory);
      (prisma.category.update as Mock).mockResolvedValue({
        ...dummyCategory,
        deletedAt: new Date(),
      });

      const result = await categoryService.deleteCategory(1);

      expect(result.status).toBe("success");
      expect(result.message).toContain("1");
      // Pastikan yang dipanggil adalah update (soft delete), bukan delete
      expect(prisma.category.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 1 },
          data: expect.objectContaining({ deletedAt: expect.any(Date) }),
        })
      );
    });

    it("harus throw error jika kategori yang akan dihapus tidak ditemukan", async () => {
      (prisma.category.findUnique as Mock).mockResolvedValue(null);

      await expect(categoryService.deleteCategory(999)).rejects.toThrow(
        "Kategori tidak ditemukan"
      );
    });
  });
});
