import Link from 'next/link';

export default async function BlogIndexPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, { cache: 'no-store' });
  let posts = [];
  if (res.ok) {
    posts = await res.json();
  }

  return (
    <div className="min-h-screen bg-nature-bg pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-md">
            El Blog de Jardin Bezoli
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Guías, consejos y secretos para el cultivo de plantas carnívoras.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-white text-center text-xl">No hay artículos disponibles por el momento.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                <div className="bg-nature-dark rounded-xl overflow-hidden shadow-xl border border-nature-medium/30 transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl h-full flex flex-col">
                  {/* Imagen */}
                  <div className="h-48 w-full overflow-hidden relative">
                    <img 
                      src={post.image_url} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  
                  {/* Contenido */}
                  <div className="p-6 flex-grow flex flex-col">
                    {/* Badge */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-nature-medium text-nature-accent text-xs px-2.5 py-0.5 rounded-full font-medium">
                        {post.category}
                      </span>
                      <span className="text-gray-400 text-xs">
                        {post.read_time}
                      </span>
                    </div>

                    {/* Título */}
                    <h2 className="text-2xl font-bold text-white mb-3 line-clamp-2 group-hover:text-nature-accent transition-colors">
                      {post.title}
                    </h2>

                    {/* Resumen */}
                    <p className="text-gray-300 text-sm line-clamp-3 mb-4 flex-grow">
                      {post.summary}
                    </p>

                    {/* Leer más */}
                    <div className="text-nature-accent font-semibold text-sm flex items-center gap-1 mt-auto">
                      Leer más 
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
