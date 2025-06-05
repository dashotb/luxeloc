"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Check, X } from "lucide-react";

interface Reservation {
  id: string;
  startDate: string;
  endDate: string;
  status: string;
  totalPrice: number;
  deposit: number;
  firstName: string;
  lastName: string;
  email: string;
  car: {
    name: string;
    brand: string;
  };
}

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await fetch('/api/reservations');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des réservations');
      }
      const data = await response.json();
      setReservations(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const updateReservationStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/reservations/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du statut');
      }

      // Rafraîchir la liste des réservations
      fetchReservations();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Une erreur est survenue');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Erreur</h1>
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={fetchReservations}
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Gestion des réservations</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Véhicule
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dates
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Montant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {reservation.firstName} {reservation.lastName}
                  </div>
                  <div className="text-sm text-gray-500">{reservation.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {reservation.car.brand} {reservation.car.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    Du {format(new Date(reservation.startDate), "dd MMM yyyy", { locale: fr })}
                  </div>
                  <div className="text-sm text-gray-500">
                    Au {format(new Date(reservation.endDate), "dd MMM yyyy", { locale: fr })}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{reservation.totalPrice}€</div>
                  <div className="text-sm text-gray-500">Caution: {reservation.deposit}€</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    reservation.status === 'CONFIRMED' 
                      ? 'bg-green-100 text-green-800'
                      : reservation.status === 'CANCELLED'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {reservation.status === 'CONFIRMED' 
                      ? 'Confirmée'
                      : reservation.status === 'CANCELLED'
                      ? 'Annulée'
                      : 'En attente'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {reservation.status === 'PENDING' && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => updateReservationStatus(reservation.id, 'CONFIRMED')}
                        className="text-green-600 hover:text-green-900"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => updateReservationStatus(reservation.id, 'CANCELLED')}
                        className="text-red-600 hover:text-red-900"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 