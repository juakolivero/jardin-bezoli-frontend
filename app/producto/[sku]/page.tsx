import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";

interface PlantData {
  id: string;
  sku: string;
  name: string;
  description: string | null;
  price: number;
  stock_quantity: number;
  status: string;
  substrate_type: string | null;
  min_humidity_percent: number | null;
  max_humidity_percent: number | null;
  min_temp_c: number | null;
  max_temp_c: number | null;
  sunlight_notes: string | null;
  light: string | null;
  category: string;
  material: string | null;
  dimensions: string | null;
  volume: string | null;
  image_url?: string | null;
}

async function getPlantData(sku: string): Promise<PlantData | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/inventory/${sku}`, {
      cache: "no-store", // Fetch latest data
    });

    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error("Failed to fetch plant data");
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function PlantaPage({ params }: { params: { sku: string } }) {
  const plant = await getPlantData(params.sku);

  if (!plant) {
    notFound();
  }

  // Ruta dinámica a la imagen
  const imageUrl = plant.image_url || `/images/plants/${plant.sku}.jpg`;

  return (
    <div className="min-h-screen bg-neutral-50 py-12 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back button */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver a la tienda
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-neutral-100">
          <div className="flex flex-col lg:flex-row">

            {/* Left Column - Image */}
            <div className="lg:w-1/2 relative h-80 sm:h-96 lg:h-auto bg-neutral-100 group overflow-hidden">
              <Image
                src={imageUrl}
                alt={plant.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {/* Badge for status overlaid on image */}
              {plant.stock_quantity === 0 && (
                <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg uppercase tracking-wide">
                  Agotado
                </div>
              )}
            </div>

            {/* Right Column - Details */}
            <div className="lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">

              <div className="uppercase tracking-widest text-sm font-bold text-emerald-500 mb-3">
                SKU: {plant.sku}
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-900 mb-4 tracking-tight">
                {plant.name}
              </h1>

              <div className="text-4xl font-black text-neutral-800 mb-4 flex items-center">
                ${plant.price.toLocaleString('es-CL')}
                <span className="text-lg text-neutral-400 font-normal ml-2">CLP</span>
              </div>

              {/* Description */}
              {plant.description && (
                <p className="text-neutral-600 text-lg leading-relaxed mb-8 whitespace-pre-line">
                  {plant.description}
                </p>
              )}

              {/* Pet Friendly Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-2xl bg-green-50 border border-green-200 text-green-700 font-semibold text-sm mb-8 w-fit shadow-sm">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Pet Friendly - Seguro para gatos y perros
              </div>

              {/* Add to Cart Button */}
              <AddToCartButton plant={plant} />

              {plant.stock_quantity > 0 && (
                <p className="text-sm text-neutral-500 mt-4 text-center font-medium">
                  Solo {plant.stock_quantity} unidades disponibles
                </p>
              )}

              <hr className="my-10 border-neutral-100" />

              {/* Care Guide / Specs Section */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-neutral-900 flex items-center">
                  <svg className="w-6 h-6 mr-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  {plant.category === 'Maceteros' || plant.category === 'Sustratos' ? "Especificaciones Técnicas" : "Guía de Cultivo"}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {plant.category === 'Maceteros' || plant.category === 'Sustratos' ? (
                    <>
                      {/* Material */}
                      <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-200/60 flex items-start transition-colors hover:bg-neutral-100/80">
                        <div className="bg-slate-100 p-2.5 rounded-xl mr-4 text-slate-700 shadow-sm">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-neutral-900 text-sm mb-0.5">Material</h4>
                          <p className="text-neutral-600 text-sm">{plant.material || "No especificado"}</p>
                        </div>
                      </div>

                      {/* Dimensiones */}
                      <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-200/60 flex items-start transition-colors hover:bg-neutral-100/80">
                        <div className="bg-indigo-100 p-2.5 rounded-xl mr-4 text-indigo-600 shadow-sm">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-neutral-900 text-sm mb-0.5">Dimensiones</h4>
                          <p className="text-neutral-600 text-sm">{plant.dimensions || "No especificadas"}</p>
                        </div>
                      </div>

                      {/* Volumen */}
                      <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-200/60 flex items-start transition-colors hover:bg-neutral-100/80">
                        <div className="bg-teal-100 p-2.5 rounded-xl mr-4 text-teal-600 shadow-sm">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-neutral-900 text-sm mb-0.5">Volumen</h4>
                          <p className="text-neutral-600 text-sm">{plant.volume || "No especificado"}</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Substrate */}
                  <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-200/60 flex items-start transition-colors hover:bg-neutral-100/80">
                    <div className="bg-amber-100 p-2.5 rounded-xl mr-4 text-amber-700 shadow-sm">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral-900 text-sm mb-0.5">Sustrato</h4>
                      <p className="text-neutral-600 text-sm">{plant.substrate_type || "No especificado"}</p>
                    </div>
                  </div>

                  {/* Humidity */}
                  <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-200/60 flex items-start transition-colors hover:bg-neutral-100/80">
                    <div className="bg-blue-100 p-2.5 rounded-xl mr-4 text-blue-600 shadow-sm">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 15a4 4 0 008 0 4 4 0 10-8 0zM13 15a4 4 0 008 0 4 4 0 10-8 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral-900 text-sm mb-0.5">Humedad</h4>
                      <p className="text-neutral-600 text-sm">
                        {plant.min_humidity_percent && plant.max_humidity_percent
                          ? `${plant.min_humidity_percent}% - ${plant.max_humidity_percent}%`
                          : "No especificada"}
                      </p>
                    </div>
                  </div>

                  {/* Temperature */}
                  <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-200/60 flex items-start transition-colors hover:bg-neutral-100/80">
                    <div className="bg-red-100 p-2.5 rounded-xl mr-4 text-red-600 shadow-sm">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral-900 text-sm mb-0.5">Temperatura</h4>
                      <p className="text-neutral-600 text-sm">
                        {plant.min_temp_c && plant.max_temp_c
                          ? `${plant.min_temp_c}°C - ${plant.max_temp_c}°C`
                          : "No especificada"}
                      </p>
                    </div>
                  </div>

                  {/* Sunlight */}
                  <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-200/60 flex items-start transition-colors hover:bg-neutral-100/80">
                    <div className="bg-yellow-100 p-2.5 rounded-xl mr-4 text-yellow-600 shadow-sm">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral-900 text-sm mb-0.5">Luz Solar</h4>
                      <p className="text-neutral-600 text-sm">{plant.light || "No especificada"}</p>
                    </div>
                  </div>
                    </>
                  )}

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
