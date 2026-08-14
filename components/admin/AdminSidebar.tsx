"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, FileText, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Inventario", href: "/admin/inventory", icon: Package },
    { name: "Blog", href: "/admin/blog", icon: FileText },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden bg-nature-dark border-b border-white/10 p-4 flex justify-between items-center shrink-0">
        <h2 className="text-xl font-bold bg-gradient-to-r from-bezoli-green to-emerald-400 bg-clip-text text-transparent">
          Bezoli Admin
        </h2>
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white p-2">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-[110] w-64 bg-nature-dark border-r border-white/10 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } lg:static lg:inset-0 lg:z-auto`}
      >
        <div className="p-6 hidden lg:block">
          <h2 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
            <span className="bg-bezoli-green text-nature-dark p-1.5 rounded-lg">
              <Package size={20} strokeWidth={3} />
            </span>
            Admin
          </h2>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-bezoli-green/20 text-bezoli-green font-semibold shadow-inner border border-bezoli-green/30"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={20} className={isActive ? "text-bezoli-green" : "opacity-70"} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => logout()}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-400/10 hover:text-red-300 rounded-xl transition-colors"
          >
            <LogOut size={20} />
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[105] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
