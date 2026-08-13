"use client";

import React, { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import CatalogFilter from '@/components/CatalogFilter';

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

export default function Catalogo() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para los filtros
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');

  useEffect(() => {
    const fetchPlants = async () => {
      setLoading(true);
      try {
        // Construimos la URL con los parámetros de consulta si existen
        const queryParams = new URLSearchParams();
        if (searchQuery) queryParams.append('q', searchQuery);
        if (category) queryParams.append('category', category);
        if (difficulty) queryParams.append('difficulty', difficulty);

        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/inventory${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('La API respondió con un error (Status ' + response.status + ')');
        }
        const data = await response.json();
        setPlants(data);
      } catch (err) {
        console.error(err);
        setError('No se pudo conectar con el servidor. Por favor, intenta más tarde.');
      } finally {
        setLoading(false);
      }
    };

    // Usar un debounce simple para evitar demasiadas llamadas a la API mientras se escribe
    const timeoutId = setTimeout(() => {
      fetchPlants();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, category, difficulty]);

  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-24 bg-nature-bg">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl md:text-6xl font-bold text-center text-nature-light mb-4 drop-shadow-md">
          Catálogo de Plantas
        </h1>
        <p className="text-center text-nature-accent text-lg mb-12">
          Encuentra la planta carnívora perfecta para ti
        </p>

        <CatalogFilter
          searchValue={searchQuery}
          categoryValue={category}
          difficultyValue={difficulty}
          onSearchChange={setSearchQuery}
          onCategoryChange={setCategory}
          onDifficultyChange={setDifficulty}
        />
        
        {loading && (
          <div className="flex justify-center items-center py-20">
            <p className="text-nature-light text-xl animate-pulse font-semibold">
              Cargando catálogo...
            </p>
          </div>
        )}

        {error && (
          <div className="flex justify-center items-center py-20">
            <div className="bg-red-950/40 border border-red-500 rounded-xl p-8 text-center max-w-lg shadow-[0_0_15px_rgba(239,68,68,0.2)]">
              <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h2 className="text-xl text-red-200 font-bold mb-2">Error de conexión</h2>
              <p className="text-red-300 text-md">{error}</p>
              <p className="text-red-400 text-sm mt-4 italic">
                Verifica que el servidor de Python (FastAPI) esté corriendo en el puerto 8000 y conectado a la base de datos PostgreSQL.
              </p>
            </div>
          </div>
        )}

        {!loading && !error && plants.length === 0 && (
          <div className="text-center text-nature-accent py-20">
            <p className="text-xl bg-nature-dark/50 inline-block px-8 py-4 rounded-xl border border-nature-medium">
              No hay plantas disponibles en el inventario por ahora con esos filtros.
            </p>
          </div>
        )}

        {!loading && !error && plants.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plants.map(plant => (
              <ProductCard key={plant.id} plant={plant} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
