"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';

interface Plant {
  id: string;
  sku: string;
  name: string;
  price: number;
  stock_quantity: number;
  status: string;
  min_humidity_percent: number | null;
  max_humidity_percent: number | null;
  min_temp_c: number | null;
  max_temp_c: number | null;
}

export default function Home() {
  const [featuredPlants, setFeaturedPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/inventory?limit=4`);
        if (!response.ok) throw new Error('API response was not ok');
        const data = await response.json();
        // Fallback to slice if the API doesn't support limit
        setFeaturedPlants(data.slice(0, 4));
      } catch (err) {
        console.error("Error fetching featured plants:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <main className="min-h-screen bg-neutral-900 text-neutral-100">
      
      {/* Sección 1: Hero Banner */}
      <section className="relative flex flex-col items-center justify-center min-h-[70vh] text-center p-6 bg-gradient-to-b from-neutral-900 to-neutral-800">
        <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none flex justify-center items-center">
          {/* Un patrón decorativo o círculo de fondo */}
          <div className="w-full max-w-4xl h-96 bg-green-500 rounded-full blur-[120px] mix-blend-overlay"></div>
        </div>
        <div className="relative z-10 max-w-4xl flex flex-col items-center gap-6">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600 drop-shadow-lg">
            Jardin Bezoli
          </h1>
          <p className="text-xl md:text-2xl text-neutral-300 max-w-2xl font-light">
            Plantas carnívoras extraordinarias. Especies cultivadas por expertos, listas para devorar insectos y decorar tu espacio.
          </p>
          <div className="mt-4">
            <Link 
              href="/catalogo"
              className="inline-block px-10 py-4 bg-bezoli-green text-black hover:brightness-110 font-bold text-lg rounded-full shadow-[0_0_20px_rgba(147,197,114,0.4)] transition-all transform hover:scale-105 active:scale-95"
            >
              Ver Catálogo Completo
            </Link>
          </div>
        </div>
      </section>

      {/* Sección 2: Propuesta de Valor (Beneficios) */}
      <section className="py-16 bg-neutral-950 border-y border-neutral-800">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          
          <div className="flex flex-col items-center p-6 bg-neutral-900/50 rounded-2xl border border-neutral-800 hover:border-green-500/50 transition-colors">
            <div className="w-16 h-16 bg-green-900/30 rounded-full flex items-center justify-center mb-4 text-green-400">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-neutral-100 mb-2">Cultivo Experto</h3>
            <p className="text-neutral-400">Asesoría incluida para que tus plantas crezcan fuertes y sanas.</p>
          </div>

          <div className="flex flex-col items-center p-6 bg-neutral-900/50 rounded-2xl border border-neutral-800 hover:border-green-500/50 transition-colors">
            <div className="w-16 h-16 bg-green-900/30 rounded-full flex items-center justify-center mb-4 text-green-400">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-neutral-100 mb-2">Pet Friendly</h3>
            <p className="text-neutral-400">Totalmente seguras para convivir con tus mascotas en casa.</p>
          </div>

          <div className="flex flex-col items-center p-6 bg-neutral-900/50 rounded-2xl border border-neutral-800 hover:border-green-500/50 transition-colors">
            <div className="w-16 h-16 bg-green-900/30 rounded-full flex items-center justify-center mb-4 text-green-400">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-neutral-100 mb-2">Envíos Seguros</h3>
            <p className="text-neutral-400">Embalaje especial para que lleguen en perfectas condiciones.</p>
          </div>

        </div>
      </section>

      {/* Sección 3: Comprar por Categoría */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">Explora nuestras colecciones</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <Link href="/categoria/venus-atrapamoscas" className="group relative h-80 rounded-2xl overflow-hidden bg-neutral-800 flex items-center justify-center border border-neutral-700 hover:border-green-500 transition-all">
            <div className="absolute inset-0 bg-gradient-to-t from-green-950/90 to-neutral-900/40 group-hover:from-green-900/90 transition-all"></div>
            <h3 className="relative z-10 text-3xl font-extrabold text-white group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
              Venus Atrapamoscas
            </h3>
          </Link>

          <Link href="/categoria/droseras" className="group relative h-80 rounded-2xl overflow-hidden bg-neutral-800 flex items-center justify-center border border-neutral-700 hover:border-green-500 transition-all">
            <div className="absolute inset-0 bg-gradient-to-t from-green-950/90 to-neutral-900/40 group-hover:from-green-900/90 transition-all"></div>
            <h3 className="relative z-10 text-3xl font-extrabold text-white group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
              Droseras
            </h3>
          </Link>

          <Link href="/categoria/pinguiculas" className="group relative h-80 rounded-2xl overflow-hidden bg-neutral-800 flex items-center justify-center border border-neutral-700 hover:border-green-500 transition-all">
            <div className="absolute inset-0 bg-gradient-to-t from-green-950/90 to-neutral-900/40 group-hover:from-green-900/90 transition-all"></div>
            <h3 className="relative z-10 text-3xl font-extrabold text-white group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
              Pinguículas
            </h3>
          </Link>

        </div>
      </section>

      {/* Sección 4: Especies Destacadas */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-neutral-800">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl md:text-5xl font-bold">Plantas Destacadas</h2>
          <Link href="/catalogo" className="text-green-400 hover:text-green-300 font-medium flex items-center gap-2 group">
            Ver todas
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
          </div>
        ) : featuredPlants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPlants.map((plant) => (
              <ProductCard key={plant.id} plant={plant} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-neutral-400 bg-neutral-800/50 rounded-2xl border border-neutral-700">
            No se pudieron cargar las plantas destacadas.
          </div>
        )}
      </section>

    </main>
  );
}
