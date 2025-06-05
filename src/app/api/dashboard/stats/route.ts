import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== "ADMIN") {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    // Récupérer le nombre total de véhicules
    const totalVehicles = await prisma.car.count();

    // Récupérer le nombre total de réservations
    const totalReservations = await prisma.reservation.count();

    // Récupérer le nombre de réservations actives (non annulées et non terminées)
    const activeReservations = await prisma.reservation.count({
      where: {
        status: "CONFIRMED",
        endDate: {
          gte: new Date()
        }
      }
    });

    // Récupérer le nombre total d'utilisateurs
    const totalUsers = await prisma.user.count();

    return NextResponse.json({
      totalVehicles,
      totalReservations,
      activeReservations,
      totalUsers
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques:", error);
    return new NextResponse("Erreur serveur", { status: 500 });
  }
} 