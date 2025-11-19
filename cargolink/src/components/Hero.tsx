import hero from "../assets/hero.png";
import { Link } from "react-router-dom";
import { RUTAS } from "../data/rutas";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import AOS from "aos";
import "aos/dist/aos.css";

function SeccionHero() {
  const truckRef = useRef(null);
  const frontLightRef = useRef(null);

  useEffect(() => {
    // Inicializar AOS
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 100,
    });

    const truck = truckRef.current;
    const frontLight = frontLightRef.current;

    const tl = gsap.timeline({ repeat: 0 });

    // Entrada (arriba-derecha a centro)
    tl.fromTo(
      truck,
      { x: "100vw", y: "-100vh", opacity: 0 },
      { x: 0, y: 0, opacity: 1, duration: 2, ease: "power2.out" }
    )
      // Iluminación frontal
      .to(frontLight, { opacity: 0.6, duration: 0.2 })
      .to(frontLight, { opacity: 0, duration: 0.2, delay: 0.8 })

      // Se detiene un segundo
      .to(truck, { duration: 1 })

      // Parpadeo
      .to(frontLight, { opacity: 0.5, duration: 0.15, repeat: 5, yoyo: true })

    return () => {
      tl.kill();
    };
  }, []);
  return (
    <section className="max-w-6xl w-full px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center overflow-hidden">
      <div className="space-y-6">
        <h1
          className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight"
          data-aos="zoom-in" // 👈 Efecto zoom-in para el título
          data-aos-delay="200" // 👈 Pequeño delay para mejor timing
        >
          Logística con Tecnología
        </h1>
        <p
          className="text-slate-300 max-w-xl"
          data-aos="zoom-in" // 👈 Efecto zoom-in para el párrafo
          data-aos-delay="400" // 👈 Delay mayor para efecto escalonado
        >
          Automatizamos la Gestión de tu Flota con precisión absoluta, para que
          tu Servicio de Transporte alcance la excelencia operativa
        </p>
        <div
          className="flex gap-4"
          data-aos="zoom-in" // 👈 Efecto zoom-in para los botones
          data-aos-delay="600" // 👈 Delay mayor para el último elemento
        >
          <Link
            className="inline-flex items-center gap-2 px-5 py-3 bg-cyan-400 text-black font-semibold rounded shadow hover:scale-[1.02] hover:-translate-y-[5px] hover:shadow-[0_10px_30px_rgba(255,255,255,0.3)] transition-all duration-300"
            to={RUTAS.SIGNUP}
          >
            Comenzar
          </Link>
        </div>
      </div>

      <div className="relative flex items-center justify-center">
        <div className="relative" ref={truckRef}>
          {/* Camión */}
          <img
            src={hero}
            alt="truck-hero"
            className="w-full h-auto rounded-2xl object-cover"
          />

          {/* 🔦 LUZ FRONTAL */}
          <div
            ref={frontLightRef}
            className="absolute bottom-[8%] left-[5%] w-[20%] h-[5%] bg-yellow-50 opacity-0 blur-sm rounded-full rotate-[24deg]"
          />
        </div>
      </div>
    </section>
  );
}

export default SeccionHero;