"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, ChevronDown } from "lucide-react";

interface FiltersProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories = ["Sport", "SUV", "Berline", "Citadine"];
const brands = ["Porsche", "Mercedes", "BMW", "Volkswagen", "Range Rover"];
const transmissions = ["Automatique", "Manuelle"];
const fuelTypes = ["Essence", "Diesel", "Hybride", "Électrique"];

export default function Filters({ isOpen, onClose }: FiltersProps) {
  const [priceRange, setPriceRange] = useState([0]);
  const [powerRange, setPowerRange] = useState([0]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  
  return (
    <>
      {/* Search Bar - Desktop */}
      <div className="hidden md:block sticky top-24 w-[300px]">
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher un véhicule..."
              className="w-full px-4 py-3 pl-12 bg-white rounded-xl border border-gray-200 focus:border-black focus:ring-2 focus:ring-gray-200 transition-all duration-300"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>

          <div>
            <h3 className="font-semibold mb-4">Catégories</h3>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-4 py-2 rounded-lg text-left transition-all ${
                    selectedCategory === category 
                      ? 'bg-black text-white border-black' 
                      : 'hover:border-black'
                  }`}
                  onClick={() => setSelectedCategory(
                    selectedCategory === category ? null : category
                  )}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Marques</h3>
            <div className="space-y-2">
              {brands.map((brand) => (
                <motion.button
                  key={brand}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full px-4 py-2 rounded-lg text-left transition-all ${
                    selectedBrand === brand 
                      ? 'bg-black text-white border-black' 
                      : 'hover:border-black'
                  }`}
                  onClick={() => setSelectedBrand(
                    selectedBrand === brand ? null : brand
                  )}
                >
                  {brand}
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Prix par jour</h3>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([parseInt(e.target.value)])}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-700"
            />
            <div className="flex justify-between mt-2">
              <span className="text-gray-600">0€</span>
              <span className="font-medium">{priceRange[0]}€</span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Puissance</h3>
            <input
              type="range"
              min="0"
              max="800"
              value={powerRange[0]}
              onChange={(e) => setPowerRange([parseInt(e.target.value)])}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-700"
            />
            <div className="flex justify-between mt-2">
              <span className="text-gray-600">0 ch</span>
              <span className="font-medium">{powerRange[0]} ch</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-black text-white rounded-xl hover:bg-gray-900 transition-colors"
          >
            Appliquer les filtres
          </motion.button>
        </div>
      </div>

      {/* Mobile Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white h-[90vh] w-full fixed bottom-0 rounded-t-3xl p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Filtres</h2>
                <button onClick={onClose}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-6 max-h-[calc(90vh-180px)] overflow-y-auto">
                <div>
                  <h3 className="font-semibold mb-4">Catégories</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((category) => (
                      <motion.button
                        key={category}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`px-4 py-2 rounded-lg border text-left transition-all ${
                          selectedCategory === category 
                            ? 'bg-black text-white border-black' 
                            : 'hover:border-black'
                        }`}
                        onClick={() => setSelectedCategory(
                          selectedCategory === category ? null : category
                        )}
                      >
                        {category}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Marques</h3>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <motion.button
                        key={brand}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full px-4 py-2 rounded-lg border text-left transition-all ${
                          selectedBrand === brand 
                            ? 'bg-black text-white border-black' 
                            : 'hover:border-black'
                        }`}
                        onClick={() => setSelectedBrand(
                          selectedBrand === brand ? null : brand
                        )}
                      >
                        {brand}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Prix par jour</h3>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-gray-600">0€</span>
                    <span className="font-medium">{priceRange[0]}€</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Puissance</h3>
                  <input
                    type="range"
                    min="0"
                    max="800"
                    value={powerRange[0]}
                    onChange={(e) => setPowerRange([parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-gray-600">0 ch</span>
                    <span className="font-medium">{powerRange[0]} ch</span>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="absolute bottom-6 left-6 right-6 bg-black text-white py-3 rounded-xl"
              >
                Appliquer les filtres
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}