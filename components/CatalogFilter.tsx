"use client";

import React from 'react';

interface CatalogFilterProps {
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onDifficultyChange: (value: string) => void;
  searchValue: string;
  categoryValue: string;
  difficultyValue: string;
}

export default function CatalogFilter({
  onSearchChange,
  onCategoryChange,
  onDifficultyChange,
  searchValue,
  categoryValue,
  difficultyValue
}: CatalogFilterProps) {
  return (
    <div className="w-full max-w-5xl mx-auto mb-8 p-6 bg-nature-dark/80 backdrop-blur-md rounded-2xl border border-nature-medium shadow-lg">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Barra de búsqueda */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-nature-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-nature-medium rounded-xl leading-5 bg-nature-bg text-nature-light placeholder-nature-accent focus:outline-none focus:ring-2 focus:ring-nature-accent focus:border-nature-accent transition-colors sm:text-sm"
            placeholder="Buscar por nombre o SKU..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Filtro de Categoría */}
        <div className="md:w-48">
          <select
            className="block w-full pl-3 pr-10 py-3 border border-nature-medium rounded-xl bg-nature-bg text-nature-light focus:outline-none focus:ring-2 focus:ring-nature-accent focus:border-nature-accent transition-colors sm:text-sm appearance-none"
            value={categoryValue}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="">Todas las Categorías</option>
            <option value="Venus Atrapamoscas">Venus Atrapamoscas</option>
            <option value="Drosera">Drosera</option>
            <option value="Sarracenia">Sarracenia</option>
            <option value="Nepenthes">Nepenthes</option>
            <option value="Pinguicula">Pinguicula</option>
          </select>
        </div>

        {/* Filtro de Dificultad */}
        <div className="md:w-48">
          <select
            className="block w-full pl-3 pr-10 py-3 border border-nature-medium rounded-xl bg-nature-bg text-nature-light focus:outline-none focus:ring-2 focus:ring-nature-accent focus:border-nature-accent transition-colors sm:text-sm appearance-none"
            value={difficultyValue}
            onChange={(e) => onDifficultyChange(e.target.value)}
          >
            <option value="">Cualquier Dificultad</option>
            <option value="Fácil">Fácil</option>
            <option value="Media">Media</option>
            <option value="Difícil">Difícil</option>
          </select>
        </div>
      </div>
    </div>
  );
}
