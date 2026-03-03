-- CreateEnum
CREATE TYPE "CategoriaPrancha" AS ENUM ('SHORTBOARD', 'LONGBOARD', 'FUNBOARD', 'FISH', 'GUN', 'SUP');

-- CreateTable
CREATE TABLE "pranchas" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "marca" TEXT,
    "tamanho" DOUBLE PRECISION,
    "categoria" "CategoriaPrancha" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pranchas_pkey" PRIMARY KEY ("id")
);
