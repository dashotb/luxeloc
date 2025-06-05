'use client';

import { useEffect, useState } from 'react';
import { prisma } from '@/lib/prisma';
import type { Car } from '@/generated/prisma';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function VehiculesPage() {
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            const response = await fetch('/api/cars');
            const data = await response.json();
            setCars(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des véhicules:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) {
            try {
                const response = await fetch(`/api/cars/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    setCars(cars.filter(car => car.id !== id));
                }
            } catch (error) {
                console.error('Erreur lors de la suppression:', error);
            }
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Chargement...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Gestion des Véhicules</h1>
                <button
                    onClick={() => router.push('/dashboard/vehicules/new')}
                    className="bg-black text-white px-4 py-2 rounded-md hover:scale-105 transition duration-300 flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    Ajouter un véhicule
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marque</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catégorie</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix/Jour</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {cars.map((car) => (
                            <tr key={car.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{car.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{car.brand}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{car.category}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{car.daily_price}€</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => router.push(`/dashboard/vehicules/${car.id}`)}
                                            className="text-blue-600 hover:text-blue-900"
                                        >
                                            <Pencil className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(car.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
} 