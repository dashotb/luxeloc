import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session || session.user?.role !== 'ADMIN') {
            return new NextResponse('Non autorisé', { status: 401 });
        }

        const car = await prisma.car.findUnique({
            where: { id: params.id }
        });

        if (!car) {
            return new NextResponse('Véhicule non trouvé', { status: 404 });
        }

        return NextResponse.json(car);
    } catch (error) {
        console.error('Erreur lors de la récupération du véhicule:', error);
        return new NextResponse('Erreur interne du serveur', { status: 500 });
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session || session.user?.role !== 'ADMIN') {
            return new NextResponse('Non autorisé', { status: 401 });
        }

        const body = await request.json();
        const { name, brand, hp, seats, category, daily_price, weekend_price, week_price, description, caution, images } = body;

        const car = await prisma.car.update({
            where: { id: params.id },
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
        console.error('Erreur lors de la modification du véhicule:', error);
        return new NextResponse('Erreur interne du serveur', { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session || session.user?.role !== 'ADMIN') {
            return new NextResponse('Non autorisé', { status: 401 });
        }

        await prisma.car.delete({
            where: { id: params.id }
        });

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error('Erreur lors de la suppression du véhicule:', error);
        return new NextResponse('Erreur interne du serveur', { status: 500 });
    }
} 