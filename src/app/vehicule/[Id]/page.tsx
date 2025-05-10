"use client";

import { useState } from "react";
import Image from "next/image";
import Calendar from "react-calendar";
import { ChevronLeft, ChevronRight, ArrowLeft, Upload } from "lucide-react";
import { differenceInDays, format } from "date-fns";
import { fr } from "date-fns/locale";
import { motion, AnimatePresence } from "framer-motion";

type BookingStep = "calendar" | "info" | "payment";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const slideIn = {
  initial: { x: 20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -20, opacity: 0 }
};

export default function VehiclePage({ params }: any) {
  const [step, setStep] = useState<BookingStep>("calendar");
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    driverLicense: null as File | null,
    identityCard: null as File | null,
    proofOfAddress: null as File | null
  });

  // Mock data - replace with actual API call
  const vehicle = {
    name: "Panamera Turbo S",
    brand: "Porsche",
    images: [
      "https://images.pexels.com/photos/3752169/pexels-photo-3752169.jpeg",
      "https://images.pexels.com/photos/3874337/pexels-photo-3874337.jpeg",
      "https://images.pexels.com/photos/892522/pexels-photo-892522.jpeg",
    ],
    specs: {
      power: "630ch",
      acceleration: "3.1s",
      maxSpeed: "315 km/h",
      transmission: "PDK 8 vitesses",
      seats: 4,
    },
    prices: {
      jour: 500,
      weekend: 900,
      semaine: 3000,
      acompte: 2000,
    },
    description: "La Porsche Panamera Turbo S incarne la quintessence du luxe sportif. Avec son moteur V8 biturbo de 630 chevaux, elle offre des performances exceptionnelles tout en conservant un niveau de confort et de raffinement digne des meilleures berlines de luxe.",
  };

  const calculateTotal = () => {
    if (!dateRange[0] || !dateRange[1]) return 0;
    const days = differenceInDays(dateRange[1], dateRange[0]) + 1;
    return days * vehicle.prices.jour;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "driverLicense" | "identityCard" | "proofOfAddress") => {
    if (e.target.files?.[0]) {
      setPersonalInfo(prev => ({
        ...prev,
        [type]: e.target.files![0]
      }));
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === vehicle.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? vehicle.images.length - 1 : prev - 1
    );
  };

  const goToPreviousStep = () => {
    switch (step) {
      case "info":
        setStep("calendar");
        break;
      case "payment":
        setStep("info");
        break;
    }
  };

  const renderStep = () => {
    switch (step) {
      case "calendar":
        return (
          <motion.div 
            className="space-y-6"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fadeIn}
          >
            <Calendar
              selectRange
              value={dateRange}
              onChange={value => setDateRange(value as [Date | null, Date | null])}
              className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-4"
              locale={"fr"}
              nextLabel={<ChevronRight className="w-4 h-4" />}
              prevLabel={<ChevronLeft className="w-4 h-4" />}
              minDate={new Date()}
            />
            <AnimatePresence mode="wait">
              {dateRange[0] && dateRange[1] && (
                <motion.div 
                  className="bg-black text-white p-6 rounded-lg"
                  variants={slideIn}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <h4 className="font-semibold mb-4 text-lg">Récapitulatif</h4>
                  <div className="space-y-2 text-gray-300">
                    <p>Du: {format(dateRange[0], "dd MMMM yyyy", { locale: fr })}</p>
                    <p>Au: {format(dateRange[1], "dd MMMM yyyy", { locale: fr })}</p>
                    <p className="text-xl font-semibold text-white mt-4">Total: {calculateTotal()}€</p>
                  </div>
                  <button
                    onClick={() => setStep("info")}
                    className="w-full mt-6 bg-white text-black py-3 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                  >
                    Continuer
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );

      case "info":
        return (
          <motion.div
            className="space-y-6"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fadeIn}
          >
            <button
              onClick={goToPreviousStep}
              className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </button>
            <form 
              className="space-y-6"
              onSubmit={e => { e.preventDefault(); setStep("payment"); }}
            >
              <div className="space-y-4 max-h-[50dvh] overflow-y-scroll">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Prénom</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                      value={personalInfo.firstName}
                      onChange={e => setPersonalInfo(prev => ({ ...prev, firstName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Nom</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                      value={personalInfo.lastName}
                      onChange={e => setPersonalInfo(prev => ({ ...prev, lastName: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Date de naissance</label>
                  <input
                    type="date"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                    value={personalInfo.birthDate}
                    onChange={e => setPersonalInfo(prev => ({ ...prev, birthDate: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                    value={personalInfo.email}
                    onChange={e => setPersonalInfo(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Téléphone</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                    value={personalInfo.phone}
                    onChange={e => setPersonalInfo(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Adresse</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                    value={personalInfo.address}
                    onChange={e => setPersonalInfo(prev => ({ ...prev, address: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Ville</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                      value={personalInfo.city}
                      onChange={e => setPersonalInfo(prev => ({ ...prev, city: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Code postal</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                      value={personalInfo.postalCode}
                      onChange={e => setPersonalInfo(prev => ({ ...prev, postalCode: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Pays</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                    value={personalInfo.country}
                    onChange={e => setPersonalInfo(prev => ({ ...prev, country: e.target.value }))}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Documents requis</h3>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Permis de conduire</label>
                    <div className="relative">
                      <input
                        type="file"
                        required
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "driverLicense")}
                        className="hidden"
                        id="driverLicense"
                      />
                      <label
                        htmlFor="driverLicense"
                        className="flex items-center gap-2 w-full px-4 py-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-300"
                      >
                        <Upload className="w-5 h-5" />
                        {personalInfo.driverLicense ? personalInfo.driverLicense.name : "Choisir un fichier"}
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Carte d'identité</label>
                    <div className="relative">
                      <input
                        type="file"
                        required
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "identityCard")}
                        className="hidden"
                        id="identityCard"
                      />
                      <label
                        htmlFor="identityCard"
                        className="flex items-center gap-2 w-full px-4 py-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-300"
                      >
                        <Upload className="w-5 h-5" />
                        {personalInfo.identityCard ? personalInfo.identityCard.name : "Choisir un fichier"}
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Justificatif de domicile</label>
                    <div className="relative">
                      <input
                        type="file"
                        required
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "proofOfAddress")}
                        className="hidden"
                        id="proofOfAddress"
                      />
                      <label
                        htmlFor="proofOfAddress"
                        className="flex items-center gap-2 w-full px-4 py-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-300"
                      >
                        <Upload className="w-5 h-5" />
                        {personalInfo.proofOfAddress ? personalInfo.proofOfAddress.name : "Choisir un fichier"}
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-4 rounded-lg hover:bg-gray-900 transition-colors duration-300"
              >
                Procéder au paiement
              </button>
            </form>
          </motion.div>
        );

      case "payment":
        return (
          <motion.div 
            className="space-y-6"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fadeIn}
          >
            <button
              onClick={goToPreviousStep}
              className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </button>
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <h4 className="text-xl font-semibold">Récapitulatif de la commande</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Location</span>
                  <span className="font-semibold">{calculateTotal()}€</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Caution</span>
                  <span className="font-semibold">{vehicle.prices.acompte}€</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t">
                  <span>Acompte (25%)</span>
                  <span className="font-semibold">{calculateTotal() * 0.25}€</span>
                </div>
              </div>
            </div>
            <button
              className="w-full bg-black text-white py-4 rounded-lg hover:bg-gray-900 transition-colors duration-300"
            >
              Payer l'acompte
            </button>
          </motion.div>
        );
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row gap-12"
      >
        <div className="w-full lg:w-[66%]">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold mb-2">{vehicle.name}</h1>
            <p className="text-gray-500 text-lg">{vehicle.brand}</p>
          </motion.div>
          
          <div className="relative mb-8 group">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="aspect-[16/10] relative overflow-hidden rounded-lg"
            >
              <Image
                src={vehicle.images[currentImageIndex]}
                alt={`${vehicle.name} - Vue ${currentImageIndex + 1}`}
                fill
                className="object-cover"
              />
            </motion.div>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <motion.div 
            className="space-y-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div>
              <h2 className="text-2xl font-semibold mb-6">Caractéristiques</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(vehicle.specs).map(([key, value], index) => (
                  <motion.div 
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 p-6 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                  >
                    <p className="text-gray-500 text-sm mb-1">{key}</p>
                    <p className="font-semibold text-lg">{value}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-6">Description</h2>
              <p className="text-gray-600 leading-relaxed">{vehicle.description}</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-6">Tarifs</h2>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(vehicle.prices).map(([key, value], index) => (
                  <motion.div 
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 p-6 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                  >
                    <p className="text-gray-500 text-sm mb-1">{key}</p>
                    <p className="font-semibold text-2xl">{value}€</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white h-[80vh] p-5 overflow-y-scroll lg:sticky no-scrollbar lg:top-16 lg:mt-8 w-full lg:w-[33%]"
        >
          <h2 className="text-2xl font-semibold mb-8">Réservation</h2>
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </main>
  );
}