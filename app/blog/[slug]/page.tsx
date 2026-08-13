import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${params.slug}`, { cache: 'no-store' });
  
  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }
    return <div className="min-h-screen flex items-center justify-center text-white">Error al cargar el artículo.</div>;
  }

  const post = await res.json();

  return (
    <div className="min-h-screen bg-nature-bg pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Enlace para volver */}
        <div className="mb-8">
          <Link href="/blog" className="text-nature-accent hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al Blog
          </Link>
        </div>

        {/* Cabecera del artículo */}
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="bg-nature-medium text-nature-accent text-sm px-3 py-1 rounded-full font-medium">
              {post.category}
            </span>
            <span className="text-gray-400 text-sm flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {post.read_time}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight drop-shadow-md">
            {post.title}
          </h1>
          <p className="text-gray-400 text-sm">
            Publicado el: {new Date(post.created_at).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Imagen principal */}
        <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-12 shadow-2xl border border-nature-medium/20 relative">
           <img 
            src={post.image_url} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Contenido (Usando Typography plugin: prose) */}
        <article 
          className="prose prose-invert prose-lg max-w-none 
            prose-headings:text-white prose-headings:font-bold 
            prose-a:text-nature-accent hover:prose-a:text-nature-light
            prose-img:rounded-xl prose-img:shadow-lg
            prose-p:text-gray-300 prose-p:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

      </div>
    </div>
  );
}
