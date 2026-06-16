/*
  Warnings:

  - Changed the type of `fromDate` on the `Leave` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `toDate` on the `Leave` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `date` on the `WorkLog` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Leave" DROP COLUMN "fromDate",
ADD COLUMN     "fromDate" TIMESTAMP(3) NOT NULL,
DROP COLUMN "toDate",
ADD COLUMN     "toDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "WorkLog" DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
