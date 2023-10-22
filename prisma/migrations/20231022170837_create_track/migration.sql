-- CreateTable
CREATE TABLE "Track" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "albumId" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Track_name_idx" ON "Track"("name");

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
