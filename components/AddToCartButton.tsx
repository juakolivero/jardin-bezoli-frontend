"use client";

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';

interface AddToCartButtonProps {
  plant: {
    sku: string;
    name: string;
    price: number | string;
    stock_quantity: number;
  };
}

export default function AddToCartButton({ plant }: AddToCartButtonProps) {
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

  return (
    <button 
      onClick={handleAddToCart}
      disabled={plant.stock_quantity === 0}
      className={`w-full py-4 px-8 rounded-2xl text-white font-bold text-lg transition-all transform flex justify-center items-center gap-2 ${
        plant.stock_quantity > 0 
          ? (added ? 'bg-emerald-500 scale-95 shadow-inner' : 'bg-emerald-600 hover:bg-emerald-700 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-200') 
          : 'bg-neutral-300 cursor-not-allowed text-neutral-500'
      }`}
    >
      {plant.stock_quantity > 0 ? (
        added ? (
          <>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
            ¡Agregado al Carrito!
          </>
        ) : (
          <>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Agregar al Carrito
          </>
        )
      ) : (
        "Agotado"
      )}
    </button>
  );
}
