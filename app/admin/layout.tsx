"use client";

import { useAuth } from "@/context/AuthContext";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminLogin from "@/components/admin/AdminLogin";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user, token } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Si no está autenticado (y asumiendo que no tiene token local guardado)
  const hasLocalToken = typeof window !== 'undefined' && localStorage.getItem('token');
  
  if (!isAuthenticated && !hasLocalToken) {
    return <AdminLogin />;
  }

  // Si está autenticado pero no es admin
  // if (user && !user.is_admin) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-bezoli-dark text-white p-4 text-center">
  //       <div>
  //         <h1 className="text-4xl font-bold text-red-500 mb-4">Acceso Denegado</h1>
  //         <p>No tienes permisos de administrador para ver esta página.</p>
  //         <a href="/" className="inline-block mt-6 text-bezoli-green hover:underline">Volver a la tienda</a>
  //       </div>
  //     </div>
  //   );
  // }

  // En una app real podríamos poner un loader mientras fetchUser() verifica si el token es válido
  if (hasLocalToken && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bezoli-dark">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-bezoli-green"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-bezoli-dark overflow-hidden font-sans">
      <AdminSidebar />
      
      {/* Contenido principal */}
      <main className="flex-1 overflow-y-auto bg-nature-bg/30">
        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
