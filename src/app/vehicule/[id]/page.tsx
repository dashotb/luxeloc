import Vehicule from "@/components/cars/Vehicule";
import { Suspense } from "react";


export default function VehiclePage({ params }: { params: { id: string } }) {
  return (
<<<<<<< HEAD
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
=======
    <Vehicule id={params.id} />
  )
>>>>>>> parent of 838bb17 (bon)
}