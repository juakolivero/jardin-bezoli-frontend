"use client";
import { Package, FileText, TrendingUp, Users } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { name: "Total Plantas", value: "124", icon: Package, color: "text-blue-400", bg: "bg-blue-400/10" },
    { name: "Artículos Blog", value: "12", icon: FileText, color: "text-bezoli-green", bg: "bg-bezoli-green/10" },
    { name: "Visitas Mes", value: "3.4k", icon: TrendingUp, color: "text-purple-400", bg: "bg-purple-400/10" },
    { name: "Usuarios", value: "89", icon: Users, color: "text-orange-400", bg: "bg-orange-400/10" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Panel de Control</h1>
        <p className="text-gray-400">Bienvenido al sistema de gestión de Jardín Bezoli.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-nature-dark/80 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden group"
            >
              {/* Glass reflection effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <p className="text-sm font-medium text-gray-400 mb-1">{stat.name}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
                <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-nature-dark/80 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl">
          <h3 className="text-xl font-bold text-white mb-4">Accesos Rápidos</h3>
          <div className="grid grid-cols-2 gap-4">
            <a href="/admin/inventory" className="flex flex-col items-center justify-center p-6 bg-black/20 rounded-xl border border-white/5 hover:border-bezoli-green/50 hover:bg-bezoli-green/5 transition-all group">
              <Package size={32} className="text-gray-400 group-hover:text-bezoli-green mb-3 transition-colors" />
              <span className="text-gray-300 font-medium">Gestionar Inventario</span>
            </a>
            <a href="/admin/blog" className="flex flex-col items-center justify-center p-6 bg-black/20 rounded-xl border border-white/5 hover:border-blue-400/50 hover:bg-blue-400/5 transition-all group">
              <FileText size={32} className="text-gray-400 group-hover:text-blue-400 mb-3 transition-colors" />
              <span className="text-gray-300 font-medium">Gestionar Blog</span>
            </a>
          </div>
        </div>

        <div className="bg-nature-dark/80 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl flex items-center justify-center min-h-[250px] relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1599598425947-330026206c69?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-20 filter grayscale blur-[2px]" />
            <div className="relative z-10 text-center">
              <h2 className="text-2xl font-bold text-white mb-2 shadow-black drop-shadow-md">Bezoli CMS v1.0</h2>
              <p className="text-gray-300 bg-black/40 px-4 py-1 rounded-full backdrop-blur-md">Todo funcionando correctamente</p>
            </div>
        </div>
      </div>
    </div>
  );
}
