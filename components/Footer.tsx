import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0b1f13] text-gray-300 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1: Marca */}
          <div className="flex flex-col space-y-4">
            <h2 className="text-white text-2xl font-bold tracking-tight">Jardin Bezoli</h2>
            <p className="text-gray-400 leading-relaxed text-sm">
              Especialistas en el cultivo de especies fascinantes.
            </p>
          </div>

          {/* Column 2: Enlaces Rápidos */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-white text-lg font-semibold">Enlaces Rápidos</h3>
            <ul className="flex flex-col space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-green-400 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/insumos" className="hover:text-green-400 transition-colors">
                  Insumos
                </Link>
              </li>
              <li>
                <Link href="/sobre-nosotros" className="hover:text-green-400 transition-colors">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link href="/politicas-de-envio" className="hover:text-green-400 transition-colors">
                  Políticas de Envío
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Ubicación y Contacto */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-white text-lg font-semibold">Contacto</h3>
            <ul className="flex flex-col space-y-2 text-sm text-gray-400">
              <li>
                <a href="mailto:hola@jardinbezoli.cl" className="hover:text-green-400 transition-colors">
                  hola@jardinbezoli.cl
                </a>
              </li>
              <li>Peñalolén, Santiago</li>
            </ul>
          </div>

          {/* Column 4: Comunidad */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-white text-lg font-semibold">Comunidad</h3>
            <div className="flex items-center space-x-4">
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 bg-gray-800/50 rounded-full hover:bg-green-600 hover:text-white transition-all duration-300"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 bg-gray-800/50 rounded-full hover:bg-green-600 hover:text-white transition-all duration-300"
                aria-label="TikTok"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Barra inferior */}
        <div className="pt-8 border-t border-gray-800/60 flex flex-col items-center">
          <p className="text-xs text-gray-500">
            © 2026 Jardin Bezoli. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
