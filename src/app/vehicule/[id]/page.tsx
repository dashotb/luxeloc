import Vehicule from "@/components/cars/Vehicule";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function VehiclePage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen bg-white">
      <Vehicule id={params.id} />
    </main>
  );
}