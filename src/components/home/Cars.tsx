import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const categories = ["Populaire", "Sport", "Tout terrain", "Ville"];

const cars = [
  {
    image: "https://images.pexels.com/photos/3752169/pexels-photo-3752169.jpeg",
    name: "Panamera Turbo S",
    price: 200,
    category: "Sport"
  },
  {
    image: "https://images.pexels.com/photos/3874337/pexels-photo-3874337.jpeg",
    name: "Golf 7 GTI",
    price: 200,
    category: "Sport"
  },
  {
    image: "https://images.pexels.com/photos/892522/pexels-photo-892522.jpeg",
    name: "GLC Coupé",
    price: 200,
    category: "SUV"
  },
  {
    image: "https://images.pexels.com/photos/3874330/pexels-photo-3874330.jpeg",
    name: "Velar",
    price: 200,
    category: "SUV"
  },
  {
    image: "https://images.pexels.com/photos/3752169/pexels-photo-3752169.jpeg",
    name: "Golf 8 GTI Clubsport",
    price: 200,
    category: "Sport"
  },
  {
    image: "https://images.pexels.com/photos/892522/pexels-photo-892522.jpeg",
    name: "CLS",
    price: 200,
    category: "Berline"
  }
];

export default function Cars() {
  return (
    <section className="w-full py-12 md:py-24">
      <div className="max-w-5xl mx-auto px-4">
        <span className="text-red-500">Collection</span>
        <h2 className="text-2xl md:text-3xl font-semibold mt-2 mb-8 md:mb-12">Nos véhicules</h2>

        <div className="flex flex-row flex-wrap gap-4 md:gap-8 mb-8 md:mb-12">
          {categories.map((category, idx) => (
            <button 
              key={idx}
              className={`px-4 md:px-6 py-2 rounded text-sm md:text-base ${idx === 0 ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {cars.map((car, idx) => (
            <div key={idx} className="bg-white overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition duration-300">
              <Image 
                src={car.image} 
                alt={car.name} 
                width={400} 
                height={250}
                className="w-full h-48 object-cover p-2"
              />
              <div className="p-4 md:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-semibold text-lg md:text-xl">{car.price}€</span>
                  <span className="text-gray-500">/jour</span>
                </div>
                <h3 className="font-semibold text-lg md:text-xl mb-4 md:mb-6">{car.name}</h3>
                <Link href={`/vehicule/${car.name.toLowerCase().replace(/ /g, '-')}`}>
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