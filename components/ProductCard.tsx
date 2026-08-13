"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

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
  light?: string | null;
  substrate_type?: string | null;
}

export default function ProductCard({ plant }: { plant: Plant }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      sku: plant.sku,
      name: plant.name,
      price: typeof plant.price === 'number' ? plant.price : parseFloat(plant.price as string),
      quantity: 1,
      image: `/images/plants/${plant.sku}.jpg`
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Construir una descripción dinámica basada en los cuidados
  let description = "Sin datos específicos de cuidado.";
  if (plant.min_temp_c !== null && plant.max_temp_c !== null) {
    description = `Temperatura ideal: ${plant.min_temp_c}°C a ${plant.max_temp_c}°C. `;
  }
  if (plant.min_humidity_percent !== null && plant.max_humidity_percent !== null) {
    description += `Humedad: ${plant.min_humidity_percent}% - ${plant.max_humidity_percent}%. `;
  }
  if (plant.light) {
    description += `\nLuz: ${plant.light}`;
  }
  if (plant.substrate_type) {
    description += `\nSustrato: ${plant.substrate_type}`;
  }

  // Usamos la imagen local basada en el SKU de la planta
  const imagePath = `/images/plants/${plant.sku}.jpg`;

  return (
    <div className="group relative rounded-2xl border border-nature-medium bg-nature-dark/50 p-6 overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(74,124,74,0.3)] hover:-translate-y-1 hover:border-nature-light backdrop-blur-sm flex flex-col h-full">
      <Link href={`/producto/${plant.sku}`} className="block relative h-48 w-full mb-4 rounded-xl overflow-hidden bg-nature-bg">
        <Image 
          src={imagePath} 
          alt={plant.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-nature-dark to-transparent opacity-60"></div>
        <div className="absolute top-2 right-2 bg-nature-dark/80 px-2 py-1 rounded text-xs text-nature-light font-mono border border-nature-medium">
          {plant.sku}
        </div>
      </Link>
      
      <div className="flex-grow flex flex-col">
        <Link href={`/producto/${plant.sku}`}>
          <h2 className="text-2xl font-semibold text-white mb-2 hover:text-nature-light transition-colors">{plant.name}</h2>
        </Link>
        <p className="text-nature-accent text-sm mb-4 flex-grow whitespace-pre-line">{description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <span className={`text-xs px-2 py-1 rounded ${plant.stock_quantity > 0 ? 'bg-green-900/50 text-green-300' : 'bg-bezoli-red/20 text-bezoli-red'} border ${plant.stock_quantity > 0 ? 'border-green-700' : 'border-bezoli-red'}`}>
            {plant.stock_quantity > 0 ? `${plant.stock_quantity} en stock` : 'Agotado'}
          </span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-nature-medium/50">
          <span className="text-xl font-bold text-nature-light">
            ${Math.round(typeof plant.price === 'number' ? plant.price : parseFloat(plant.price)).toLocaleString('es-CL')}
          </span>
          <button 
            disabled={plant.stock_quantity <= 0}
            onClick={handleAddToCart}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-nature-bg w-32 ${
              plant.stock_quantity > 0 
                ? (added ? 'bg-bezoli-green text-black brightness-110' : 'bg-bezoli-green text-black hover:brightness-110 active:scale-95 focus:ring-bezoli-green') 
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
          >
            {plant.stock_quantity > 0 ? (added ? 'Agregado ✓' : 'Comprar') : 'Sin Stock'}
          </button>
        </div>
      </div>
    </div>
  );
}
