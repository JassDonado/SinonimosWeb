'use client'
import { CheckIcon, ChevronRightIcon } from "lucide-react";
import { motion } from "motion/react";

export default function HeroSection() {
    const specialFeatures = [
        "Mejoran el vocabulario.",
        "Evitan repetir palabras.",
        "Ayudan a escribir y hablar con mayor claridad.",
    ];

    return (
        <div className="relative flex flex-col items-center justify-center px-4 md:px-16 lg:px-24 xl:px-32 py-16">
            <div className="absolute top-30 -z-10 left-1/4 size-72 bg-blue-600 blur-[300px]"></div>
            
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 w-full">
                
                {/* Columna izquierda */}
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 240, damping: 70, mass: 1 }}
                >
                    <h1 className="max-w-3xl text-5xl font-extrabold leading-tight text-white md:text-6xl">
                        ¡Aprendamos qué son los sinónimos y cómo usarlos correctamente!
                    </h1>

                    <p className="mt-6 max-w-2xl text-xl leading-relaxed text-slate-200">
                        Los sinónimos son palabras que tienen un significado igual o muy parecido.
                        Se usan para enriquecer la escritura, evitar repeticiones y expresarse mejor.
                    </p>
                </motion.div>

                {/* Columna derecha */}
                <motion.div 
                    className="rounded-2xl border border-blue-900/30 bg-slate-900/50 backdrop-blur p-8"
                    initial={{ x: 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 240, damping: 70, mass: 1 }}
                >
                    <h2 className="text-3xl font-extrabold text-white">
                        Ejemplo rápido
                    </h2>

                    <p className="mt-6 text-2xl leading-relaxed text-slate-200">
                        La torre es <span className="font-bold text-blue-300">grande</span> y se puede ver desde lejos.
                    </p>

                    <p className="mt-6 font-bold text-2xl leading-relaxed text-blue-400">
                        Usemos otra palabra
                    </p>

                    <p className="mt-6 text-2xl leading-relaxed text-slate-200">
                        La torre es <span className="font-bold text-blue-300">enorme</span> y se puede ver desde lejos.
                    </p>

                    <p className="mt-6 text-lg leading-relaxed text-slate-300">
                        En este ejemplo, <span className="font-bold text-blue-300">"grande"</span> y <span className="font-bold text-blue-300">"enorme"</span> son sinónimos, ya que ambos describen el tamaño de la torre.
                    </p>

                    <a href="#ejemplos" className="inline-flex items-center justify-center mt-8 rounded-xl bg-blue-600 px-6 py-4 text-lg font-semibold text-white transition hover:bg-blue-700 active:scale-95">
                        ¡Veamos más ejemplos!
                    </a>
                </motion.div>
            </div>

            <motion.div 
                className="flex flex-wrap justify-center items-center gap-4 md:gap-14 mt-16 w-full"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
            >
                {specialFeatures.map((feature, index) => (
                    <motion.p className="flex items-center gap-2" key={index}
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2, duration: 0.3 }}
                    >
                        <CheckIcon className="size-5 text-blue-600" />
                        <span className="text-slate-300">{feature}</span>
                    </motion.p>
                ))}
            </motion.div>
        </div>
    );
}