'use client'
import SectionTitle from "@/components/SectionTitle";
import { ArrowRightIcon, MailIcon, UserIcon } from "lucide-react";
import { motion } from "motion/react";

export default function ContactSection() {
    return (
        <div className="px-4 md:px-16 lg:px-24 xl:px-32">
            <SectionTitle text1="Contacto" text2="¡Envíanos tu mensaje!" text3="¿Preguntas o sugerencias? Nos encantaría escuchar de ti. Completa el formulario y nos pondremos en contacto lo antes posible." />
            <form onSubmit={(e) => e.preventDefault()} className='grid sm:grid-cols-2 gap-3 sm:gap-5 max-w-2xl mx-auto text-slate-300 mt-16 w-full' >
                <motion.div
                    initial={{ y: 150, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                >
                    <p className='mb-2 font-medium'>Tu nombre</p>
                    <div className='flex items-center pl-3 rounded-lg border border-slate-700 focus-within:border-blue-500'>
                        <UserIcon className='size-5' />
                        <input name='name' type="text" placeholder='Escribe tu nombre' className='w-full p-3 outline-none' />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ y: 150, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
                >
                    <p className='mb-2 font-medium'>Email</p>
                    <div className='flex items-center pl-3 rounded-lg border border-slate-700 focus-within:border-blue-500'>
                        <MailIcon className='size-5' />
                        <input name='email' type="email" placeholder='tu.email@ejemplo.com' className='w-full p-3 outline-none' />
                    </div>
                </motion.div>

                <motion.div className='sm:col-span-2'
                    initial={{ y: 150, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 240, damping: 70, mass: 1 }}
                >
                    <p className='mb-2 font-medium'>Mensaje</p>
                    <textarea name='message' rows={8} placeholder='Cuéntanos tu idea o pregunta...' className='focus:border-blue-500 resize-none w-full p-3 outline-none rounded-lg border border-slate-700' />
                </motion.div>

                <motion.button type='submit' className='w-max flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-full'
                    initial={{ y: 150, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
                >
                    Submit
                    <ArrowRightIcon className="size-5" />
                </motion.button>
            </form>
        </div>
    );
}