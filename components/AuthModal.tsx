"use client";

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { login } = useAuth();
  const [isLoginView, setIsLoginView] = useState(true);
  
  // States para el formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLoginView) {
        // LOGICA DE LOGIN
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.detail || "Error al iniciar sesión");
        }
        
        const data = await res.json();
        login(data.access_token, data.user);
        onClose();
        
      } else {
        // LOGICA DE REGISTRO
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: fullName,
            email,
            password,
            terms_accepted: termsAccepted,
            privacy_accepted: privacyAccepted,
          }),
        });
        
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.detail || "Error al registrar usuario");
        }
        
        // Tras el registro exitoso, podemos logear automáticamente o ir a login
        setIsLoginView(true);
        setError("Registro exitoso. Ahora puedes iniciar sesión.");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isRegisterDisabled = !isLoginView && (!termsAccepted || !privacyAccepted);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {isLoginView ? "Iniciar Sesión" : "Crear Cuenta"}
          </h2>
          
          {error && (
            <div className={`p-3 mb-4 text-sm rounded-lg ${error.includes("exitoso") ? "bg-green-50 text-green-700" : "bg-bezoli-red/20 text-bezoli-red"}`}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLoginView && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                <input 
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C4D68B] focus:border-[#C4D68B] outline-none transition-all"
                  placeholder="Ej. Juan Pérez"
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
              <input 
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C4D68B] focus:border-[#C4D68B] outline-none transition-all"
                placeholder="tu@email.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
              <input 
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C4D68B] focus:border-[#C4D68B] outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            {!isLoginView && (
              <div className="space-y-3 mt-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-1 w-4 h-4 text-[#C4D68B] border-gray-300 rounded focus:ring-[#C4D68B]"
                  />
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                    Acepto los <Link href="/terminos" target="_blank" className="text-blue-600 hover:underline">Términos y Condiciones</Link>
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={privacyAccepted}
                    onChange={(e) => setPrivacyAccepted(e.target.checked)}
                    className="mt-1 w-4 h-4 text-[#C4D68B] border-gray-300 rounded focus:ring-[#C4D68B]"
                  />
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                    Acepto la <Link href="/privacidad" target="_blank" className="text-blue-600 hover:underline">Política de Privacidad</Link> y el tratamiento de mis datos
                  </span>
                </label>
              </div>
            )}

            <button 
              type="submit"
              disabled={loading || (isRegisterDisabled)}
              className="w-full bg-[#C4D68B] hover:bg-[#b0c473] text-gray-900 font-semibold py-3 rounded-lg transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 mt-2"
            >
              {loading ? "Procesando..." : (isLoginView ? "Entrar" : "Crear Cuenta")}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            {isLoginView ? (
              <p>
                ¿No tienes cuenta?{' '}
                <button 
                  onClick={() => { setIsLoginView(false); setError(""); }}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Regístrate
                </button>
              </p>
            ) : (
              <p>
                ¿Ya tienes cuenta?{' '}
                <button 
                  onClick={() => { setIsLoginView(true); setError(""); }}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Inicia Sesión
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
