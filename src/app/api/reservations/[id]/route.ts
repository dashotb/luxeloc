import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user || session.user.role !== 'ADMIN') {
            return new NextResponse('Non autorisé', { status: 401 });
        }

        const body = await request.json();
        const { status } = body;

        if (!status || !['CONFIRMED', 'CANCELLED'].includes(status)) {
            return new NextResponse('Statut invalide', { status: 400 });
        }

        const reservation = await prisma.reservation.update({
            where: {
                id: params.id,
            },
            data: {
                status,
            },
        });

        return NextResponse.json(reservation);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la réservation:', error);
        return new NextResponse('Erreur interne du serveur', { status: 500 });
    }
} 