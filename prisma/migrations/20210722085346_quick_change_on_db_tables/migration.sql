/*
  Warnings:

  - You are about to drop the `_UserContact` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserContact" DROP CONSTRAINT "_UserContact_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserContact" DROP CONSTRAINT "_UserContact_B_fkey";

-- AlterTable
ALTER TABLE "messages" ALTER COLUMN "sendingDate" DROP DEFAULT,
ALTER COLUMN "sendingDate" SET DATA TYPE TIMESTAMP(6);

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "contactId" INTEGER;

-- DropTable
DROP TABLE "_UserContact";

-- AddForeignKey
ALTER TABLE "user" ADD FOREIGN KEY ("contactId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
