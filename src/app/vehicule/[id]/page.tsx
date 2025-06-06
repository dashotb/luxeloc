import Vehicule from "@/components/cars/Vehicule";


export default function VehiclePage({ params }: { params: { id: string } }) {
  return (
    <Vehicule id={params.id} />
  )
}