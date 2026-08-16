"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  isOutOfStock: boolean;
}

export default function ProductGallery({ images, productName, isOutOfStock }: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (images.length === 0) return null;

  return (
    <div className="flex flex-col h-full bg-neutral-100 w-full">
      {/* Main Image */}
      <div className="relative h-80 sm:h-96 lg:h-[500px] group overflow-hidden bg-neutral-200">
        <Image
          src={images[currentIndex]}
          alt={`${productName} - Imagen ${currentIndex + 1}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={currentIndex === 0}
        />
        
        {/* Out of Stock Badge */}
        {isOutOfStock && (
          <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg uppercase tracking-wide z-10">
            Agotado
          </div>
        )}

        {/* Navigation Arrows (only if more than 1 image) */}
        {images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-neutral-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all z-10"
              aria-label="Imagen anterior"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-neutral-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all z-10"
              aria-label="Siguiente imagen"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 p-4 overflow-x-auto bg-neutral-50/50">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative h-20 w-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                currentIndex === idx ? 'border-emerald-500 shadow-md scale-105' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={img}
                alt={`Miniatura ${idx + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
