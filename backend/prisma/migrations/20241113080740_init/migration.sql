-- CreateTable
CREATE TABLE "Resumes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fullName" TEXT NOT NULL,
    "dateOfBirth" DATETIME NOT NULL,
    "preferredLocation" TEXT NOT NULL,
    "programmingSkills" TEXT NOT NULL,
    "resumeSummary" TEXT NOT NULL
);
