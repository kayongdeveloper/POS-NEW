"use client";

import { useMemo, useState } from "react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "Active" | "Inactive";
}

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  

  const products: Product[] = [
    {
      id: 1,
      name: "Espresso",
      category: "Coffee",
      price: 18000,
      stock: 50,
      status: "Active",
    },
    {
      id: 2,
      name: "Cappuccino",
      category: "Coffee",
      price: 25000,
      stock: 35,
      status: "Active",
    },
    {
      id: 3,
      name: "Latte",
      category: "Coffee",
      price: 28000,
      stock: 15,
      status: "Active",
    },
    {
      id: 4,
      name: "Americano",
      category: "Coffee",
      price: 22000,
      stock: 0,
      status: "Inactive",
    },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Products
          </h1>

          <p className="text-gray-500 mt-1">
            Kelola seluruh produk Rostri Kopi
          </p>
        </div>

        <button className="bg-[#6F4E37] hover:bg-[#5B3F2D] text-white px-5 py-3 rounded-xl font-medium transition">
          + Tambah Produk
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
        <div className="bg-white rounded-2xl border p-5">
          <p className="text-gray-500 text-sm">
            Total Produk
          </p>

          <h2 className="text-3xl font-bold mt-2">
            120
          </h2>
        </div>

        <div className="bg-white rounded-2xl border p-5">
          <p className="text-gray-500 text-sm">
            Produk Aktif
          </p>

          <h2 className="text-3xl font-bold mt-2 text-green-600">
            110
          </h2>
        </div>

        <div className="bg-white rounded-2xl border p-5">
          <p className="text-gray-500 text-sm">
            Stok Menipis
          </p>

          <h2 className="text-3xl font-bold mt-2 text-orange-500">
            8
          </h2>
        </div>

        <div className="bg-white rounded-2xl border p-5">
          <p className="text-gray-500 text-sm">
            Kategori
          </p>

          <h2 className="text-3xl font-bold mt-2 text-blue-600">
            6
          </h2>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-2xl border p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <input
            type="text"
            placeholder="Cari produk..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="flex-1 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#6F4E37]"
          />

          <select className="border rounded-xl px-4 py-3">
            <option>Semua Kategori</option>
            <option>Coffee</option>
            <option>Non Coffee</option>
            <option>Snack</option>
          </select>

          <select className="border rounded-xl px-4 py-3">
            <option>Semua Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="text-left px-6 py-4">
                  Produk
                </th>
                <th className="text-left px-6 py-4">
                  Kategori
                </th>
                <th className="text-left px-6 py-4">
                  Harga
                </th>
                <th className="text-left px-6 py-4">
                  Stok
                </th>
                <th className="text-left px-6 py-4">
                  Status
                </th>
                <th className="text-center px-6 py-4">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-b hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold">
                        {product.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        ID: #{product.id}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    {product.category}
                  </td>

                  <td className="px-6 py-4 font-medium">
                    {formatRupiah(product.price)}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        product.stock <= 10
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        product.status === "Active"
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button className="px-3 py-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200">
                        Edit
                      </button>

                      <button className="px-3 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200">
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}