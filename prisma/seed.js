import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 1. Seed Guru
  const guru1 = await prisma.guru.create({
    data: {
      nama: "Pak Budi",
    },
  });

  const guru2 = await prisma.guru.create({
    data: {
      nama: "Bu Siti",
    },
  });

  // 2. Seed Kelas
  const kelas1 = await prisma.kelas.create({
    data: {
      nama: "X RPL 1",
      guruId: guru1.id,
    },
  });

  const kelas2 = await prisma.kelas.create({
    data: {
      nama: "XI RPL 2",
      guruId: guru2.id,
    },
  });

  // 3. Seed Siswa
  await prisma.siswa.createMany({
    data: [
      {
        nama: "Andi",
        umur: 16,
        kelasId: kelas1.id,
      },
      {
        nama: "Budi",
        umur: 17,
        kelasId: kelas1.id,
      },
      {
        nama: "Siti",
        umur: 16,
        kelasId: kelas2.id,
      },
    ],
  });

  console.log("✅ Seeder berhasil dijalankan");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
