import { Suspense } from "react";
import dynamicImport from 'next/dynamic';

const Vehicule = dynamicImport(() => import("@/components/cars/Vehicule"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500"></div>
    </div>
  ),
});

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function VehiclePage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen bg-white">
      {/* <Vehicule id={params.id} /> */}
      <h1>{params.id}</h1>
    </main>
  );
}

export default VehiclePage;