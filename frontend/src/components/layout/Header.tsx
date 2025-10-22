'use client';

import Link from 'next/link';
import { useState } from 'react';

/**
 * Componente Header de navegación principal de la aplicación.
 * 
 * Proporciona la barra de navegación superior con el logo de la marca,
 * enlaces de navegación principales y soporte para dispositivos móviles.
 * Incluye navegación responsiva que se colapsa en pantallas pequeñas.
 * 
 * @component
 * @group Componentes Principales
 * @returns Elemento JSX del header con navegación
 */
export const Header = () => {

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  }

  return (
    <header className="bg-gray-100 text-gray-800 shadow-lg">
      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link href="/home" className="flex items-center space-x-2">
            <div className="bg-gray-800 p-2 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-800">Real Estate</h1>
          </Link>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/home" 
              className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
            >
              Inicio
            </Link>
            <Link 
              href="/properties" 
              className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
            >
              Propiedades
            </Link>
            <Link 
              href="/properties/create" 
              className="bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Publicar Propiedad
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-700 hover:text-gray-900" onClick={toggleMenu}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu (hidden by default, you can add state management for toggle) */}
        <div className={`menu-mobile md:hidden border-t border-gray-300 ${showMenu ? 'show-menu' : ''}`}>
          <div className="py-4 space-y-2">
            <Link 
              href="/home" 
              className="block text-gray-700 hover:text-gray-900 transition-colors font-medium py-2"
            >
              Inicio
            </Link>
            <Link 
              href="/properties" 
              className="block text-gray-700 hover:text-gray-900 transition-colors font-medium py-2"
            >
              Propiedades
            </Link>
            <Link 
              href="/properties/create" 
              className="block bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors mt-2"
            >
              Publicar Propiedad
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
