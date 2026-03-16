'use client'
import { MenuIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { navlinks } from "@/data/navlinks";
import { INavLink } from "@/types";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <motion.nav className="fixed top-0 z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-32 backdrop-blur"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
            >
                <div className="text-xl font-bold text-pink-500">
                    Sinónimos en Contexto
                </div>

                

                <a href="#jugar" className="hidden md:block px-6 py-2.5 bg-pink-600 hover:bg-pink-700 active:scale-95 transition-all rounded-full">
                    Jugar ahora
                </a>
                <button onClick={() => setIsOpen(true)} className="md:hidden">
                    <MenuIcon size={26} className="active:scale-90 transition" />
                </button>
            </motion.nav>

            
        </>
    );
}