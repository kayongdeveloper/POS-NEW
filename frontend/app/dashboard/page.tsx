import StatCard from "@/components/dashboard/StatCard";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500">
          Selamat Datang Administrator
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard
          title="Total Produk"
          value={120}
        />

        <StatCard
          title="Total Transaksi"
          value={45}
        />

        <StatCard
          title="Pendapatan Hari Ini"
          value="Rp 1.500.000"
        />

        <StatCard
          title="Total User"
          value={5}
        />
      </div>
    </div>
  );
}