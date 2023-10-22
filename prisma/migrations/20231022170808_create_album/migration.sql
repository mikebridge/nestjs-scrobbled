-- CreateTable
CREATE TABLE "Album" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "artistId" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Album_name_idx" ON "Album"("name");

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
