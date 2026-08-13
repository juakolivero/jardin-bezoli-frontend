import React from "react";

export default function PrivacidadPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Política de Privacidad y Tratamiento de Datos</h1>
        
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Recopilación de Datos</h2>
            <p>
              Al crear una cuenta o realizar una compra, Jardin Bezoli recopila tu nombre, correo electrónico e historial de compras. Tu contraseña se almacena de forma encriptada y no tenemos acceso a ella.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Uso de la Información</h2>
            <p className="mb-2">Utilizamos tus datos exclusivamente para:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Procesar y enviar tus pedidos.</li>
              <li>Brindar soporte técnico o asesoría sobre el cuidado de las plantas adquiridas.</li>
              <li>Personalizar tu experiencia de navegación en nuestro sitio.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Consentimiento</h2>
            <p>
              Al marcar la casilla "Acepto la Política de Privacidad" en nuestro formulario, nos otorgas tu consentimiento explícito (registrado con fecha y hora en nuestro sistema) para el tratamiento de tus datos según la Ley N° 19.628 de Chile.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Seguridad Financiera</h2>
            <p>
              No almacenamos datos de tarjetas de crédito. Todas las transacciones son procesadas a través de pasarelas de pago externas seguras (ej. Mercado Pago).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Tus Derechos</h2>
            <p>
              Puedes solicitar en cualquier momento la modificación, acceso o eliminación definitiva de tus datos personales y cuenta escribiendo a <a href="mailto:hola@jardinbezoli.cl" className="text-blue-600 hover:underline">hola@jardinbezoli.cl</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
