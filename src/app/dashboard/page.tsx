'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { Car, Users, Calendar, Settings } from "lucide-react";

interface DashboardStats {
  totalVehicles: number;
  totalReservations: number;
  activeReservations: number;
  totalUsers: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalVehicles: 0,
    totalReservations: 0,
    activeReservations: 0,
    totalUsers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/dashboard/stats");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des statistiques");
        }
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Tableau de bord</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base md:text-lg font-semibold">Véhicules</h3>
            <Car className="w-5 h-5 md:w-6 md:h-6 text-black" />
          </div>
          <p className="text-2xl md:text-3xl font-bold mb-4">{stats.totalVehicles}</p>
          <div className="mt-auto">
            <Link href="/dashboard/vehicules">
              <button className="w-full bg-black text-white px-3 py-2 md:px-4 md:py-2 rounded hover:bg-gray-800 transition text-sm md:text-base">
                Gérer les véhicules
              </button>
            </Link>
          </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base md:text-lg font-semibold">Réservations</h3>
            <Calendar className="w-5 h-5 md:w-6 md:h-6 text-black" />
          </div>
          <p className="text-2xl md:text-3xl font-bold">{stats.totalReservations}</p>
          <p className="text-xs md:text-sm text-gray-500 mb-4">{stats.activeReservations} réservations actives</p>
          <div className="mt-auto">
            <Link href="/dashboard/reservations">
              <button className="w-full bg-black text-white px-3 py-2 md:px-4 md:py-2 rounded hover:bg-gray-800 transition text-sm md:text-base">
                Voir les réservations
              </button>
            </Link>
          </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base md:text-lg font-semibold">Utilisateurs</h3>
            <Users className="w-5 h-5 md:w-6 md:h-6 text-black" />
          </div>
          <p className="text-2xl md:text-3xl font-bold mb-4">{stats.totalUsers}</p>
          <div className="mt-auto">
            <Link href="/dashboard/users">
              <button className="w-full bg-black text-white px-3 py-2 md:px-4 md:py-2 rounded hover:bg-gray-800 transition text-sm md:text-base">
                Gérer les utilisateurs
              </button>
            </Link>
          </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base md:text-lg font-semibold">Paramètres</h3>
            <Settings className="w-5 h-5 md:w-6 md:h-6 text-black" />
          </div>
          <p className="text-xs md:text-sm text-gray-500 mb-4">Configuration du site</p>
          <div className="mt-auto">
            <Link href="/dashboard/parametres">
              <button className="w-full bg-black text-white px-3 py-2 md:px-4 md:py-2 rounded hover:bg-gray-800 transition text-sm md:text-base">
                Modifier les paramètres
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
          <h2 className="text-lg md:text-xl font-semibold mb-4">Réservations récentes</h2>
          <div className="space-y-4">
            {/* Liste des réservations récentes */}
            <p className="text-sm md:text-base text-gray-500">Chargement des réservations récentes...</p>
          </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
          <h2 className="text-lg md:text-xl font-semibold mb-4">Véhicules populaires</h2>
          <div className="space-y-4">
            {/* Liste des véhicules populaires */}
            <p className="text-sm md:text-base text-gray-500">Chargement des véhicules populaires...</p>
          </div>
        </div>
      </div>
    </div>
  );
} 