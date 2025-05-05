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
            <Image src={Map} alt="" className="absolute w-[45%] right-0"/>
            <div className="flex flex-row 2xl:max-w-5xl h-[70%] mx-auto">
                <div className="w-[60%] h-fit my-auto content-center flex flex-col gap-12 ">
                    <h1 className="font-semibold text-5xl ">La Signature <br /> du Luxe Automobile <br /> Conduisez Votre Prestige</h1>
                    <p className="font-medium text-gray-500">Quand l'Excellence Rencontre la Route : Des Bolides d'Exception pour des Instants Inoubliables. Notre Collection Privée de Véhicules Prestigieux Transforme Chaque Trajet en une Expérience Unique, Alliant Performance, Raffinement et Service Sur Mesure pour une Clientèle qui Ne Se Contente Que du Meilleur</p>
                    <div className="flex flex-row gap-6">
                        <Link href="">
                            <button className="bg-black border border-white hover:border-black hover:bg-white hover:text-black transition duration-300 p-4 text-white rounded-sm flex flex-row cursor-pointer group">Réserver un véhicule<ArrowRight className="ml-2 group-hover:translate-x-2 group-hover:text-black transition duration-300"/> </button>
                        </Link>
                        <Link href="">
                            <button className="m-4 hover:underline cursor-pointer hover:scale-105 transition duration-300">En savoir plus</button>
                        </Link>
                    </div>
                </div>
                <div className="w-[40%]">
                    <Image src={RS6} alt="" className="absolute w-[45dvw] -right-24 top-24 z-2 " />
                </div>
            </div>
            <div className="h-[20%] w-fit flex flex-row mx-auto gap-24 items-center">
                {icons.map((icone, idx) => 
                    <Image key={idx} src={icone} alt="" className="w-40 h-26 opacity-50 hover:opacity-100 hover:scale-105 transition duration-300"/>
                )}
            </div>
        </section>
    )
}