-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "Car" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "Car" ALTER COLUMN "caution" DROP DEFAULT;

-- CreateTable
CREATE TABLE "Reservation" (
    "id" STRING NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" STRING NOT NULL DEFAULT 'PENDING',
    "totalPrice" FLOAT8 NOT NULL,
    "deposit" FLOAT8 NOT NULL,
    "firstName" STRING NOT NULL,
    "lastName" STRING NOT NULL,
    "email" STRING NOT NULL,
    "phone" STRING NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "address" STRING NOT NULL,
    "city" STRING NOT NULL,
    "postalCode" STRING NOT NULL,
    "country" STRING NOT NULL,
    "documents" STRING[],
    "carId" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
