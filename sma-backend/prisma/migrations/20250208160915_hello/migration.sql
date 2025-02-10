/*
  Warnings:

  - The values [male,female,others] on the enum `gender` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `address` on the `User` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "gender_new" AS ENUM ('Male', 'Female', 'Others');
ALTER TABLE "User" ALTER COLUMN "gender" TYPE "gender_new" USING ("gender"::text::"gender_new");
ALTER TYPE "gender" RENAME TO "gender_old";
ALTER TYPE "gender_new" RENAME TO "gender";
DROP TYPE "gender_old";
COMMIT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "address";
