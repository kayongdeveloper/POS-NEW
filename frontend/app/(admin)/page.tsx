"use client";

export default function DashboardPage() {
  const topProducts = [
    {
      name: "Cappuccino",
      sold: 124,
      revenue: 3100000,
    },
    {
      name: "Espresso",
      sold: 98,
      revenue: 1764000,
    },
    {
      name: "Latte",
      sold: 87,
      revenue: 2436000,
    },
    {
      name: "Americano",
      sold: 76,
      revenue: 1672000,
    },
  ];

  const lowStocks = [
    {
      name: "Arabica Beans",
      stock: 5,
    },
    {
      name: "Cup 12 Oz",
      stock: 8,
    },
    {
      name: "Chocolate Syrup",
      stock: 4,
    },
    {
      name: "Fresh Milk",
      stock: 6,
    },
  ];

  const recentTransactions = [
    {
      invoice: "TRX-001",
      customer: "Walk In Customer",
      total: 58000,
      payment: "Cash",
    },
    {
      invoice: "TRX-002",
      customer: "Andi",
      total: 72000,
      payment: "QRIS",
    },
    {
      invoice: "TRX-003",
      customer: "Budi",
      total: 45000,
      payment: "Cash",
    },
    {
      invoice: "TRX-004",
      customer: "Siti",
      total: 89000,
      payment: "Debit",
    },
  ];

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#4B2E2E]">
          Dashboard Rostri Kopi
        </h1>

        <p className="text-gray-500 mt-2">
          Ringkasan performa bisnis dan aktivitas penjualan hari ini
        </p>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <div className="bg-white rounded-2xl border p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Omzet Hari Ini
          </p>

          <h2 className="text-3xl font-bold text-[#6F4E37] mt-3">
            {formatRupiah(8750000)}
          </h2>

          <p className="text-green-600 text-sm mt-2">
            +12% dari kemarin
          </p>
        </div>

        <div className="bg-white rounded-2xl border p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Transaksi Hari Ini
          </p>

          <h2 className="text-3xl font-bold mt-3">
            143
          </h2>

          <p className="text-green-600 text-sm mt-2">
            +18 transaksi
          </p>
        </div>

        <div className="bg-white rounded-2xl border p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Produk Terjual
          </p>

          <h2 className="text-3xl font-bold mt-3">
            387
          </h2>

          <p className="text-green-600 text-sm mt-2">
            Penjualan stabil
          </p>
        </div>

        <div className="bg-white rounded-2xl border p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Member Aktif
          </p>

          <h2 className="text-3xl font-bold mt-3">
            1.248
          </h2>

          <p className="text-blue-600 text-sm mt-2">
            +24 member baru
          </p>
        </div>
      </div>

      {/* SALES OVERVIEW */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        <div className="xl:col-span-2 bg-white rounded-2xl border p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-lg">
              Penjualan Mingguan
            </h2>

            <span className="text-sm text-gray-500">
              7 Hari Terakhir
            </span>
          </div>

          <div className="flex items-end justify-between gap-3 h-64">
            {[40, 75, 55, 90, 70, 110, 95].map(
              (value, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center flex-1"
                >
                  <div
                    className="w-full rounded-t-xl bg-[#6F4E37]"
                    style={{
                      height: `${value * 2}px`,
                    }}
                  />

                  <span className="text-xs text-gray-500 mt-2">
                    {
                      [
                        "Sen",
                        "Sel",
                        "Rab",
                        "Kam",
                        "Jum",
                        "Sab",
                        "Min",
                      ][index]
                    }
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        {/* TOP PRODUCT */}
        <div className="bg-white rounded-2xl border p-6">
          <h2 className="font-bold text-lg mb-5">
            Produk Terlaris
          </h2>

          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b pb-3"
              >
                <div>
                  <p className="font-medium">
                    {product.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {product.sold} terjual
                  </p>
                </div>

                <span className="font-semibold text-[#6F4E37]">
                  {formatRupiah(product.revenue)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* RECENT TRANSACTIONS */}
        <div className="bg-white rounded-2xl border overflow-hidden">
          <div className="p-5 border-b">
            <h2 className="font-bold text-lg">
              Transaksi Terbaru
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-5 py-3">
                    Invoice
                  </th>

                  <th className="text-left px-5 py-3">
                    Pelanggan
                  </th>

                  <th className="text-left px-5 py-3">
                    Pembayaran
                  </th>

                  <th className="text-right px-5 py-3">
                    Total
                  </th>
                </tr>
              </thead>

              <tbody>
                {recentTransactions.map(
                  (transaction, index) => (
                    <tr
                      key={index}
                      className="border-t"
                    >
                      <td className="px-5 py-4 font-medium">
                        {transaction.invoice}
                      </td>

                      <td className="px-5 py-4">
                        {transaction.customer}
                      </td>

                      <td className="px-5 py-4">
                        {transaction.payment}
                      </td>

                      <td className="px-5 py-4 text-right font-semibold">
                        {formatRupiah(
                          transaction.total
                        )}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* LOW STOCK */}
        <div className="bg-white rounded-2xl border overflow-hidden">
          <div className="p-5 border-b">
            <h2 className="font-bold text-lg">
              Stok Menipis
            </h2>
          </div>

          <div className="p-5 space-y-4">
            {lowStocks.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">
                    {item.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    Segera lakukan restock
                  </p>
                </div>

                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                  {item.stock} pcs
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER INFO */}
      <div className="mt-8 bg-[#6F4E37] rounded-2xl p-6 text-white">
        <h2 className="text-xl font-semibold">
          Rostri Kopi Performance
        </h2>

        <p className="mt-2 text-white/80">
          Penjualan hari ini berjalan dengan baik.
          Beberapa bahan baku mulai menipis dan
          memerlukan restock dalam waktu dekat.
        </p>
      </div>
    </div>
  );
}