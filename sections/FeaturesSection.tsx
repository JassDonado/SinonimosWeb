'use client'
import SectionTitle from "@/components/SectionTitle";
import { motion } from "motion/react";

export default function FeaturesSection() {
    const ejemplos = [
        { palabra: "casa", sinonimo: "hogar, vivienda, residencia" },
        { palabra: "auto", sinonimo: "carro, automóvil, vehículo" },
        { palabra: "comenzar", sinonimo: "iniciar, empezar, arrancar" },
        { palabra: "terminar", sinonimo: "finalizar, concluir, acabar" },
        { palabra: "grande", sinonimo: "enorme, gigante, amplio" },
        { palabra: "feliz", sinonimo: "contento, alegre, satisfecho" },
    ];

    return (
        <div id="ejemplos" className="px-4 md:px-16 lg:px-24 xl:px-32 py-16">
            <SectionTitle text1="Ejemplos" text2="Sinónimos en acción" text3="Descubre cómo las palabras pueden tener significados similares y enriquecer tu vocabulario." />
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-4 mt-16 px-6">
                {ejemplos.map((item, index) => (
                    <motion.div 
                        key={index} 
                        className={`${index === 1 ? 'p-px rounded-2xl bg-linear-to-br from-pink-600 to-slate-800' : ''}`}
                        initial={{ y: 150, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                    >
                        <div className="p-8 rounded-xl space-y-6 border border-pink-900/30 bg-slate-900/50 backdrop-blur max-w-96 w-full">
                            <p className="text-sm font-semibold text-pink-400">
                                Palabra
                            </p>

                            <h3 className="text-3xl font-extrabold text-white">
                                {item.palabra}
                            </h3>

                            <div className="pt-4 border-t border-pink-900/20">
                                <p className="text-lg text-slate-300">
                                    Sinónimos:{" "}
                                    <span className="font-bold text-pink-300">{item.sinonimo}</span>
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
            <div className="mt-40 relative mx-auto max-w-5xl">
                <div className="absolute -z-50 size-100 -top-10 -left-20 aspect-square rounded-full bg-pink-500/40 blur-3xl"></div>
                <motion.p className="text-slate-300 text-lg text-left max-w-3xl"
                    initial={{ y: 150, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                >
                </motion.p>
                
            </div>
        </div>
    );
}