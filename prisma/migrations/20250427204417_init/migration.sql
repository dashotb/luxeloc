-- CreateTable
CREATE TABLE "User" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "role" STRING NOT NULL,
    "email" STRING NOT NULL,
    "password" STRING NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Car" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "brand" STRING NOT NULL,
    "hp" INT4 NOT NULL,
    "seats" INT4 NOT NULL,
    "category" STRING NOT NULL,
    "daily_price" FLOAT8 NOT NULL,
    "weekend_price" FLOAT8 NOT NULL,
    "week_price" FLOAT8 NOT NULL,
    "description" STRING NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
