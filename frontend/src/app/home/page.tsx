import Link from 'next/link';

/**
 * Página principal (HomePage) de la aplicación Real Estate.
 * 
 * Presenta la landing page con una sección hero, características principales
 * y call-to-action para atraer usuarios a explorar propiedades. Incluye
 * diseño responsivo y navegación a las secciones principales de la app.
 * 
 * @page
 * @group Páginas
 * 
 * @returns Elemento JSX de la página principal
 */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 text-white">
            Encuentra tu hogar ideal
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Descubre las mejores propiedades en las ubicaciones más exclusivas. 
            Tu nuevo hogar te está esperando.
          </p>
          <Link 
            href="/properties"
            className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-block shadow-lg border-2 border-white"
          >
            Explorar Propiedades
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            ¿Por qué elegirnos?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Propiedades Verificadas</h3>
              <p className="text-gray-600">
                Todas nuestras propiedades son verificadas y auditadas para garantizar la mejor calidad.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Ubicaciones Premium</h3>
              <p className="text-gray-600">
                Propiedades en las mejores ubicaciones con fácil acceso a servicios y transporte.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Mejores Precios</h3>
              <p className="text-gray-600">
                Ofrecemos precios competitivos y opciones de financiamiento flexibles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            ¿Listo para encontrar tu nuevo hogar?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Únete a miles de personas que ya han encontrado su hogar ideal con nosotros.
          </p>
          <div className="space-x-4">
            <Link 
              href="/properties"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
            >
              Ver Propiedades
            </Link>
            <Link 
              href="/properties/create"
              className="bg-gray-800 border-2 border-gray-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 hover:border-gray-700 transition-colors inline-block"
            >
              Publicar Propiedad
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}