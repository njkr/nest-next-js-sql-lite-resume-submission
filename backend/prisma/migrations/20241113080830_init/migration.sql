/*
  Warnings:

  - Added the required column `createdDate` to the `Resumes` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Resumes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fullName" TEXT NOT NULL,
    "dateOfBirth" DATETIME NOT NULL,
    "preferredLocation" TEXT NOT NULL,
    "programmingSkills" TEXT NOT NULL,
    "resumeSummary" TEXT NOT NULL,
    "createdDate" DATETIME NOT NULL
);
INSERT INTO "new_Resumes" ("dateOfBirth", "fullName", "id", "preferredLocation", "programmingSkills", "resumeSummary") SELECT "dateOfBirth", "fullName", "id", "preferredLocation", "programmingSkills", "resumeSummary" FROM "Resumes";
DROP TABLE "Resumes";
ALTER TABLE "new_Resumes" RENAME TO "Resumes";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
