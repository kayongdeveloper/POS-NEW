import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import "dotenv/config";
import * as bcrypt from "bcrypt";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// ─────────────────────────────────────────────────────────────────────────────
// Helper
// ─────────────────────────────────────────────────────────────────────────────
function generateInvoice(index: number): string {
  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `INV-${y}${m}${d}-${String(index).padStart(4, "0")}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────────────────
async function main() {
  console.log("🌱 Memulai proses seeding...\n");

  // ── 1. Bersihkan tabel (urutan FK-safe) ──────────────────────────────────
  console.log("🗑️  Membersihkan data lama...");
  await prisma.orderDetail.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.productVariant.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.customer.deleteMany({});
  await prisma.refreshToken.deleteMany({});
  await prisma.user.deleteMany({});
  console.log("   ✔ Selesai membersihkan data.\n");

  // ── 2. Users ──────────────────────────────────────────────────────────────
  console.log("👤 Membuat data Users...");
  const [adminPassword, kasirPassword, kasir2Password] = await Promise.all([
    bcrypt.hash("passwordAdmin", 10),
    bcrypt.hash("passwordKasir", 10),
    bcrypt.hash("passwordKasir2", 10),
  ]);

  const [admin, kasir1, kasir2] = await Promise.all([
    prisma.user.create({
      data: {
        name: "Admin Utama",
        username: "admin_pos",
        password: adminPassword,
        role: "ADMIN",
      },
    }),
    prisma.user.create({
      data: {
        name: "Kasir Satu",
        username: "kasir_toko",
        password: kasirPassword,
        role: "KASIR",
      },
    }),
    prisma.user.create({
      data: {
        name: "Kasir Dua",
        username: "kasir_dua",
        password: kasir2Password,
        role: "KASIR",
      },
    }),
  ]);
  console.log(`   ✔ ${3} user berhasil dibuat.\n`);

  // ── 3. Customers ──────────────────────────────────────────────────────────
  console.log("🧑‍🤝‍🧑 Membuat data Customers...");
  const customersData = [
    { name: "Budi Santoso",    phone: "081234567890", email: "budi@gmail.com" },
    { name: "Siti Rahayu",     phone: "082345678901", email: "siti@gmail.com" },
    { name: "Agus Permana",    phone: "083456789012", email: "agus@gmail.com" },
    { name: "Dewi Lestari",    phone: "084567890123", email: "dewi@gmail.com" },
    { name: "Roni Kurniawan",  phone: "085678901234", email: null },
    { name: "Pelanggan Umum",  phone: null,           email: null },
  ];

  const customers = await Promise.all(
    customersData.map((c) => prisma.customer.create({ data: c }))
  );
  console.log(`   ✔ ${customers.length} customer berhasil dibuat.\n`);

  // ── 4. Categories ─────────────────────────────────────────────────────────
  console.log("📂 Membuat data Categories...");
  const categoriesData = [
    { name: "Makanan" },
    { name: "Minuman" },
    { name: "Snack & Cemilan" },
    { name: "Produk Segar" },
    { name: "Kebutuhan Rumah Tangga" },
  ];

  const categories = await Promise.all(
    categoriesData.map((c) => prisma.category.create({ data: c }))
  );
  const [catMakanan, catMinuman, catSnack, catSegar, catRumah] = categories;
  console.log(`   ✔ ${categories.length} kategori berhasil dibuat.\n`);

  // ── 5. Products & ProductVariants ─────────────────────────────────────────
  console.log("📦 Membuat data Products & Variants...");

  const productsPayload = [
    // ── Makanan ──
    {
      categoryId: catMakanan.id,
      name: "Nasi Goreng Spesial",
      description: "Nasi goreng dengan telur, ayam suwir, dan sambal pedas",
      variants: [
        { sku: "NG-REG-001",  variantName: "Regular",  costPrice: 12000, sellingPrice: 20000, stock: 50 },
        { sku: "NG-LRG-001",  variantName: "Large",    costPrice: 16000, sellingPrice: 28000, stock: 40 },
        { sku: "NG-XTR-001",  variantName: "Extra Pedas", costPrice: 13000, sellingPrice: 22000, stock: 35 },
      ],
    },
    {
      categoryId: catMakanan.id,
      name: "Mie Ayam Bakso",
      description: "Mie ayam dengan bakso sapi pilihan dan kuah gurih",
      variants: [
        { sku: "MAB-REG-001", variantName: "Regular",  costPrice: 10000, sellingPrice: 18000, stock: 60 },
        { sku: "MAB-SPL-001", variantName: "Special",  costPrice: 14000, sellingPrice: 25000, stock: 45 },
      ],
    },
    {
      categoryId: catMakanan.id,
      name: "Ayam Geprek",
      description: "Ayam goreng geprek dengan sambal bawang pilihan",
      variants: [
        { sku: "AG-LVL1-001", variantName: "Level 1 (Tidak Pedas)", costPrice: 13000, sellingPrice: 22000, stock: 40 },
        { sku: "AG-LVL3-001", variantName: "Level 3 (Sedang)",      costPrice: 13000, sellingPrice: 22000, stock: 40 },
        { sku: "AG-LVL5-001", variantName: "Level 5 (Pedas Banget)",costPrice: 13000, sellingPrice: 22000, stock: 30 },
      ],
    },
    // ── Minuman ──
    {
      categoryId: catMinuman.id,
      name: "Es Teh Manis",
      description: "Teh manis segar dengan es batu pilihan",
      variants: [
        { sku: "ETM-SM-001",  variantName: "Small (250ml)",  costPrice: 2000,  sellingPrice: 5000,  stock: 100 },
        { sku: "ETM-MD-001",  variantName: "Medium (500ml)", costPrice: 3000,  sellingPrice: 8000,  stock: 80 },
        { sku: "ETM-LG-001",  variantName: "Large (1000ml)", costPrice: 5000,  sellingPrice: 12000, stock: 50 },
      ],
    },
    {
      categoryId: catMinuman.id,
      name: "Kopi Susu Kekinian",
      description: "Kopi susu gula aren dengan pilihan es atau panas",
      variants: [
        { sku: "KSK-ES-001",  variantName: "Es",   costPrice: 8000,  sellingPrice: 18000, stock: 70 },
        { sku: "KSK-HT-001",  variantName: "Panas", costPrice: 7000,  sellingPrice: 15000, stock: 50 },
      ],
    },
    {
      categoryId: catMinuman.id,
      name: "Jus Buah Segar",
      description: "Jus buah segar tanpa bahan pengawet",
      variants: [
        { sku: "JBS-JRK-001", variantName: "Jeruk",    costPrice: 6000,  sellingPrice: 15000, stock: 40 },
        { sku: "JBS-MGO-001", variantName: "Mangga",   costPrice: 7000,  sellingPrice: 17000, stock: 35 },
        { sku: "JBS-AVK-001", variantName: "Alpukat",  costPrice: 8000,  sellingPrice: 20000, stock: 30 },
        { sku: "JBS-SML-001", variantName: "Semangka", costPrice: 5000,  sellingPrice: 13000, stock: 45 },
      ],
    },
    // ── Snack ──
    {
      categoryId: catSnack.id,
      name: "Keripik Singkong",
      description: "Keripik singkong renyah aneka rasa",
      variants: [
        { sku: "KS-ORI-100",  variantName: "Original (100g)",  costPrice: 8000,  sellingPrice: 15000, stock: 80 },
        { sku: "KS-PDO-100",  variantName: "Pedas Original (100g)", costPrice: 8500, sellingPrice: 16000, stock: 65 },
        { sku: "KS-BBQ-100",  variantName: "BBQ (100g)",        costPrice: 9000,  sellingPrice: 17000, stock: 55 },
      ],
    },
    {
      categoryId: catSnack.id,
      name: "Biskuit Cokelat",
      description: "Biskuit lapis cokelat premium",
      variants: [
        { sku: "BC-SM-001",   variantName: "150g",  costPrice: 12000, sellingPrice: 22000, stock: 90 },
        { sku: "BC-LG-001",   variantName: "300g",  costPrice: 22000, sellingPrice: 38000, stock: 60 },
      ],
    },
    // ── Produk Segar ──
    {
      categoryId: catSegar.id,
      name: "Telur Ayam",
      description: "Telur ayam kampung segar pilihan",
      variants: [
        { sku: "TA-CTN-001",  variantName: "1 Papan (30 butir)", costPrice: 45000, sellingPrice: 60000, stock: 30 },
        { sku: "TA-GRS-001",  variantName: "1 Kg",               costPrice: 26000, sellingPrice: 32000, stock: 50 },
        { sku: "TA-PCE-001",  variantName: "1 Butir",            costPrice: 1500,  sellingPrice: 2500,  stock: 200 },
      ],
    },
    {
      categoryId: catSegar.id,
      name: "Sayur Bayam",
      description: "Bayam segar organik tanpa pestisida",
      variants: [
        { sku: "SB-IKT-001",  variantName: "1 Ikat (~250g)", costPrice: 3000, sellingPrice: 5000, stock: 40 },
      ],
    },
    // ── Kebutuhan Rumah ──
    {
      categoryId: catRumah.id,
      name: "Sabun Cuci Piring",
      description: "Sabun cuci piring formula anti-lemak",
      variants: [
        { sku: "SCP-200-001", variantName: "200ml", costPrice: 7000,  sellingPrice: 12000, stock: 100 },
        { sku: "SCP-800-001", variantName: "800ml", costPrice: 22000, sellingPrice: 35000, stock: 75 },
      ],
    },
    {
      categoryId: catRumah.id,
      name: "Detergen Bubuk",
      description: "Detergen bubuk pewangi bunga",
      variants: [
        { sku: "DB-500-001",  variantName: "500g",   costPrice: 12000, sellingPrice: 20000, stock: 80 },
        { sku: "DB-1KG-001",  variantName: "1 Kg",   costPrice: 22000, sellingPrice: 35000, stock: 60 },
        { sku: "DB-5KG-001",  variantName: "5 Kg",   costPrice: 95000, sellingPrice: 150000, stock: 20 },
      ],
    },
  ];

  const createdVariants: { id: number; sellingPrice: number }[] = [];

  for (const p of productsPayload) {
    const product = await prisma.product.create({
      data: {
        categoryId: p.categoryId,
        name: p.name,
        description: p.description,
        variants: {
          create: p.variants.map((v) => ({
            sku: v.sku,
            variantName: v.variantName,
            costPrice: v.costPrice,
            sellingPrice: v.sellingPrice,
            stock: v.stock,
          })),
        },
      },
      include: { variants: true },
    });

    for (const v of product.variants) {
      createdVariants.push({ id: v.id, sellingPrice: Number(v.sellingPrice) });
    }
  }

  console.log(
    `   ✔ ${productsPayload.length} produk & ${createdVariants.length} varian berhasil dibuat.\n`
  );

  // ── 6. Orders & OrderDetails ───────────────────────────────────────────────
  console.log("🧾 Membuat data Orders...");

  const ordersPayload = [
    // Order 1 – Admin, tanpa customer
    {
      userId: admin.id,
      customerId: null,
      paymentMethod: "CASH",
      items: [
        { variantIdx: 0,  qty: 2 }, // Nasi Goreng Regular x2
        { variantIdx: 3,  qty: 3 }, // Es Teh Manis Small x3
      ],
    },
    // Order 2 – Kasir1, dengan customer Budi
    {
      userId: kasir1.id,
      customerId: customers[0].id,
      paymentMethod: "CASH",
      items: [
        { variantIdx: 4,  qty: 1 }, // Mie Ayam Regular
        { variantIdx: 9,  qty: 2 }, // Kopi Susu Es x2
        { variantIdx: 14, qty: 1 }, // Keripik Original
      ],
    },
    // Order 3 – Kasir1, customer Siti
    {
      userId: kasir1.id,
      customerId: customers[1].id,
      paymentMethod: "QRIS",
      items: [
        { variantIdx: 6,  qty: 1 }, // Ayam Geprek Level 1
        { variantIdx: 11, qty: 1 }, // Jus Jeruk
        { variantIdx: 5,  qty: 1 }, // Es Teh Large
      ],
    },
    // Order 4 – Kasir2, pelanggan umum
    {
      userId: kasir2.id,
      customerId: customers[5].id,
      paymentMethod: "TRANSFER",
      items: [
        { variantIdx: 17, qty: 2 }, // Biskuit 150g x2
        { variantIdx: 20, qty: 1 }, // Telur 1 Papan
        { variantIdx: 23, qty: 3 }, // Sabun Cuci 200ml x3
      ],
    },
    // Order 5 – Kasir2, customer Agus
    {
      userId: kasir2.id,
      customerId: customers[2].id,
      paymentMethod: "CASH",
      items: [
        { variantIdx: 1,  qty: 1 }, // Nasi Goreng Large
        { variantIdx: 10, qty: 1 }, // Kopi Panas
        { variantIdx: 15, qty: 1 }, // Keripik Pedas
      ],
    },
  ];

  for (let i = 0; i < ordersPayload.length; i++) {
    const op = ordersPayload[i];
    const details = op.items.map((item) => {
      const variant = createdVariants[item.variantIdx];
      return {
        productVariantId: variant.id,
        quantity: item.qty,
        sellingPrice: variant.sellingPrice,
        subtotal: variant.sellingPrice * item.qty,
      };
    });

    const totalPrice = details.reduce((sum, d) => sum + d.subtotal, 0);

    await prisma.order.create({
      data: {
        invoiceNumber: generateInvoice(i + 1),
        userId: op.userId,
        customerId: op.customerId,
        paymentMethod: op.paymentMethod,
        totalPrice,
        orderDetails: { create: details },
      },
    });
  }

  console.log(`   ✔ ${ordersPayload.length} order beserta detail berhasil dibuat.\n`);

  // ── Summary ───────────────────────────────────────────────────────────────
  console.log("═══════════════════════════════════════════");
  console.log("✅ Seeding selesai! Ringkasan data:");
  console.log(`   • Users    : 3 (1 Admin, 2 Kasir)`);
  console.log(`   • Customers: ${customers.length}`);
  console.log(`   • Categories: ${categories.length}`);
  console.log(`   • Products  : ${productsPayload.length}`);
  console.log(`   • Variants  : ${createdVariants.length}`);
  console.log(`   • Orders    : ${ordersPayload.length}`);
  console.log("═══════════════════════════════════════════\n");
}

main()
  .catch((e) => {
    console.error("❌ Terjadi error saat seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
