"use client";

import React, { useState } from 'react';

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.nombre,
          email: formData.email,
          subject: formData.asunto,
          message: formData.mensaje
        }),
      });

      if (response.ok) {
        setSuccessMessage('¡Mensaje enviado con éxito! Te responderemos pronto.');
        setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
      } else {
        console.error('Error al enviar el formulario');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen text-neutral-100 py-16 px-4">
      {/* 1. Encabezado */}
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contacto</h1>
        <p className="text-neutral-400 text-lg md:text-xl">
          Estamos aquí para ayudarte. Escríbenos si tienes dudas sobre el cuidado de tus plantas, tu pedido o nuestras colecciones.
        </p>
      </div>

      {/* 2. Estructura principal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto mt-12">
        
        {/* 3. Columna Izquierda (Información) */}
        <div>
          <h3 className="text-2xl font-semibold mb-6">Atención al Cliente</h3>
          <div className="space-y-6">
            
            {/* WhatsApp */}
            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.969-1.385A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.327 15.36c-.23.649-1.127 1.21-1.611 1.258-.456.046-.948.118-2.923-.7-2.385-.989-3.923-3.41-4.04-3.568-.117-.156-.963-1.285-.963-2.454 0-1.17.607-1.745.823-1.98.217-.234.469-.292.624-.292.156 0 .311.002.448.008.143.006.335-.057.518.385.192.463.643 1.572.7 1.69.057.118.096.255.018.411-.078.156-.117.255-.234.392-.117.137-.245.295-.353.402-.118.117-.242.247-.11.477.132.228.587.973 1.255 1.574.863.776 1.597.983 1.828 1.096.23.113.364.094.502-.065.137-.158.59-.803.111-.962.136-.16.247-.74.27-1.222.029-.48-.023-.755-.228-.913z" />
              </svg>
              <div>
                <p className="font-medium text-neutral-300 mb-1">WhatsApp</p>
                <a href="https://wa.me/56979819931" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-green-400 transition-colors">
                  +56 9 7981 9931
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div>
                <p className="font-medium text-neutral-300 mb-1">Correo Electrónico</p>
                <a href="mailto:hola@jardinbezoli.cl" className="text-neutral-400 hover:text-green-400 transition-colors">
                  hola@jardinbezoli.cl
                </a>
              </div>
            </div>

            {/* Ubicación */}
            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <p className="font-medium text-neutral-300 mb-1">Ubicación</p>
                <p className="text-neutral-400 leading-relaxed">
                  Tienda 100% Online. Los retiros presenciales se realizan previa coordinación en Peñalolén, Santiago.
                </p>
              </div>
            </div>

            {/* Horario */}
            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-medium text-neutral-300 mb-1">Horario de Atención</p>
                <p className="text-neutral-400">
                  Lunes a Viernes de 10:00 a 18:00 hrs.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* 4. Columna Derecha (Formulario) */}
        <div className="bg-neutral-800 p-8 rounded-2xl border border-neutral-700/50 shadow-xl">
          {successMessage && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-center font-medium">
              {successMessage}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-neutral-300 mb-2">Nombre Completo</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="w-full bg-neutral-900/50 border border-neutral-700 rounded-lg px-4 py-3 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all"
                placeholder="Tu nombre"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-neutral-900/50 border border-neutral-700 rounded-lg px-4 py-3 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all"
                placeholder="tu@email.com"
              />
            </div>
            
            <div>
              <label htmlFor="asunto" className="block text-sm font-medium text-neutral-300 mb-2">Asunto</label>
              <input
                type="text"
                id="asunto"
                name="asunto"
                value={formData.asunto}
                onChange={handleChange}
                required
                className="w-full bg-neutral-900/50 border border-neutral-700 rounded-lg px-4 py-3 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all"
                placeholder="¿En qué te podemos ayudar?"
              />
            </div>
            
            <div>
              <label htmlFor="mensaje" className="block text-sm font-medium text-neutral-300 mb-2">Mensaje</label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                required
                rows={5}
                className="w-full bg-neutral-900/50 border border-neutral-700 rounded-lg px-4 py-3 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all resize-none"
                placeholder="Escribe tu mensaje aquí..."
              ></textarea>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-bezoli-green text-black hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
