import { IPricing } from "@/types";

export const pricingData: IPricing[] = [
    {
        name: "Gratis",
        price: 0,
        period: "siempre",
        features: [
            "Acceso a 50 palabras diarias",
            "Modo práctica básico",
            "5 minijuegos educativos",
            "Seguimiento de progreso",
            "Sin anuncios"
        ],
        mostPopular: false
    },
    {
        name: "Escuela",
        price: 10,
        period: "mes",
        features: [
            "Acceso ilimitado a todas las palabras",
            "Modo de aula para maestros",
            "15 minijuegos educativos",
            "Reportes de progreso detallados",
            "Soporte para maestros",
            "Acceso para toda la clase"
        ],
        mostPopular: true
    },
    {
        name: "Familia",
        price: 7,
        period: "mes",
        features: [
            "Acceso completo para hasta 4 niños",
            "Modo competitivo familiar",
            "Todos los minijuegos disponibles",
            "Desafíos semanales",
            "Premios virtuales",
            "Estadísticas compartidas"
        ],
        mostPopular: false
    }
];