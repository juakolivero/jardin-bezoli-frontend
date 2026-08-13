"use client";

import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import AuthModal from "./AuthModal";

export default function Header() {
  const { getCartCount, setIsCartOpen } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const count = getCartCount();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 w-full bg-[#C4D68B] shadow-sm text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo (Left) */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-bold tracking-tight text-gray-900">
              Jardin <span className="text-gray-700">Bezoli</span>
            </span>
          </Link>

          {/* Navigation Links (Center) */}
          <nav className="hidden md:flex items-center gap-8 font-medium">
            <Link href="/" className="hover:text-gray-900 transition-colors">Inicio</Link>
            
            {/* Dropdown for Plantas Carnívoras */}
            <div className="relative group py-6">
              <Link href="/catalogo" className="flex items-center gap-1 hover:text-gray-900 transition-colors">
                Plantas Carnívoras
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              
              <div className="absolute top-[80%] left-0 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-40 bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
                <div className="py-2 flex flex-col">
                  <Link href="/categoria/venus-atrapamoscas" className="px-4 py-2 text-sm text-gray-700 hover:bg-[#C4D68B]/30 hover:text-gray-900 transition-colors">Venus Atrapamoscas</Link>
                  <Link href="/categoria/droseras" className="px-4 py-2 text-sm text-gray-700 hover:bg-[#C4D68B]/30 hover:text-gray-900 transition-colors">Droseras</Link>
                  <Link href="/categoria/sarracenias" className="px-4 py-2 text-sm text-gray-700 hover:bg-[#C4D68B]/30 hover:text-gray-900 transition-colors">Sarracenias</Link>
                  <Link href="/categoria/pinguiculas" className="px-4 py-2 text-sm text-gray-700 hover:bg-[#C4D68B]/30 hover:text-gray-900 transition-colors">Pinguículas</Link>
                  <Link href="/categoria/otras" className="px-4 py-2 text-sm text-gray-700 hover:bg-[#C4D68B]/30 hover:text-gray-900 transition-colors">Otras</Link>
                </div>
              </div>
            </div>

            {/* Dropdown for Insumos */}
            <div className="relative group py-6">
              <Link href="/categoria/insumos" className="flex items-center gap-1 hover:text-gray-900 transition-colors">
                Insumos
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              
              <div className="absolute top-[80%] left-0 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-40 bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
                <div className="py-2 flex flex-col">
                  <Link href="/categoria/maceteros" className="px-4 py-2 text-sm text-gray-700 hover:bg-[#C4D68B]/30 hover:text-gray-900 transition-colors">Maceteros</Link>
                  <Link href="/categoria/sustratos" className="px-4 py-2 text-sm text-gray-700 hover:bg-[#C4D68B]/30 hover:text-gray-900 transition-colors">Sustratos</Link>
                </div>
              </div>
            </div>
            <Link href="/sobre-nosotros" className="hover:text-gray-900 transition-colors">Sobre nosotros</Link>
            <Link href="/contacto" className="hover:text-gray-900 transition-colors">Contacto</Link>
            <Link href="/blog" className="hover:text-gray-900 transition-colors">Blog</Link>
          </nav>

          {/* Icons (Right) */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-black/10 rounded-full transition-colors" aria-label="Buscar">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-gray-800">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
            {/* User Account / Auth */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center gap-2 p-2 hover:bg-black/10 rounded-full transition-colors font-medium text-sm">
                  <span className="hidden sm:block truncate max-w-[100px]">{user?.full_name.split(' ')[0]}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-gray-800">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </button>
                <div className="absolute top-[100%] right-0 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-40 bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 mt-2">
                  <div className="py-2 flex flex-col">
                    <div className="px-4 py-2 border-b border-gray-100 text-sm">
                      <p className="font-semibold text-gray-900 truncate">{user?.full_name}</p>
                      <p className="text-gray-500 truncate text-xs">{user?.email}</p>
                    </div>
                    <button 
                      onClick={logout}
                      className="text-left w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="p-2 hover:bg-black/10 rounded-full transition-colors flex items-center gap-2" 
                aria-label="Cuenta"
              >
                <span className="hidden sm:block text-sm font-medium">Ingresar</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-gray-800">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </button>
            )}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-black/10 rounded-full transition-colors" aria-label="Carrito"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-gray-800">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              {count > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center transform translate-x-1 -translate-y-1">
                  {count}
                </span>
              )}
            </button>
          </div>
          
        </div>
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </header>
  );
}
