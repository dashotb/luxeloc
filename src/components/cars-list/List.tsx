"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Gauge, Users, MapPin } from "lucide-react";

interface Car {
  id: string;
  name: string;
  brand: string;
  hp: number;
  seats: number;
  category: string;
  daily_price: number;
  images: string[];
}

interface ListProps {
  cars: Car[];
  loading: boolean;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const LoadingSkeleton = () => (
  <>
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div key={i} className="bg-white rounded-2xl shadow-lg p-4 space-y-4">
        <div className="aspect-[16/10] bg-gray-200 rounded-xl animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
        </div>
        <div className="flex gap-4">
          <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
        </div>
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse" />
          <div className="h-10 bg-gray-200 rounded w-1/3 animate-pulse" />
        </div>
      </div>
    ))}
  </>
);

export default function List({ cars, loading }: ListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <LoadingSkeleton />
      </div>
    );
  }

  if (!cars.length) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Aucun véhicule trouvé</h3>
        <p className="text-gray-500">Essayez de modifier vos filtres de recherche</p>
      </div>
    );
  }

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {cars.map((car) => (
        <motion.div 
          key={car.id} 
          variants={item}
          className="group bg-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden"
        >
          <Link href={`/vehicule/${car.id}`}>
            <div className="relative aspect-[16/10] overflow-hidden ">
              <Image 
                src={car.images[0]} 
                alt={car.name} 
                fill
                className="object-cover p-2 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0  transition-opacity duration-300"/>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">{car.brand}</p>
                <h3 className="text-xl font-semibold group-hover:text-black transition-colors duration-300">{car.name}</h3>
                <p className="text-sm text-gray-600">{car.category}</p>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Gauge className="w-4 h-4" />
                  {car.hp} ch
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {car.seats} places
                </div>
              </div>

              <div className="pt-4 border-t flex items-center justify-between">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold">{car.daily_price}€</span>
                  <span className="text-gray-500">/jour</span>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors"
                >
                  Réserver
                </motion.button>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}