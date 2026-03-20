"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronRightIcon, CheckIcon, RefreshCwIcon } from "lucide-react";

type Pregunta = {
  palabra: string;
  respuestas: string[];
};

const bancoPreguntas: Pregunta[] = [
  { palabra: "grande", respuestas: ["enorme", "gigante", "amplio", "inmenso", "colosal", "extenso"] },
  { palabra: "feliz", respuestas: ["alegre", "contento", "satisfecho", "dichoso", "encantado", "jubiloso"] },
  { palabra: "casa", respuestas: ["hogar", "vivienda", "residencia", "domicilio", "morada"] },
  { palabra: "comenzar", respuestas: ["iniciar", "empezar", "arrancar", "principiar", "dar inicio"] },
  { palabra: "terminar", respuestas: ["finalizar", "acabar", "concluir", "completar", "cerrar"] },
  { palabra: "rápido", respuestas: ["veloz", "ligero", "ágil", "inmediato", "acelerado"] },
  { palabra: "bonito", respuestas: ["hermoso", "bello", "lindo", "atractivo", "precioso"] },
  { palabra: "inteligente", respuestas: ["listo", "sabio", "brillante", "astuto", "ingenioso"] },
  { palabra: "difícil", respuestas: ["complicado", "duro", "arduo", "complejo", "desafiante"] },
  { palabra: "pequeño", respuestas: ["chico", "diminuto", "reducido", "minúsculo", "corto"] },
  { palabra: "hablar", respuestas: ["conversar", "dialogar", "platicar", "comunicar", "expresar"] },
  { palabra: "mirar", respuestas: ["observar", "ver", "contemplar", "examinar", "visualizar"] },
  { palabra: "trabajar", respuestas: ["laborar", "emplearse", "ejercer", "desempeñar", "producir"] },
  { palabra: "pensar", respuestas: ["reflexionar", "considerar", "meditar", "razonar", "analizar"] },
  { palabra: "ayudar", respuestas: ["apoyar", "asistir", "socorrer", "colaborar", "auxiliar"] },
  { palabra: "caminar", respuestas: ["andar", "pasear", "transitar", "recorrer", "marchar"] },
  { palabra: "comprar", respuestas: ["adquirir", "obtener", "conseguir", "aprovisionarse"] },
  { palabra: "enseñar", respuestas: ["educar", "instruir", "explicar", "formar", "guiar", "mentorizar", "entrenar"] },
  { palabra: "aprender", respuestas: ["estudiar", "asimilar", "comprender", "dominar", "captar", "adquirir conocimiento"] },
  { palabra: "fácil", respuestas: ["sencillo", "simple", "accesible", "claro", "ligero"] },
];

