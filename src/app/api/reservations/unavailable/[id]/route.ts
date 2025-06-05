import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const reservations = await prisma.reservation.findMany({
      where: {
        carId: params.id,
        status: "CONFIRMED",
        endDate: {
          gte: new Date()
        }
      },
      select: {
        startDate: true,
        endDate: true
      }
    });

    // Générer toutes les dates entre startDate et endDate pour chaque réservation
    const unavailableDates = reservations.flatMap(reservation => {
      const dates = [];
      const currentDate = new Date(reservation.startDate);
      const endDate = new Date(reservation.endDate);

      while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }

      return dates;
    });

    return NextResponse.json(unavailableDates);
  } catch (error) {
    console.error("Erreur lors de la récupération des dates indisponibles:", error);
    return new NextResponse("Erreur interne", { status: 500 });
  }
} 