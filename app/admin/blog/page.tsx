"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Plus, Edit2, Trash2, X, Image as ImageIcon, Loader2, RefreshCw } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  read_time: string;
  image_url: string;
  summary: string;
  content: string;
}

export default function BlogAdmin() {
  const { token } = useAuth();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({});
  const [isUploading, setIsUploading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`);
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/upload-image`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setCurrentPost({ ...currentPost, image_url: data.url });
      } else {
        alert(data.detail || "Error subiendo imagen");
      }
    } catch (err) {
      alert("Error subiendo imagen");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setFormLoading(true);
    setError("");

    const isEdit = !!currentPost.id;
    const url = isEdit 
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/admin/posts/${currentPost.slug}`
      : `${process.env.NEXT_PUBLIC_API_URL}/api/admin/posts`;
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(currentPost),
      });

      const data = await res.json();
      if (res.ok) {
        setIsModalOpen(false);
        fetchPosts();
      } else {
        setError(data.detail || "Error guardando el post");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!token || !window.confirm("¿Seguro que quieres eliminar este post?")) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/posts/${slug}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        fetchPosts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openModal = (post?: BlogPost) => {
    setCurrentPost(post || {
      title: "", slug: "", category: "", read_time: "", image_url: "", summary: "", content: ""
    });
    setError("");
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Gestión de Blog</h1>
          <p className="text-gray-400">Crea, edita o elimina artículos del blog.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetchPosts} className="p-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors border border-white/10">
            <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
          </button>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-bezoli-green text-bezoli-dark hover:brightness-110 px-4 py-2 rounded-lg font-semibold transition-all shadow-[0_0_15px_rgba(157,213,99,0.2)]"
          >
            <Plus size={20} />
            Nuevo Post
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-nature-dark/80 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="text-xs uppercase bg-black/40 text-gray-400 border-b border-white/10">
              <tr>
                <th className="px-6 py-4">Imagen</th>
                <th className="px-6 py-4">Título</th>
                <th className="px-6 py-4">Categoría</th>
                <th className="px-6 py-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading && posts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    <Loader2 size={32} className="animate-spin mx-auto mb-2 opacity-50" />
                    Cargando posts...
                  </td>
                </tr>
              ) : posts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">No hay artículos publicados.</td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-3">
                      {post.image_url ? (
                        <img src={post.image_url} alt={post.title} className="w-16 h-12 object-cover rounded-md bg-black/50" />
                      ) : (
                        <div className="w-16 h-12 bg-black/50 rounded-md flex items-center justify-center text-gray-600"><ImageIcon size={20} /></div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium text-white">{post.title}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-white/10 rounded-full text-xs">{post.category}</span>
                    </td>
                    <td className="px-6 py-4 flex items-center gap-3">
                      <button onClick={() => openModal(post)} className="text-blue-400 hover:text-blue-300 transition-colors p-1" title="Editar">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(post.slug)} className="text-red-400 hover:text-red-300 transition-colors p-1" title="Eliminar">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-3xl bg-nature-dark border border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-2xl font-bold text-white">{currentPost.id ? "Editar Post" : "Nuevo Post"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-5 flex-1 custom-scrollbar">
              {error && <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm">{error}</div>}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Título</label>
                  <input type="text" required value={currentPost.title || ""} onChange={(e) => setCurrentPost({...currentPost, title: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-bezoli-green" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Slug (URL)</label>
                  <input type="text" required value={currentPost.slug || ""} onChange={(e) => setCurrentPost({...currentPost, slug: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-bezoli-green" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Categoría</label>
                  <input type="text" required value={currentPost.category || ""} onChange={(e) => setCurrentPost({...currentPost, category: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-bezoli-green" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Tiempo de Lectura</label>
                  <input type="text" required value={currentPost.read_time || ""} onChange={(e) => setCurrentPost({...currentPost, read_time: e.target.value})} placeholder="Ej: 5 min" className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-bezoli-green" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Imagen Destacada</label>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  {currentPost.image_url && (
                    <img src={currentPost.image_url} alt="Preview" className="w-32 h-20 object-cover rounded-lg bg-black/50 border border-white/10" />
                  )}
                  <div className="flex-1 w-full">
                    <input type="text" placeholder="https://..." value={currentPost.image_url || ""} onChange={(e) => setCurrentPost({...currentPost, image_url: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-bezoli-green mb-2" />
                    <div className="relative">
                      <input type="file" accept="image/*" onChange={handleImageUpload} disabled={isUploading} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" />
                      <button type="button" disabled={isUploading} className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors border border-white/10">
                        {isUploading ? <Loader2 size={16} className="animate-spin" /> : <ImageIcon size={16} />}
                        {isUploading ? "Subiendo..." : "Subir desde dispositivo"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Resumen</label>
                <textarea required rows={2} value={currentPost.summary || ""} onChange={(e) => setCurrentPost({...currentPost, summary: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-bezoli-green resize-none" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Contenido (HTML)</label>
                <textarea required rows={8} value={currentPost.content || ""} onChange={(e) => setCurrentPost({...currentPost, content: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-bezoli-green font-mono text-sm" />
              </div>

            </form>
            <div className="p-6 border-t border-white/10 flex justify-end gap-3 bg-black/20 rounded-b-2xl">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
                Cancelar
              </button>
              <button type="button" onClick={handleSave} disabled={formLoading} className="flex items-center gap-2 bg-bezoli-green text-bezoli-dark hover:brightness-110 px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg disabled:opacity-50">
                {formLoading ? <Loader2 size={20} className="animate-spin" /> : "Guardar Post"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
