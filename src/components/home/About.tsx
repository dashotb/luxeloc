import Link from "next/link";
import Image from "next/image";

export default function About() {
  return (
    <section className="w-full py-12 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row gap-8 md:gap-12">
        <div className="w-full md:w-1/2">
          <Image 
            src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg" 
            alt="Luxury cars" 
            width={500}
            height={300}
            className="rounded-lg shadow-lg w-full h-[300px] object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-4 md:gap-6">
          <span className="text-red-500">A propos</span>
          <h2 className="text-2xl md:text-3xl font-semibold">Plus de 10 véhicules<br/>à votre disposition</h2>
          <p className="text-gray-600">
            Passionnés d'automobiles d'exception, nous proposons une collection exclusive de véhicules prestigieux pour des expériences de conduite inoubliables.<br/><br/>
            Notre équipe dévouée garantit un service sur mesure à la hauteur de l'excellence de nos bolides.
          </p>
          <Link href="/liste">
            <button className="bg-red-500 text-white px-6 py-3 rounded w-fit hover:bg-red-600 transition">
              Tous nos véhicules
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}