import Link from "next/link";
import Image from "next/image";
import supercars from "@/img/Supercars.png"

export default function About() {
  return (
    <section className="w-full py-12 md:py-24 bg-white">
      <div className="2xl:max-w-5xl mx-auto px-4 flex flex-col md:flex-row gap-8 md:gap-12">
        <div className="w-full md:w-1/2">
          <Image 
            src={supercars}
            alt="Luxury cars" 
            
            className="rounded-lg shadow-lg w-full object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-4 md:gap-6">
          <span className="text-red-500 md:text-xl">A propos</span>
          <h2 className="text-2xl md:text-5xl 2xl:text-3xl font-semibold">Plus de 10 véhicules<br/>à votre disposition</h2>
          <p className="text-gray-600 md:mr-36 2xl:mr-0 md:text-xl 2xl:text-lg">
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