import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kasir — Kopi Nusantara POS",
  description: "Halaman kasir untuk input transaksi Kopi Nusantara POS",
};

export default function KasirPage() {
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1
          className="text-2xl font-bold text-gray-800 dark:text-white"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Kasir — Point of Sale
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Selamat datang, Kasir. Mulai transaksi baru di bawah ini.
        </p>
      </div>

      {/* Placeholder grid (nanti diisi komponen POS) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panel Produk */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
          <h2 className="text-base font-semibold text-gray-700 dark:text-gray-200 mb-4">
            Daftar Menu
          </h2>
          <p className="text-sm text-gray-400">
            Komponen menu produk akan ditampilkan di sini.
          </p>
        </div>

        {/* Panel Cart */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
          <h2 className="text-base font-semibold text-gray-700 dark:text-gray-200 mb-4">
            Keranjang
          </h2>
          <div className="flex flex-col gap-3">
            <div className="text-center py-8 text-gray-300 dark:text-gray-700 text-sm">
              <svg
                className="mx-auto mb-2 opacity-40"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              Keranjang masih kosong
            </div>

            <hr className="border-gray-100 dark:border-gray-800" />

            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Total</span>
              <span className="font-semibold text-gray-800 dark:text-white">Rp 0</span>
            </div>

            <button
              disabled
              className="w-full py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: "linear-gradient(135deg, #1C0F0A, #5C3317)" }}
            >
              Proses Pembayaran
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
