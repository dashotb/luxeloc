import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        
        // if (!session?.user || session.user.role !== 'ADMIN') {
        //     return new NextResponse('Non autorisé', { status: 401 });
        // }

        const cars = await prisma.car.findMany();
        return NextResponse.json(cars);
    } catch (error) {
        console.error('Erreur lors de la récupération des véhicules:', error);
        return new NextResponse('Erreur interne du serveur', { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session?.user || session.user.role !== 'ADMIN') {
            return new NextResponse('Non autorisé', { status: 401 });
        }

        const body = await request.json();
        const { name, brand, hp, seats, category, daily_price, weekend_price, week_price, description, caution, images } = body;

        const car = await prisma.car.create({
            data: {
                name,
                brand,
                hp,
                seats,
                category,
                daily_price,
                weekend_price,
                week_price,
                description,
                caution,
                images: images || [],
            },
        });

        return NextResponse.json(car);
    } catch (error) {
        console.error('Erreur lors de la création du véhicule:', error);
        return new NextResponse('Erreur interne du serveur', { status: 500 });
    }
}