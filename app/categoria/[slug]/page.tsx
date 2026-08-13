import React from 'react';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// 2. Lógica de mapeo de nombres
const slugToCategoryName: Record<string, string> = {
  'venus-atrapamoscas': 'Venus Atrapamoscas',
  'droseras': 'Drosera',
  'sarracenias': 'Sarracenia',
  'pinguiculas': 'Pinguicula',
  'otras': 'Otras',
  'plantas-carnivoras': 'Plantas Carnívoras',
  'maceteros': 'Maceteros',
  'sustratos': 'Sustratos',
  'insumos': 'Insumos'
};

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = params;
  
  const categoryName = slugToCategoryName[slug];
  
  if (!categoryName) {
    // Si no encontramos la categoría, redirigimos a 404
    notFound();
  }

  // 3. Fetch a la API
  let plants = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/inventory?category=${encodeURIComponent(categoryName)}`, { 
      cache: 'no-store' 
    });
    if (res.ok) {
      plants = await res.json();
    }
  } catch (error) {
    console.error("Error fetching plants for category:", error);
  }

  // 4 & 5. Diseño de la vista y Empty State
  return (
    <div className="min-h-screen bg-nature-bg py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
          Colección: {categoryName}
        </h1>
        
        {plants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {plants.map((plant: any) => (
              <ProductCard key={plant.id} plant={plant} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-nature-dark/30 rounded-2xl border border-nature-medium">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-nature-light mb-6">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            <h2 className="text-2xl font-semibold text-white mb-4 text-center">
              Próximamente agregaremos nuevas especies a esta colección
            </h2>
            <p className="text-nature-accent mb-8 text-center max-w-md">
              Estamos cultivando y preparando nuestras mejores plantas para ti. ¡Vuelve pronto para ver las novedades!
            </p>
            <Link 
              href="/" 
              className="px-6 py-3 bg-[#C4D68B] text-gray-900 font-bold rounded-lg hover:bg-[#b0c476] transition-colors"
            >
              Volver a la tienda
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
