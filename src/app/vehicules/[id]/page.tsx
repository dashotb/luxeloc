import Vehicule from "@/components/cars/Vehicule";
import { Suspense } from "react";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Vehicules({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen bg-white">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      }>
        <Vehicule id={params.id} />
      </Suspense>
    </main>
  );
}