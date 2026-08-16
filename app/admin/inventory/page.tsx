"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Plus, Edit2, Trash2, X, RefreshCw, Loader2, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

interface InventoryItem {
  id?: string;
  sku: string;
  name: string;
  price: number;
  stock_quantity: number;
  status: string;
  description?: string;
  category?: string;
  difficulty?: string;
  image_url?: string;
  substrate_type?: string;
  min_humidity_percent?: number;
  max_humidity_percent?: number;
  min_temp_c?: number;
  max_temp_c?: number;
  sunlight_notes?: string;
  light?: string;
  material?: string;
  dimensions?: string;
  volume?: string;
}

export default function InventoryAdmin() {
  const { token } = useAuth();
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Partial<InventoryItem>>({});
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  
  // Bulk Upload state
  const [bulkFile, setBulkFile] = useState<File | null>(null);
  const [bulkMode, setBulkMode] = useState("upsert");
  const [isBulkUploading, setIsBulkUploading] = useState(false);

  // Sorting state
  const [sortConfig, setSortConfig] = useState<{ key: keyof InventoryItem, direction: 'asc' | 'desc' } | null>(null);

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/inventory`);
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setFormLoading(true);
    setError("");

    const url = isEditMode
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/admin/inventory/${currentItem.sku}`
      : `${process.env.NEXT_PUBLIC_API_URL}/api/admin/inventory`;
    const method = isEditMode ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(currentItem),
      });

      const data = await res.json();
      if (res.ok) {
        setIsModalOpen(false);
        fetchInventory();
      } else {
        setError(data.detail || "Error guardando el producto");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (sku: string) => {
    if (!token || !window.confirm("¿Estás seguro de eliminar este producto y todos sus atributos?")) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/inventory/${sku}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        fetchInventory();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;

    setIsUploadingImage(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/upload-image`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setCurrentItem({ ...currentItem, image_url: data.url });
      } else {
        alert(data.detail || "Error subiendo imagen");
      }
    } catch (err) {
      alert("Error subiendo imagen");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleBulkUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulkFile || !token) return;
    
    setIsBulkUploading(true);
    const formData = new FormData();
    formData.append("file", bulkFile);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/inventory/upload?mode=${bulkMode}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        alert(`Carga exitosa.\nCreados: ${data.created}\nActualizados: ${data.updated}\nEliminados: ${data.deleted}`);
        setBulkFile(null);
        fetchInventory();
      } else {
        alert(data.detail || "Error en carga masiva");
      }
    } catch (err) {
      alert("Error de red durante la carga");
    } finally {
      setIsBulkUploading(false);
    }
  };

  const openModal = (item?: InventoryItem) => {
    if (item) {
      setCurrentItem(item);
      setIsEditMode(true);
    } else {
      setCurrentItem({
        sku: "", name: "", price: 0, stock_quantity: 0, status: "disponible"
      });
      setIsEditMode(false);
    }
    setError("");
    setIsModalOpen(true);
  };

  // Fast stock update helper
  const updateStock = async (sku: string, newStock: number, fullItem: InventoryItem) => {
    if (!token) return;
    try {
      const updatedItem = { ...fullItem, stock_quantity: newStock };
      setItems(items.map(i => i.sku === sku ? updatedItem : i)); // optimistic UI
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/inventory/${sku}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedItem),
      });
      
      if (!res.ok) {
        fetchInventory(); // revert if failed
      }
    } catch (err) {
      fetchInventory();
    }
  };

  const handleSort = (key: keyof InventoryItem) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedItems = [...items].sort((a, b) => {
    if (!sortConfig) return 0;
    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];

    if (aVal === undefined || aVal === null) return 1;
    if (bVal === undefined || bVal === null) return -1;

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortConfig.direction === 'asc' 
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const getSortIcon = (key: keyof InventoryItem) => {
    if (sortConfig?.key !== key) return <ArrowUpDown size={14} className="opacity-40" />;
    return sortConfig.direction === 'asc' ? <ArrowUp size={14} className="text-bezoli-green" /> : <ArrowDown size={14} className="text-bezoli-green" />;
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Gestión de Inventario</h1>
          <p className="text-gray-400">Controla el catálogo, precios y stock de plantas.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetchInventory} className="p-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors border border-white/10">
            <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
          </button>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-bezoli-green text-bezoli-dark hover:brightness-110 px-4 py-2 rounded-lg font-semibold transition-all shadow-[0_0_15px_rgba(157,213,99,0.2)]"
          >
            <Plus size={20} />
            Nueva Planta
          </button>
        </div>
      </div>

      {/* Bulk Upload Section */}
      <div className="bg-nature-dark border border-white/10 rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-bold text-white mb-4">Carga Masiva (Excel/CSV)</h2>
        <form onSubmit={handleBulkUpload} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <input 
            type="file" 
            accept=".csv, .xlsx, .xls" 
            onChange={(e) => setBulkFile(e.target.files?.[0] || null)}
            className="text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20"
          />
          <select 
            value={bulkMode} 
            onChange={(e) => setBulkMode(e.target.value)}
            className="bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-bezoli-green"
          >
            <option value="upsert">Upsert (Agrega y Actualiza)</option>
            <option value="add">Add (Solo agregar nuevos)</option>
            <option value="update">Update (Solo actualizar existentes)</option>
            <option value="overwrite">OverWrite (Borrar todo y reemplazar)</option>
          </select>
          <button 
            type="submit" 
            disabled={!bulkFile || isBulkUploading}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
          >
            {isBulkUploading ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
            {isBulkUploading ? "Procesando..." : "Cargar Archivo"}
          </button>
        </form>
        <p className="text-xs text-gray-400 mt-2">Columnas esperadas: sku, name, price, stock, status, description, category, difficulty, min_temp, max_temp, min_humidity, max_humidity, light, sustrato, image_url</p>
      </div>

      {/* Table */}
      <div className="bg-nature-dark/80 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="text-xs uppercase bg-black/40 text-gray-400 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 cursor-pointer hover:bg-white/5 transition-colors group" onClick={() => handleSort('sku')}>
                  <div className="flex items-center gap-1">SKU {getSortIcon('sku')}</div>
                </th>
                <th className="px-6 py-4 cursor-pointer hover:bg-white/5 transition-colors group" onClick={() => handleSort('name')}>
                  <div className="flex items-center gap-1">Nombre {getSortIcon('name')}</div>
                </th>
                <th className="px-6 py-4 cursor-pointer hover:bg-white/5 transition-colors group" onClick={() => handleSort('category')}>
                  <div className="flex items-center gap-1">Categoría {getSortIcon('category')}</div>
                </th>
                <th className="px-6 py-4 cursor-pointer hover:bg-white/5 transition-colors group" onClick={() => handleSort('price')}>
                  <div className="flex items-center gap-1">Precio {getSortIcon('price')}</div>
                </th>
                <th className="px-6 py-4 cursor-pointer hover:bg-white/5 transition-colors group" onClick={() => handleSort('stock_quantity')}>
                  <div className="flex items-center gap-1">Stock {getSortIcon('stock_quantity')}</div>
                </th>
                <th className="px-6 py-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading && items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    <Loader2 size={32} className="animate-spin mx-auto mb-2 opacity-50" />
                    Cargando inventario...
                  </td>
                </tr>
              ) : sortedItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">No hay productos en el inventario.</td>
                </tr>
              ) : (
                sortedItems.map((item) => (
                  <tr key={item.sku} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-gray-400">{item.sku}</td>
                    <td className="px-6 py-4 font-medium text-white">{item.name}</td>
                    <td className="px-6 py-4"><span className="px-2.5 py-1 bg-white/10 rounded-full text-xs">{item.category || "N/A"}</span></td>
                    <td className="px-6 py-4">${item.price.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 max-w-[100px]">
                        <input 
                          type="number" 
                          value={item.stock_quantity}
                          onChange={(e) => updateStock(item.sku, parseInt(e.target.value) || 0, item)}
                          className="w-16 bg-black/30 border border-white/10 rounded px-2 py-1 text-white text-center focus:outline-none focus:border-bezoli-green"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 flex items-center gap-3">
                      <button onClick={() => openModal(item)} className="text-blue-400 hover:text-blue-300 transition-colors p-1" title="Editar">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(item.sku)} className="text-red-400 hover:text-red-300 transition-colors p-1" title="Eliminar">
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
          <div className="relative w-full max-w-4xl bg-nature-dark border border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-2xl font-bold text-white">{isEditMode ? "Editar Producto" : "Nuevo Producto"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
              {error && <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm">{error}</div>}
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                  <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2">Información Básica</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Nombre</label>
                      <input type="text" required value={currentItem.name || ""} onChange={(e) => setCurrentItem({...currentItem, name: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-bezoli-green" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">SKU {isEditMode && "(Solo lectura)"}</label>
                      <input type="text" required disabled={isEditMode} value={currentItem.sku || ""} onChange={(e) => setCurrentItem({...currentItem, sku: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-bezoli-green disabled:opacity-50" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Precio</label>
                      <input type="number" required min="0" value={currentItem.price || 0} onChange={(e) => setCurrentItem({...currentItem, price: parseInt(e.target.value) || 0})} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-bezoli-green" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Stock</label>
                      <input type="number" required min="0" value={currentItem.stock_quantity || 0} onChange={(e) => setCurrentItem({...currentItem, stock_quantity: parseInt(e.target.value) || 0})} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-bezoli-green" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Estado</label>
                      <select value={currentItem.status || "disponible"} onChange={(e) => setCurrentItem({...currentItem, status: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-bezoli-green appearance-none">
                        <option value="disponible">Disponible</option>
                        <option value="agotado">Agotado</option>
                        <option value="en_enraizamiento">En Enraizamiento</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Categoría</label>
                      <input type="text" value={currentItem.category || ""} onChange={(e) => setCurrentItem({...currentItem, category: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-bezoli-green" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Dificultad</label>
                      <input type="text" value={currentItem.difficulty || ""} onChange={(e) => setCurrentItem({...currentItem, difficulty: e.target.value})} placeholder="Ej: Principiante" className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-bezoli-green" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Descripción</label>
                    <textarea rows={3} value={currentItem.description || ""} onChange={(e) => setCurrentItem({...currentItem, description: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-bezoli-green resize-none" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Imagen del Producto (URL o Subir)</label>
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                      {currentItem.image_url && (
                        <img src={currentItem.image_url} alt="Preview" className="w-16 h-16 object-cover rounded-lg bg-black/50 border border-white/10" />
                      )}
                      <div className="flex-1 w-full flex gap-2">
                        <input type="text" placeholder="https://..." value={currentItem.image_url || ""} onChange={(e) => setCurrentItem({...currentItem, image_url: e.target.value})} className="flex-1 bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-bezoli-green" />
                        <div className="relative shrink-0">
                          <input type="file" accept="image/*" onChange={handleImageUpload} disabled={isUploadingImage} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" />
                          <button type="button" disabled={isUploadingImage} className="flex items-center justify-center h-full px-4 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors border border-white/10">
                            {isUploadingImage ? <Loader2 size={20} className="animate-spin" /> : "Subir Foto"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2">Parámetros de Cuidado</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Sustrato Tipo</label>
                    <input type="text" value={currentItem.substrate_type || ""} onChange={(e) => setCurrentItem({...currentItem, substrate_type: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-bezoli-green text-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Temp Min (°C)</label>
                      <input type="number" value={currentItem.min_temp_c || ""} onChange={(e) => setCurrentItem({...currentItem, min_temp_c: parseInt(e.target.value)})} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-bezoli-green text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Temp Max (°C)</label>
                      <input type="number" value={currentItem.max_temp_c || ""} onChange={(e) => setCurrentItem({...currentItem, max_temp_c: parseInt(e.target.value)})} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-bezoli-green text-sm" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Hum Min (%)</label>
                      <input type="number" value={currentItem.min_humidity_percent || ""} onChange={(e) => setCurrentItem({...currentItem, min_humidity_percent: parseInt(e.target.value)})} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-bezoli-green text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Hum Max (%)</label>
                      <input type="number" value={currentItem.max_humidity_percent || ""} onChange={(e) => setCurrentItem({...currentItem, max_humidity_percent: parseInt(e.target.value)})} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-bezoli-green text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Luz Requerida</label>
                    <input type="text" value={currentItem.light || ""} onChange={(e) => setCurrentItem({...currentItem, light: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-bezoli-green text-sm" />
                  </div>
                </div>
              </div>

            </form>
            <div className="p-6 border-t border-white/10 flex justify-end gap-3 bg-black/20 rounded-b-2xl">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
                Cancelar
              </button>
              <button type="button" onClick={handleSave} disabled={formLoading} className="flex items-center gap-2 bg-bezoli-green text-bezoli-dark hover:brightness-110 px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg disabled:opacity-50">
                {formLoading ? <Loader2 size={20} className="animate-spin" /> : "Guardar Planta"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
