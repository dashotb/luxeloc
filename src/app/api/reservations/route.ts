import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import {prisma} from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

// GET /api/reservations
export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user || session.user.role !== 'ADMIN') {
            return new NextResponse('Non autorisé', { status: 401 });
        }

        const reservations = await prisma.reservation.findMany({
            include: {
                car: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(reservations);
    } catch (error) {
        console.error('Erreur lors de la récupération des réservations:', error);
        return new NextResponse('Erreur interne', { status: 500 });
    }
}

// POST /api/reservations
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            startDate,
            endDate,
            totalPrice,
            deposit,
            firstName,
            lastName,
            email,
            phone,
            birthDate,
            address,
            city,
            postalCode,
            country,
            documents,
            carId
        } = body;

        // Vérifier si le véhicule est disponible pour ces dates
        const existingReservation = await prisma.reservation.findFirst({
            where: {
                carId,
                status: "CONFIRMED",
                OR: [
                    {
                        AND: [
                            { startDate: { lte: new Date(startDate) } },
                            { endDate: { gte: new Date(startDate) } }
                        ]
                    },
                    {
                        AND: [
                            { startDate: { lte: new Date(endDate) } },
                            { endDate: { gte: new Date(endDate) } }
                        ]
                    }
                ]
            }
        });

        if (existingReservation) {
            return new NextResponse("Le véhicule n'est pas disponible pour ces dates", { status: 400 });
        }

        const reservation = await prisma.reservation.create({
            data: {
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                totalPrice,
                deposit,
                firstName,
                lastName,
                email,
                phone,
                birthDate: new Date(birthDate),
                address,
                city,
                postalCode,
                country,
                documents,
                carId
            }
        });

        return NextResponse.json(reservation);
    } catch (error) {
        console.error("Erreur lors de la création de la réservation:", error);
        return new NextResponse("Erreur interne", { status: 500 });
    }
} 