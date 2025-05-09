import Image from "next/image";

const services = [
  {
    icon: "/window.svg",
    title: "Service de Livraison Premium",
    description: "Votre Véhicule vous est Livré à l'Adresse de Votre Choix en Toute Discrétion et Ponctualité"
  },
  {
    icon: "/file.svg",
    title: "Collection Exclusive",
    description: "Une Sélection Unique de Bolides Prestigieux pour Répondre à Vos Envies les Plus Exigeantes"
  },
  {
    icon: "/globe.svg",
    title: "Excellence Irréprochable",
    description: "Organisation Parfaite et Service Minute Absolue, Garantissant une Préparation Impeccable Digne de Votre Statut"
  }
];

export default function Services() {
  return (
    <section className="w-full py-12 md:py-24 bg-black text-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-8 md:mb-16">
          <span className="text-red-500">Nos Services</span>
          <h2 className="text-2xl md:text-3xl font-semibold mt-2">Les meilleurs services<br/>de location de voiture</h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-sm md:text-base">
            Sélection personnalisée de véhicules prestigieux et livraison clé en main pour une expérience sans égale. Préparation méticuleuse et accompagnement discret pour satisfaire vos attentes les plus exigeantes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="bg-zinc-900 p-6 md:p-8 rounded-lg hover:bg-zinc-800 transition">
              <Image src={service.icon} alt={service.title} width={40} height={40} className="mb-4" />
              <h3 className="text-lg md:text-xl font-semibold mb-4">{service.title}</h3>
              <p className="text-gray-400 text-sm md:text-base">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}