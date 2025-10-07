/*
  Warnings:

  - You are about to alter the column `status` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `role` ENUM('ADMIN', 'USER', 'SUPER_ADMIN') NULL DEFAULT 'USER',
    MODIFY `status` VARCHAR(191) NOT NULL;
