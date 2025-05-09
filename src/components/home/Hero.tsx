import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Map from "@/img/Map.png"
import RS6 from "@/img/RS6.png"
import { Brabus, ABT, Lambo, Porsche, M } from "@/icons/icons";

const icons = [
    Brabus, Porsche, M, Lambo, ABT
]

export default function Hero(){
    return(
        <section className="h-[100dvh] max-w-[100dvw] overflow-hidden relative">
            <div className="flex flex-col-reverse md:flex-row 2xl:max-w-5xl md:h-[70%] px-5 2xl:px-0 mx-auto">
                <div className="w-full md:w-[60%] h-fit pt-12 2xl:pt-0 my-auto content-center flex flex-col gap-6 md:gap-12 relative z-2">
                    <h1 className="font-semibold text-center md:text-start text-2xl md:text-5xl">La Signature <br /> du Luxe Automobile <br /> Conduisez Votre Prestige</h1>
                    <p className="font-medium text-justify md:text-start text-sm md:text-base text-gray-500 md:max-w-[80%]">Quand l'Excellence Rencontre la Route : Des Bolides d'Exception pour des Instants Inoubliables. Notre Collection Privée de Véhicules Prestigieux Transforme Chaque Trajet en une Expérience Unique, Alliant Performance, Raffinement et Service Sur Mesure pour une Clientèle qui Ne Se Contente Que du Meilleur</p>
                    <div className="flex flex-row gap-6">
                        <Link href="">
                            <button className="bg-black border border-white hover:border-black hover:bg-white hover:text-black transition duration-300 p-2 md:p-4 text-white text-sm md:text-base rounded-sm flex flex-row cursor-pointer group">Réserver un véhicule<ArrowRight className="ml-2 group-hover:translate-x-1 md:group-hover:translate-x-2 group-hover:text-black transition duration-300"/> </button>
                        </Link>
                        <Link href="">
                            <button className="m-2 md:m-4 hover:underline cursor-pointer transition duration-300">En savoir plus</button>
                        </Link>
                    </div>
                </div>
                <div className="w-full md:w-[40%] mt-8">
                    <Image src={RS6} alt="" className="relative md:absolute mt-10 md:mt-0 mx-auto md:mx-0 ml-12 md:ml-0 w-[70dvw] md:w-[45dvw] md:-right-24 md:top-24 z-2" />
                    <Image src={Map} alt="" className="absolute w-[100dvw] md:w-[45%] top-8 md:top-0 -right-5 md:right-0"/>
                </div>
            </div>
            <div className="h-[20%] w-fit flex flex-row mx-auto gap-5 md:gap-24 items-center px-5 md:px-0">
                {icons.map((icone, idx) => 
                    <Image key={idx} src={icone} alt="" className="w-[15%] md:w-40 h-fit md:h-26 opacity-50 hover:opacity-100 hover:scale-105 transition duration-300"/>
                )}
            </div>
        </section>
    )
}