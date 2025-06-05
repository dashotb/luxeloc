'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/app/firebaseConfig';
import type { Car } from '@/generated/prisma';
import { ArrowLeft, Edit } from 'lucide-react';

interface CarFormData {
    name: string;
    brand: string;
    hp: number;
    seats: number;
    category: string;
    daily_price: number;
    weekend_price: number;
    week_price: number;
    description: string;
    caution: number;
    images: string[];
}

export default function CarDetails({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [car, setCar] = useState<CarFormData | null>(null);

    useEffect(() => {
        if (params.id !== 'new') {
            fetchCar();
        }
    }, [params.id]);

    const fetchCar = async () => {
        try {
            const response = await fetch(`/api/cars/${params.id}`);
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération du véhicule');
            }
            const data = await response.json();
            setCar(data);
        } catch (error) {
            console.error('Erreur:', error);
            alert('Une erreur est survenue lors de la récupération du véhicule');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            </div>
        );
    }

    if (!car) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold mb-4">Véhicule non trouvé</h1>
                <button
                    onClick={() => router.push('/dashboard/vehicules')}
                    className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                >
                    Retour à la liste
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <button
                    onClick={() => router.push('/dashboard/vehicules')}
                    className="flex items-center text-gray-600 hover:text-black"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Retour
                </button>
                <button
                    onClick={() => router.push(`/dashboard/vehicules/${params.id}/edit`)}
                    className="flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                >
                    <Edit className="w-5 h-5 mr-2" />
                    Modifier
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Galerie d'images */}
                <div className="space-y-4">
                    {car.images && car.images.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4">
                            {car.images.map((image, index) => (
                                <div key={index} className="relative aspect-video">
                                    <img
                                        src={image}
                                        alt={`${car.name} - Image ${index + 1}`}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                            <p className="text-gray-500">Aucune image disponible</p>
                        </div>
                    )}
                </div>

                {/* Informations du véhicule */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">{car.name}</h1>
                        <p className="text-xl text-gray-600">{car.brand}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">Puissance</p>
                            <p className="text-lg font-semibold">{car.hp} ch</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">Places</p>
                            <p className="text-lg font-semibold">{car.seats}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">Catégorie</p>
                            <p className="text-lg font-semibold">{car.category}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">Caution</p>
                            <p className="text-lg font-semibold">{car.caution} €</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Tarifs</h2>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-500">Journalier</p>
                                <p className="text-lg font-semibold">{car.daily_price} €</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-500">Weekend</p>
                                <p className="text-lg font-semibold">{car.weekend_price} €</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-500">Semaine</p>
                                <p className="text-lg font-semibold">{car.week_price} €</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2">Description</h2>
                        <p className="text-gray-600 whitespace-pre-line">{car.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
} 