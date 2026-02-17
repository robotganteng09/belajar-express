/*
  Warnings:

  - You are about to drop the column `kelas` on the `siswa` table. All the data in the column will be lost.
  - Added the required column `kelasId` to the `Siswa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `siswa` DROP COLUMN `kelas`,
    ADD COLUMN `kelasId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Guru` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kelas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `guruId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Siswa` ADD CONSTRAINT `Siswa_kelasId_fkey` FOREIGN KEY (`kelasId`) REFERENCES `Kelas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Kelas` ADD CONSTRAINT `Kelas_guruId_fkey` FOREIGN KEY (`guruId`) REFERENCES `Guru`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
