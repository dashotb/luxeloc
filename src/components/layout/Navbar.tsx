'use client';

import Image from "next/image";
import logo from "@/icons/logo.png"
import Link from "next/link";
import { ListIcon, Menu, User2Icon, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
    const { data: session } = useSession();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return(
        <nav className="flex flex-row justify-between w-full h-16 shadow-lg fixed top-0 z-50 bg-white">
            <div className="max-w-screen 2xl:max-w-5xl md:px-12 2xl:px-0 mx-auto flex flex-row justify-between w-full items-center">
                <Link href="/">
                    <Image src={logo} alt="logo" className="w-16 hover:scale-105 transition duration-300"/>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex flex-row gap-4">
                    <Link href="/liste" className="cursor-pointer">
                        <button className="cursor-pointer text-black px-4 py-2 rounded-md hover:scale-105 transition duration-300 flex flex-row items-center gap-2">
                            Véhicules
                        </button>
                    </Link>
                    <Link href="/conditions" className="cursor-pointer">
                        <button className="cursor-pointer text-black px-4 py-2 rounded-md hover:scale-105 transition duration-300 flex flex-row items-center gap-2">
                            Conditions
                        </button>
                    </Link>
                    <Link href="/a-propos" className="cursor-pointer">
                        <button className="cursor-pointer text-black px-4 py-2 rounded-md hover:scale-105 transition duration-300 flex flex-row items-center gap-2">
                            A Propos
                        </button>
                    </Link>
                    {session?.user?.role === "ADMIN" ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger className="cursor-pointer text-black px-4 py-2 rounded-md hover:scale-105 transition duration-300 flex flex-row items-center gap-2">
                                Espace Pro
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>
                                    <Link href="/dashboard">Tableau de bord</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href="/dashboard/vehicules">Gérer les véhicules</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href="/dashboard/reservations">Gérer les réservations</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href="/dashboard/parametres">Paramètres</Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : session?.user ? (
                        <Link href="/espace-perso">
                            <button className="cursor-pointer bg-black text-white px-4 py-2 rounded-md hover:scale-105 transition duration-300 flex flex-row items-center gap-2">
                                <User2Icon className="w-6 h-6"/> Espace Perso
                            </button>
                        </Link>
                    ) : (
                        <Link href="/login">
                            <button className="cursor-pointer bg-black text-white px-4 py-2 rounded-md hover:scale-105 transition duration-300 flex flex-row items-center gap-2">
                                <User2Icon className="w-6 h-6"/> Connexion
                            </button>
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden p-2"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="fixed inset-0 top-16 bg-white z-40 md:hidden">
                    <div className="flex flex-col p-4 space-y-4">
                        <Link 
                            href="/liste" 
                            className="text-black px-4 py-2 rounded-md hover:bg-gray-100"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Véhicules
                        </Link>
                        <Link 
                            href="/conditions" 
                            className="text-black px-4 py-2 rounded-md hover:bg-gray-100"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Conditions
                        </Link>
                        <Link 
                            href="/a-propos" 
                            className="text-black px-4 py-2 rounded-md hover:bg-gray-100"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            A Propos
                        </Link>
                        {session?.user?.role === "ADMIN" ? (
                            <div className="space-y-2">
                                <div className="font-semibold px-4 py-2">Espace Pro</div>
                                <Link 
                                    href="/dashboard" 
                                    className="block text-black px-8 py-2 hover:bg-gray-100"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Tableau de bord
                                </Link>
                                <Link 
                                    href="/dashboard/vehicules" 
                                    className="block text-black px-8 py-2 hover:bg-gray-100"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Gérer les véhicules
                                </Link>
                                <Link 
                                    href="/dashboard/reservations" 
                                    className="block text-black px-8 py-2 hover:bg-gray-100"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Gérer les réservations
                                </Link>
                                <Link 
                                    href="/dashboard/parametres" 
                                    className="block text-black px-8 py-2 hover:bg-gray-100"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Paramètres
                                </Link>
                            </div>
                        ) : session?.user ? (
                            <Link 
                                href="/espace-perso" 
                                className="flex items-center gap-2 text-black px-4 py-2 rounded-md hover:bg-gray-100"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <User2Icon className="w-6 h-6"/> Espace Perso
                            </Link>
                        ) : (
                            <Link 
                                href="/login" 
                                className="flex items-center gap-2 text-black px-4 py-2 rounded-md hover:bg-gray-100"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <User2Icon className="w-6 h-6"/> Connexion
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}