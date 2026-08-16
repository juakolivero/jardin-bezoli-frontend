"use client";

import { useState, useRef, MouseEvent } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Settings, Check, X, Move } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  isOutOfStock: boolean;
  sku?: string;
  initialMetadata?: string | null;
}

interface ImageMeta {
  fit?: "cover" | "contain";
  pos?: string; // "50% 50%"
}

export default function ProductGallery({ images, productName, isOutOfStock, sku, initialMetadata }: ProductGalleryProps) {
  const { token, user } = useAuth();
  const isAdmin = user?.is_admin && token && sku;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Parse initial metadata if exists
  const parsedMeta: Record<number, ImageMeta> = initialMetadata ? JSON.parse(initialMetadata) : {};
  const [metadata, setMetadata] = useState<Record<number, ImageMeta>>(parsedMeta);

  // Dragging state
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  const currentMeta = metadata[currentIndex] || { fit: "cover", pos: "50% 50%" };

  const handleMouseDown = (e: MouseEvent) => {
    if (!editMode || currentMeta.fit === "contain") return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !editMode || currentMeta.fit === "contain") return;
    
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    
    const [px, py] = (currentMeta.pos || "50% 50%").split(' ').map(p => parseFloat(p));
    
    // Invert delta: moving mouse down moves image up (so percentage goes down)
    // 0.2 multiplier is a sensitivity factor
    let newX = px - (dx * 0.15);
    let newY = py - (dy * 0.15);
    
    newX = Math.max(0, Math.min(100, newX));
    newY = Math.max(0, Math.min(100, newY));
    
    updateCurrentMeta({ pos: `${newX.toFixed(1)}% ${newY.toFixed(1)}%` });
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => setIsDragging(false);

  const updateCurrentMeta = (newValues: Partial<ImageMeta>) => {
    setMetadata(prev => ({
      ...prev,
      [currentIndex]: { ...currentMeta, ...newValues }
    }));
  };

  const toggleFit = () => {
    updateCurrentMeta({ fit: currentMeta.fit === "contain" ? "cover" : "contain" });
  };

  const saveMetadata = async () => {
    if (!token || !sku) return;
    setIsSaving(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/inventory/${sku}/metadata`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ image_metadata: JSON.stringify(metadata) })
      });
      if (res.ok) {
        setEditMode(false);
      } else {
        alert("Error guardando configuración");
      }
    } catch (err) {
      alert("Error de red");
    } finally {
      setIsSaving(false);
    }
  };

  if (images.length === 0) return null;

  return (
    <div className="flex flex-col h-full w-full bg-neutral-100 relative">
      
      {/* Admin Floating Toolbar */}
      {isAdmin && !editMode && (
        <button 
          onClick={() => setEditMode(true)}
          className="absolute top-4 right-4 z-20 bg-black/70 hover:bg-black text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center shadow-lg transition-colors"
        >
          <Settings size={16} className="mr-2" />
          Ajustar Imagen
        </button>
      )}

      {editMode && (
        <div className="absolute top-4 left-0 right-0 px-4 z-20 flex justify-between items-start pointer-events-none">
          {/* Controls */}
          <div className="bg-white p-3 rounded-xl shadow-xl border border-neutral-200 pointer-events-auto flex flex-col gap-2">
            <p className="text-xs font-bold text-neutral-500 uppercase">Modo Edición</p>
            <button 
              onClick={toggleFit}
              className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs px-3 py-2 rounded-lg font-medium transition-colors"
            >
              {currentMeta.fit === "contain" ? "Cambiar a Rellenar (Cover)" : "Cambiar a Mostrar Completa"}
            </button>
            {currentMeta.fit !== "contain" && (
              <p className="text-xs text-neutral-500 flex items-center">
                <Move size={12} className="mr-1" /> Arrastra la foto para encuadrar
              </p>
            )}
          </div>
          
          {/* Save/Cancel */}
          <div className="flex gap-2 pointer-events-auto">
            <button 
              onClick={() => { setMetadata(parsedMeta); setEditMode(false); }}
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg shadow-lg transition-colors"
              title="Cancelar"
            >
              <X size={20} />
            </button>
            <button 
              onClick={saveMetadata}
              disabled={isSaving}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium shadow-lg transition-colors flex items-center"
            >
              <Check size={20} className="mr-1" />
              {isSaving ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </div>
      )}

      {/* Main Image */}
      <div 
        className={`relative h-80 sm:h-96 lg:flex-1 lg:h-auto group overflow-hidden bg-neutral-200 ${editMode && currentMeta.fit !== 'contain' ? 'cursor-move' : ''}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        // Touch events for mobile dragging
        onTouchStart={(e) => {
          if (!editMode || currentMeta.fit === "contain") return;
          setIsDragging(true);
          setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
        }}
        onTouchMove={(e) => {
          if (!isDragging || !editMode || currentMeta.fit === "contain") return;
          // prevent scrolling while dragging image
          if (e.cancelable) e.preventDefault(); 
          const dx = e.touches[0].clientX - dragStart.x;
          const dy = e.touches[0].clientY - dragStart.y;
          const [px, py] = (currentMeta.pos || "50% 50%").split(' ').map(p => parseFloat(p));
          let newX = px - (dx * 0.15);
          let newY = py - (dy * 0.15);
          newX = Math.max(0, Math.min(100, newX));
          newY = Math.max(0, Math.min(100, newY));
          updateCurrentMeta({ pos: `${newX.toFixed(1)}% ${newY.toFixed(1)}%` });
          setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
        }}
        onTouchEnd={handleMouseUp}
      >
        <Image
          src={images[currentIndex]}
          alt={`${productName} - Imagen ${currentIndex + 1}`}
          fill
          style={{ 
            objectFit: currentMeta.fit || "cover", 
            objectPosition: currentMeta.pos || "50% 50%" 
          }}
          className={`transition-transform duration-700 ${editMode ? '' : 'group-hover:scale-105'} pointer-events-none`}
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={currentIndex === 0}
        />
        
        {/* Grid Overlay during edit mode */}
        {editMode && currentMeta.fit !== "contain" && (
          <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 opacity-50 transition-opacity">
            <div className="border-r border-b border-white/70"></div>
            <div className="border-r border-b border-white/70"></div>
            <div className="border-b border-white/70"></div>
            <div className="border-r border-b border-white/70"></div>
            <div className="border-r border-b border-white/70"></div>
            <div className="border-b border-white/70"></div>
            <div className="border-r border-white/70"></div>
            <div className="border-r border-white/70"></div>
            <div></div>
          </div>
        )}
        
        {/* Out of Stock Badge */}
        {isOutOfStock && !editMode && (
          <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg uppercase tracking-wide z-10">
            Agotado
          </div>
        )}

        {/* Navigation Arrows (only if more than 1 image) */}
        {images.length > 1 && !editMode && (
          <>
            <button 
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-neutral-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all z-10"
              aria-label="Imagen anterior"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
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
