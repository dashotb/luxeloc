'use client';

import Vehicule from "@/components/cars/Vehicule";

export default function VehiclePage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen bg-white">
      <Vehicule id={params.id} />
    </main>
  );
}