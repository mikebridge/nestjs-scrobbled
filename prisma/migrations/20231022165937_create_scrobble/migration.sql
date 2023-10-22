-- CreateTable
CREATE TABLE "Scrobble" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "artist" TEXT NOT NULL,
    "album" TEXT,
    "track" TEXT NOT NULL,
    "datecreated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Scrobble_pkey" PRIMARY KEY ("id")
);
