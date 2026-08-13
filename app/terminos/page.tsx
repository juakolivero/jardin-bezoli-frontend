import React from "react";

export default function TerminosPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Términos y Condiciones de Jardin Bezoli</h1>
        
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">General</h2>
            <p>
              Las presentes condiciones regulan el uso de la tienda online Jardin Bezoli, ubicada en Peñalolén, Santiago. Al registrarte o comprar, aceptas estas condiciones.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Naturaleza de los Productos</h2>
            <p>
              Trabajamos con seres vivos. Las fotografías son referenciales; cada planta es única y puede presentar variaciones en tamaño, color o forma.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Stock y Precios</h2>
            <p>
              El inventario y los precios pueden sufrir modificaciones sin previo aviso. En caso de quiebre de stock posterior a una compra, nos contactaremos para ofrecer un reemplazo o la devolución del dinero.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Despachos y Retiros</h2>
            <p>
              Los retiros presenciales se realizan previa coordinación en Peñalolén. Los envíos a domicilio se procesan los días hábiles. El cliente es responsable de entregar una dirección válida.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Garantía y Devoluciones</h2>
            <p>
              Dada la naturaleza viva de las plantas carnívoras, no aplican devoluciones por "cambio de opinión" (derecho de retracto) una vez que la planta ha sido entregada en buenas condiciones. Si el producto llega dañado por el transporte, debes notificarlo en un plazo máximo de 24 horas con fotografías.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
