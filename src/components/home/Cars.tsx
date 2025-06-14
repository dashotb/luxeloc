"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface Vehicle {
  id: string;
  name: string;
  brand: string;
  images: string[];
  hp: number;
  seats: number;
  category: string;
  daily_price: number;
  description: string;
}

export default function Cars() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Tout");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch("/api/cars");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des véhicules");
        }
        const data = await response.json() as Vehicle[];
        setVehicles(data);
        setFilteredVehicles(data);
        
        // Extraire les catégories uniques des véhicules
        const uniqueCategories = Array.from(new Set(data.map(vehicle => vehicle.category)));
        setCategories(["Tout", ...uniqueCategories]);
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === "Tout") {
      setFilteredVehicles(vehicles);
    } else {
      setFilteredVehicles(vehicles.filter(vehicle => vehicle.category === category));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <section className="w-full py-12 md:py-24">
      <div className="max-w-5xl mx-auto px-4">
        <span className="text-red-500">Collection</span>
        <h2 className="text-2xl md:text-3xl font-semibold mt-2 mb-8 md:mb-12">Nos véhicules</h2>

        <div className="flex flex-row flex-wrap gap-4 md:gap-8 mb-8 md:mb-12">
          {categories.map((category) => (
            <button 
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 md:px-6 py-2 rounded text-sm md:text-base ${
                category === selectedCategory ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredVehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition duration-300">
              <Image 
                src={vehicle.images[0]} 
                alt={vehicle.name} 
                width={400} 
                height={250}
                className="w-full h-48 object-cover p-2"
              />
              <div className="p-4 md:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-semibold text-lg md:text-xl">{vehicle.daily_price}€</span>
                  <span className="text-gray-500">/jour</span>
                </div>
                <h3 className="font-semibold text-lg md:text-xl mb-4 md:mb-6">{vehicle.name}</h3>
                <Link href={`/vehicules/${vehicle.id}`}>
                  <button className="w-full flex flex-row py-3 hover:bg-black hover:text-white transition transition duration-300 group">
                    <p className="mx-auto flex flex-row ">
                      Réserver Maintenant
                      <ArrowRight className="w-5 ml-2 group-hover:translate-x-1 transition duration-300"/>
                    </p>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8 md:mt-12">
          <Link href="/liste">
            <button className="bg-red-500 text-white px-6 md:px-8 py-3 rounded hover:bg-red-600 transition">
              Voir plus
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}