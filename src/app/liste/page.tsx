"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, Search } from "lucide-react";
import Filters from "@/components/cars-list/Filters";
import Sort from "@/components/cars-list/Sort";
import List from "@/components/cars-list/List";

export default function Page() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/cars')
      .then(res => res.json())
      .then(data => {
        setCars(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching cars:', err);
        setLoading(false);
      });
  }, []);

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-6 mb-12"
        >
          <div>
            <h1 className="text-4xl font-bold mb-2">Notre Collection</h1>
            <p className="text-gray-500">Découvrez notre sélection de véhicules d'exception</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search Bar - Mobile */}
            <div className="w-full md:hidden relative">
              <input
                type="text"
                placeholder="Rechercher un véhicule..."
                className="w-full px-4 py-3 pl-12 bg-white rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>

            <div className="flex w-full md:w-auto items-center gap-4">
              <Sort />
              <button 
                className="md:hidden flex items-center gap-2 px-4 py-2 border rounded-xl hover:bg-gray-50 transition-colors"
                onClick={() => setIsFiltersOpen(true)}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filtres
              </button>
            </div>
          </div>
        </motion.div>

        <div className="flex gap-8">
          <Filters isOpen={isFiltersOpen} onClose={() => setIsFiltersOpen(false)} />
          <div className="flex-1">
            <List cars={cars} loading={loading} />
          </div>
        </div>
      </div>
    </motion.main>
  );
}