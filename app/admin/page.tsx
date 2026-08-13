'use client';
import { useState } from 'react';

export default function AdminPage() {
  // Blog Post State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('');
  const [readTime, setReadTime] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [blogMessage, setBlogMessage] = useState({ text: '', type: '' });
  const [blogLoading, setBlogLoading] = useState(false);

  // Inventory Upload State (dummy)
  const [inventoryFile, setInventoryFile] = useState<File | null>(null);
  const [inventoryMessage, setInventoryMessage] = useState({ text: '', type: '' });

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBlogLoading(true);
    setBlogMessage({ text: '', type: '' });

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          slug,
          category,
          read_time: readTime,
          image_url: imageUrl,
          summary,
          content,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Error al guardar el artículo');
      }

      setBlogMessage({ text: 'Artículo creado con éxito', type: 'success' });
      // Limpiar formulario
      setTitle('');
      setSlug('');
      setCategory('');
      setReadTime('');
      setImageUrl('');
      setSummary('');
      setContent('');
    } catch (err: any) {
      setBlogMessage({ text: err.message, type: 'error' });
    } finally {
      setBlogLoading(false);
    }
  };

  const handleInventorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inventoryFile) return;
    
    const formData = new FormData();
    formData.append('file', inventoryFile);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/inventory/upload?mode=upsert`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || 'Error');
      setInventoryMessage({ text: `Carga exitosa: ${data.created} creados, ${data.updated} actualizados.`, type: 'success' });
      setInventoryFile(null);
    } catch (err: any) {
      setInventoryMessage({ text: err.message, type: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-nature-bg pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8">Panel de Administración</h1>

        {/* Sección de Carga de Inventario */}
        <div className="bg-nature-dark rounded-xl p-8 mb-12 shadow-lg border border-nature-medium/30">
          <h2 className="text-2xl font-bold text-white mb-6">Carga de Inventario</h2>
          <form onSubmit={handleInventorySubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Archivo CSV o Excel</label>
              <input
                type="file"
                accept=".csv, .xlsx"
                onChange={(e) => setInventoryFile(e.target.files?.[0] || null)}
                className="w-full text-white bg-nature-bg border border-nature-medium rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-nature-accent"
              />
            </div>
            {inventoryMessage.text && (
              <div className={`p-3 rounded ${inventoryMessage.type === 'success' ? 'bg-green-900/50 text-green-200' : 'bg-bezoli-red/20 text-bezoli-red'}`}>
                {inventoryMessage.text}
              </div>
            )}
            <button
              type="submit"
              disabled={!inventoryFile}
              className="bg-nature-light hover:bg-nature-medium text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              Cargar Inventario
            </button>
          </form>
        </div>

        <hr className="border-nature-medium/50 mb-12" />

        {/* Gestor de Blog */}
        <div className="bg-nature-dark rounded-xl p-8 shadow-lg border border-nature-medium/30">
          <h2 className="text-2xl font-bold text-white mb-6">Gestor de Blog</h2>
          
          <form onSubmit={handleBlogSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Título</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-nature-bg text-white border border-nature-medium rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-nature-accent"
                  placeholder="Ej: Guía de Nepenthes"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Slug</label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full bg-nature-bg text-white border border-nature-medium rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-nature-accent"
                  placeholder="Ej: guia-nepenthes"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Categoría</label>
                <input
                  type="text"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-nature-bg text-white border border-nature-medium rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-nature-accent"
                  placeholder="Ej: Guías de Cultivo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Tiempo de Lectura</label>
                <input
                  type="text"
                  required
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  className="w-full bg-nature-bg text-white border border-nature-medium rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-nature-accent"
                  placeholder="Ej: 5 min"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">URL de la Imagen</label>
              <input
                type="text"
                required
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full bg-nature-bg text-white border border-nature-medium rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-nature-accent"
                placeholder="Ej: https://..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Resumen</label>
              <textarea
                required
                rows={2}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full bg-nature-bg text-white border border-nature-medium rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-nature-accent"
                placeholder="Breve descripción del artículo..."
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Contenido del Artículo (HTML/Texto)</label>
              <textarea
                required
                rows={10}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full bg-nature-bg text-white border border-nature-medium rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-nature-accent"
                placeholder="<p>El contenido va aquí...</p>"
              ></textarea>
            </div>

            {blogMessage.text && (
              <div className={`p-4 rounded-lg flex items-center gap-3 ${blogMessage.type === 'success' ? 'bg-green-900/50 text-green-200 border border-green-800' : 'bg-bezoli-red/20 text-bezoli-red border border-bezoli-red'}`}>
                {blogMessage.type === 'success' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
                {blogMessage.text}
              </div>
            )}

            <button
              type="submit"
              disabled={blogLoading}
              className="w-full bg-bezoli-green text-black hover:brightness-110 px-6 py-3 rounded-lg font-bold transition-colors shadow-lg flex justify-center items-center gap-2 disabled:opacity-50"
            >
              {blogLoading ? (
                <span>Publicando...</span>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                  Publicar Artículo
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
