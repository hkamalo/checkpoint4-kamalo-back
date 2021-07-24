/*
  Warnings:

  - You are about to drop the column `password` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[hashedPassword]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hashedPassword` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "user.password_unique";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "password",
ADD COLUMN     "hashedPassword" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user.hashedPassword_unique" ON "user"("hashedPassword");
