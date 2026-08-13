"use client";

import React from "react";
import Image from "next/image";
import { useCart } from "../context/CartContext";

export default function CartSidebar() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    getCartTotal,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-nature-bg border-l border-nature-medium z-50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-nature-medium bg-nature-dark/30">
          <h2 className="text-xl font-semibold text-white">Tu Carrito</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-nature-light hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center text-nature-accent mt-10">
              <p>Tu carrito está vacío.</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-4 text-nature-light hover:text-white underline"
              >
                Seguir comprando
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.sku}
                className="flex gap-4 border border-nature-medium/50 bg-nature-dark/20 p-3 rounded-xl"
              >
                <div className="relative h-20 w-20 rounded-lg overflow-hidden flex-shrink-0 bg-black">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col flex-grow">
                  <div className="flex justify-between items-start">
                    <h3 className="text-white font-medium text-sm">
                      {item.name}
                    </h3>
                    <button
                      onClick={() => removeFromCart(item.sku)}
                      className="text-red-400 hover:text-red-300 transition-colors ml-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="text-nature-accent text-sm mt-1">
                    ${Math.round(item.price).toLocaleString('es-CL')}
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <div className="flex items-center border border-nature-medium rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.sku, item.quantity - 1)}
                        className="px-2 py-1 bg-nature-dark text-white hover:bg-nature-medium transition-colors"
                      >
                        -
                      </button>
                      <span className="px-3 text-sm text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.sku, item.quantity + 1)}
                        className="px-2 py-1 bg-nature-dark text-white hover:bg-nature-medium transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-nature-medium bg-nature-dark/50">
            <div className="flex justify-between text-white font-semibold mb-6 text-lg">
              <span>Subtotal</span>
              <span>${Math.round(getCartTotal()).toLocaleString('es-CL')}</span>
            </div>
            <button
              onClick={() => {
                console.log("Comprando:", cart);
                alert("Redirigiendo a Mercado Pago... (Simulación)");
              }}
              className="w-full bg-[#009EE3] hover:bg-[#0089C7] text-white py-3 rounded-xl font-semibold transition-colors shadow-lg flex justify-center items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="2" y1="10" x2="22" y2="10"></line>
              </svg>
              Ir a Pagar con Mercado Pago
            </button>
          </div>
        )}
      </div>
    </>
  );
}
