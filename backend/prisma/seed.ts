import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import "dotenv/config";
import * as bcrypt from 'bcrypt'

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log(" Memulai proses seeding data Users...");


  await prisma.user.deleteMany({});
  const adminPassword = await bcrypt.hash('passwordAdmin', 10);
  const kasirPassword = await bcrypt.hash('passwordKasir', 10);
  await prisma.user.createMany({
    data: [
      {
        name: "admin@pos.com",
        username: "admin_pos",
        password:adminPassword,
        role: "ADMIN",
       
      },
      {
        username: "kasir_toko",
        name: "kasir@pos.com",
        password: kasirPassword,
        role: "KASIR",
      },
    ],
  });

  console.log(" Sukses membuat data Admin dan Kasir!");
  console.log(" Seeding selesai!");
}

main()
  .catch((e) => {
    console.error(" Terjadi error saat seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end(); 
  });
