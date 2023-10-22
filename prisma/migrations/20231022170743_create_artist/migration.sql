-- CreateTable
CREATE TABLE "Artist" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Artist_name_idx" ON "Artist"("name");
