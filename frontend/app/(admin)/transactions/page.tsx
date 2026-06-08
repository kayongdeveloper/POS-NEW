"use client";

import { useState } from "react";

export default function TransactionPage() {
  const [cart] = useState([
    {
      id: 1,
      name: "Espresso",
      qty: 2,
      price: 18000,
    },
    {
      id: 2,
      name: "Caffe Latte",
      qty: 1,
      price: 28000,
    },
  ]);

  const subtotal = cart.reduce(
    (total, item) => total + item.qty * item.price,
    0
  );

  const tax = subtotal * 0.11;
  const total = subtotal + tax;

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#4B2E2E]">
          Transaksi Rostri Kopi
        </h1>
        <p className="text-gray-500">
          Kelola transaksi pelanggan dengan cepat dan mudah
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Produk */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border p-5">
            <div className="flex flex-col md:flex-row gap-4 mb-5">
              <input
                type="text"
                placeholder="Cari produk..."
                className="flex-1 border rounded-xl px-4 py-3"
              />

              <select className="border rounded-xl px-4 py-3">
                <option>Semua Kategori</option>
                <option>Coffee</option>
                <option>Non Coffee</option>
                <option>Snack</option>
              </select>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="border rounded-2xl p-4 hover:shadow-lg transition cursor-pointer"
                >
                  <img
                    src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085"
                    alt="coffee"
                    className="h-36 w-full object-cover rounded-xl"
                  />

                  <h3 className="font-semibold mt-3">
                    Espresso
                  </h3>

                  <p className="text-[#6F4E37] font-bold">
                    Rp18.000
                  </p>

                  <button className="w-full mt-3 bg-[#6F4E37] text-white py-2 rounded-xl">
                    Tambah
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cart */}
        <div>
          <div className="bg-white rounded-2xl shadow-sm border p-5 sticky top-5">
            <h2 className="font-bold text-xl mb-4">
              Keranjang
            </h2>

            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between border-b pb-3"
                >
                  <div>
                    <p className="font-medium">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {item.qty} x{" "}
                      {formatRupiah(item.price)}
                    </p>
                  </div>

                  <p className="font-semibold">
                    {formatRupiah(
                      item.qty * item.price
                    )}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5">
              <label className="text-sm text-gray-500">
                Nama Pelanggan
              </label>

              <input
                type="text"
                placeholder="Walk In Customer"
                className="w-full border rounded-xl px-4 py-3 mt-1"
              />
            </div>

            <div className="mt-5 border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>
                  {formatRupiah(subtotal)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>PPN 11%</span>
                <span>{formatRupiah(tax)}</span>
              </div>

              <div className="flex justify-between text-lg font-bold text-[#6F4E37]">
                <span>Total</span>
                <span>{formatRupiah(total)}</span>
              </div>
            </div>

            <div className="mt-5">
              <label className="text-sm text-gray-500">
                Nominal Bayar
              </label>

              <input
                type="number"
                className="w-full border rounded-xl px-4 py-3 mt-1"
                placeholder="Masukkan nominal pembayaran"
              />
            </div>

            <button className="w-full mt-6 bg-[#6F4E37] hover:bg-[#5b3f2d] text-white py-4 rounded-xl font-semibold">
              Proses Pembayaran
            </button>

            <button className="w-full mt-3 border border-red-300 text-red-500 py-3 rounded-xl">
              Batalkan Transaksi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}