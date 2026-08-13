"use client";

import Link from 'next/link';
import { Thermometer, Droplets, BookOpen, Leaf } from 'lucide-react';

export default function SobreNosotros() {
  return (
    <div className="bg-nature-bg min-h-screen text-gray-100">
      {/* 1. Sección Hero */}
      <section className="py-20 px-4 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white tracking-tight">
          De la fascinación al cultivo experto.
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          En Jardin Bezoli no solo vendemos plantas; compartimos una pasión por las especies más extraordinarias de la naturaleza.
        </p>
      </section>

      {/* 2. Sección: Nuestros Inicios */}
      <section className="py-16 px-4 bg-nature-dark/30">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold mb-6 text-nature-accent">El Origen</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Todo comenzó con una fascinación profunda por la botánica inusual, dedicando horas al estudio y cultivo de variedades complejas del género Nepenthes. Lo que empezó como un desafío personal por replicar microclimas y entender los requerimientos biológicos exactos de estas especies, rápidamente se transformó en un vivero especializado.
            </p>
          </div>
          <div className="order-1 md:order-2">
            {/* Marcador visual para foto */}
            <div className="aspect-square bg-nature-medium/50 rounded-2xl flex flex-col items-center justify-center border border-nature-light/30 shadow-lg relative overflow-hidden group">
               <div className="absolute inset-0 bg-nature-light/10 group-hover:bg-transparent transition-colors duration-500"></div>
               <Leaf className="w-16 h-16 text-nature-accent opacity-50 mb-4" />
               <span className="text-sm text-nature-accent/70 font-medium">Foto de los cultivos</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Sección: Nuestro Propósito */}
      <section className="py-20 px-4 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-nature-accent">Nuestra Misión</h2>
        <p className="text-gray-300 text-lg leading-relaxed">
          Queremos derribar el mito de que las plantas carnívoras son &apos;imposibles de cuidar&apos;. Creemos que con la información correcta, el sustrato adecuado y plantas aclimatadas desde el primer día, cualquier persona puede disfrutar del espectáculo que ofrecen estas cazadoras naturales en su propio hogar.
        </p>
      </section>

      {/* 4. Sección: El Compromiso */}
      <section className="py-16 px-4 bg-nature-dark/30 border-y border-nature-medium/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">Filosofía de Cultivo</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Columna 1 */}
            <div className="bg-nature-bg/80 p-8 rounded-xl border border-nature-medium/50 hover:border-nature-light transition-all duration-300 hover:shadow-[0_0_20px_rgba(74,124,74,0.15)] group">
              <div className="bg-nature-dark w-14 h-14 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Thermometer className="w-7 h-7 text-nature-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">Aclimatación Local</h3>
              <p className="text-gray-400 leading-relaxed">
                Cultivamos nuestras plantas en Peñalolén, Santiago, asegurando que estén adaptadas al clima central antes de llegar a tus manos.
              </p>
            </div>

            {/* Columna 2 */}
            <div className="bg-nature-bg/80 p-8 rounded-xl border border-nature-medium/50 hover:border-nature-light transition-all duration-300 hover:shadow-[0_0_20px_rgba(74,124,74,0.15)] group">
              <div className="bg-nature-dark w-14 h-14 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Droplets className="w-7 h-7 text-nature-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">Sustratos Premium</h3>
              <p className="text-gray-400 leading-relaxed">
                Preparamos nuestras propias mezclas exactas de turba rubia y perlita para garantizar el desarrollo de raíces sanas.
              </p>
            </div>

            {/* Columna 3 */}
            <div className="bg-nature-bg/80 p-8 rounded-xl border border-nature-medium/50 hover:border-nature-light transition-all duration-300 hover:shadow-[0_0_20px_rgba(74,124,74,0.15)] group">
              <div className="bg-nature-dark w-14 h-14 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-7 h-7 text-nature-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">Acompañamiento</h3>
              <p className="text-gray-400 leading-relaxed">
                Tu éxito es el nuestro. Te entregamos todos los parámetros técnicos de luz, humedad y temperatura para que tu planta prospere.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Sección de Cierre */}
      <section className="py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto bg-nature-dark rounded-3xl p-12 border border-nature-light/20 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-nature-accent to-transparent opacity-50"></div>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white relative z-10">¿Listo para empezar tu colección?</h2>
          <Link 
            href="/catalogo"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-nature-bg bg-nature-accent rounded-full hover:bg-nature-light hover:text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,157,119,0.4)] relative z-10"
          >
            Explorar el Catálogo
          </Link>
          
          {/* Decorative background elements for the CTA card */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-nature-light/10 rounded-full blur-2xl group-hover:bg-nature-accent/20 transition-colors duration-700"></div>
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-nature-light/10 rounded-full blur-2xl group-hover:bg-nature-accent/20 transition-colors duration-700"></div>
        </div>
      </section>
    </div>
  );
}
