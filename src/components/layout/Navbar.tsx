import Image from "next/image";
import logo from "@/icons/logo.png"
import Link from "next/link";


export default function Navbar() {

    return(
        <nav className="flex flex-row justify-between w-full h-[7dvh] shadow-lg fixed top-0 z-10 bg-white">
            <div className="max-w-screen 2xl:max-w-5xl mx-auto flex flex-row justify-between w-full">
                <Link href="/">
                    <Image src={logo} alt="logo" className="w-16 hover:scale-105 transition duration-300"/>
                </Link>
                <div>

                </div>
                <Link href="">
                    <button>

                    </button>
                </Link>
            </div>
        </nav>
    )
}