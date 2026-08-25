-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "material" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "printing_time" INTEGER NOT NULL,
    "value" DECIMAL(10,2) NOT NULL,
    "image_key" TEXT NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);