function normalizarTexto(texto: string) {
  return texto
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function mezclarPreguntas(array: Pregunta[]) {
  return [...array].sort(() => Math.random() - 0.5);
}

function obtenerPreguntasAleatorias() {
  return mezclarPreguntas(bancoPreguntas).slice(0, 5);
}

export default function JuegoSinonimos() {
  const [preguntasPendientes, setPreguntasPendientes] = useState<Pregunta[]>([]);
  const [totalPreguntas, setTotalPreguntas] = useState(0);
  const [respuesta, setRespuesta] = useState("");
  const [puntaje, setPuntaje] = useState(0);
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState<"ok" | "error" | "skip" | "">("");
  const [terminado, setTerminado] = useState(false);
  const [cargado, setCargado] = useState(false);
  const [bloqueado, setBloqueado] = useState(false);

  useEffect(() => {
    iniciarJuego();
  }, []);

  const iniciarJuego = () => {
    const seleccionadas = obtenerPreguntasAleatorias();
    setPreguntasPendientes(seleccionadas);
    setTotalPreguntas(seleccionadas.length);
    setRespuesta("");
    setPuntaje(0);
    setMensaje("");
    setTipoMensaje("");
    setTerminado(false);
    setBloqueado(false);
    setCargado(true);
  };

  const preguntasCorrectas = totalPreguntas - preguntasPendientes.length;

  const progreso = useMemo(() => {
    if (totalPreguntas === 0) return 0;
    return (preguntasCorrectas / totalPreguntas) * 100;
  }, [preguntasCorrectas, totalPreguntas]);

  const preguntaActual = preguntasPendientes[0];

  const avanzarTrasCorrecta = () => {
    setBloqueado(true);

    setTimeout(() => {
      setPreguntasPendientes((prev) => {
        const nuevas = prev.slice(1);

        if (nuevas.length === 0) {
          setTerminado(true);
        }

        return nuevas;
      });

      setRespuesta("");
      setMensaje("");
      setTipoMensaje("");
      setBloqueado(false);
    }, 1200);
  };

  const moverActualAlFinal = () => {
    setBloqueado(true);

    setTimeout(() => {
      setPreguntasPendientes((prev) => {
        if (prev.length <= 1) return prev;
        const [actual, ...resto] = prev;
        return [...resto, actual];
      });

      setRespuesta("");
      setMensaje("");
      setTipoMensaje("");
      setBloqueado(false);
    }, 1200);
  };

  const verificarRespuesta = () => {
    if (bloqueado || !preguntaActual) return;

    if (!respuesta.trim()) {
      setMensaje("Escriba la palabra correcta antes de verificar.");
      setTipoMensaje("error");
      return;
    }

    const valorUsuario = normalizarTexto(respuesta);
    const respuestasValidas = preguntaActual.respuestas.map(normalizarTexto);

    if (respuestasValidas.includes(valorUsuario)) {
      setPuntaje((prev) => prev + 1);
      setMensaje("¡Palabra correcta! Ganaste un punto.");
      setTipoMensaje("ok");
      avanzarTrasCorrecta();
    } else {
      if (preguntasPendientes.length === 1) {
        setMensaje("No es correcto. Inténtalo de nuevo con esta misma palabra.");
        setTipoMensaje("error");
        setRespuesta("");
        return;
      }

      setMensaje("No es correcto. Te mostraremos otra palabra y esta volverá después.");
      setTipoMensaje("error");
      moverActualAlFinal();
    }
  };

  const pasarPregunta = () => {
    if (bloqueado || !preguntaActual) return;

    if (preguntasPendientes.length === 1) {
      setMensaje("Solo queda esta palabra. Debes responderla correctamente para terminar.");
      setTipoMensaje("skip");
      return;
    }

    setMensaje("Has pasado esta palabra. Verás otra ahora y esta volverá después.");
    setTipoMensaje("skip");
    moverActualAlFinal();
  };

  const reiniciarJuego = () => {
    iniciarJuego();
  };

  if (!cargado || preguntasPendientes.length === 0 && !terminado) {
    return (
      <section
        id="jugar"
        className="relative flex flex-col items-center justify-center px-4 md:px-16 lg:px-24 xl:px-32 py-16"
      >
        <div className="absolute top-30 -z-10 left-1/4 size-72 bg-blue-600 blur-[300px]"></div>
        <div className="max-w-4xl rounded-2xl border border-blue-900/30 bg-slate-900/50 backdrop-blur p-8 w-full">
          <p className="text-lg font-semibold text-blue-200">Cargando juego...</p>
        </div>
      </section>
    );
  }

  if (terminado) {
    return (
      <section
        id="jugar"
        className="relative flex flex-col items-center justify-center px-4 md:px-16 lg:px-24 xl:px-32 py-16"
      >
        <div className="absolute top-30 -z-10 left-1/4 size-72 bg-blue-600 blur-[300px]"></div>
        <div className="max-w-3xl rounded-2xl border border-blue-900/30 bg-slate-900/50 backdrop-blur p-8 w-full">
          <h2 className="text-4xl font-extrabold text-white">
            ¡Juego terminado!
          </h2>

          <p className="mt-6 text-xl text-slate-200">
            Has concluido con la clase de sinónimos.
          </p>

          <div className="mt-4 inline-flex rounded-2xl bg-blue-900/40 backdrop-blur px-6 py-4 text-3xl font-extrabold text-blue-300 border border-blue-500/30">
            {puntaje} / {totalPreguntas}
          </div>

          <p className="mt-6 text-lg text-slate-300">
            Excelente. Respondiste correctamente todas las palabras.
          </p>

          <button
            onClick={reiniciarJuego}
            className="mt-8 flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all px-5 py-3 font-semibold text-white"
          >
            <RefreshCwIcon size={18} />
            Juguemos de nuevo
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      id="jugar"
      className="relative flex flex-col items-center justify-center px-4 md:px-16 lg:px-24 xl:px-32 py-16"
    >
      <div className="absolute top-30 -z-10 left-1/4 size-72 bg-blue-600 blur-[300px]"></div>

      <div className="max-w-4xl rounded-2xl border border-blue-900/30 bg-slate-900/50 backdrop-blur p-8 w-full">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-4xl font-extrabold text-white">
            Juguemos con sinónimos
          </h2>

          <div className="rounded-2xl bg-blue-900/40 backdrop-blur px-4 py-2 text-lg font-bold text-blue-300 border border-blue-500/30">
            Puntaje: {puntaje}
          </div>
        </div>

        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-300">
            <span>
              Completadas {preguntasCorrectas} de {totalPreguntas}
            </span>
            <span>{Math.round(progreso)}%</span>
          </div>

          <div className="h-4 w-full overflow-hidden rounded-full bg-slate-700/50">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-500 ease-in-out"
              style={{ width: `${progreso}%` }}
            />
          </div>
        </div>

        <div className="mt-10">
          <p className="text-lg font-semibold text-slate-300">
            Escribamos el sinónimo de:
          </p>

          <h3 className="mt-3 text-5xl font-extrabold bg-linear-to-r from-blue-400 to-blue-300 text-transparent bg-clip-text">
            {preguntaActual?.palabra}
          </h3>

          <div className="mt-8">
            <input
              type="text"
              value={respuesta}
              onChange={(e) => setRespuesta(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && verificarRespuesta()}
              placeholder="Escribe tu respuesta aquí"
              disabled={bloqueado}
              className="w-full rounded-xl border border-blue-900/30 bg-slate-800/50 backdrop-blur px-5 py-4 text-lg text-white outline-none transition placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 disabled:opacity-60"
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <button
              onClick={verificarRespuesta}
              disabled={bloqueado}
              className="rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all px-6 py-3 font-semibold text-white disabled:opacity-60"
            >
              Verificar
            </button>

            <button
              onClick={pasarPregunta}
              disabled={bloqueado}
              className="flex items-center gap-2 rounded-xl bg-slate-700/50 hover:bg-slate-600/50 active:scale-95 backdrop-blur transition-all px-6 py-3 font-semibold text-slate-200 border border-slate-600/30 disabled:opacity-60"
            >
              <ChevronRightIcon size={18} />
              Pasar
            </button>
          </div>

          {mensaje && (
            <div
              className={`mt-6 rounded-xl px-5 py-4 text-lg font-semibold backdrop-blur border transition-all ${
                tipoMensaje === "ok"
                  ? "bg-green-500/20 text-green-300 border-green-500/30"
                  : tipoMensaje === "error"
                  ? "bg-red-500/20 text-red-300 border-red-500/30"
                  : "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
              }`}
            >
              <div className="flex items-center gap-2">
                {tipoMensaje === "ok" && <CheckIcon size={20} />}
                <span>{mensaje}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}