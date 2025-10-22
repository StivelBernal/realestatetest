'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LoaderContextType {
  /** Si el loader está actualmente visible */
  isLoading: boolean;
  /** Mensaje que se muestra en el loader */
  message: string;
  /** Función para mostrar el loader con un mensaje opcional */
  showLoader: (message?: string) => void;
  /** Función para ocultar el loader */
  hideLoader: () => void;
  /** Función para actualizar solo el mensaje sin cambiar la visibilidad */
  updateMessage: (message: string) => void;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

interface LoaderProviderProps {
  children: ReactNode;
}

/**
 * Proveedor del contexto de Loader que maneja el estado global del loader, se podria extender para mas funcionalidades generales.
 */
export function LoaderProvider({ children }: LoaderProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('Cargando...');

  const showLoader = (newMessage = 'Cargando...') => {
    setMessage(newMessage);
    setIsLoading(true);
  };

  const hideLoader = () => {
    setIsLoading(false);
  };

  const updateMessage = (newMessage: string) => {
    setMessage(newMessage);
  };

  const value: LoaderContextType = {
    isLoading,
    message,
    showLoader,
    hideLoader,
    updateMessage,
  };

  return (
    <LoaderContext.Provider value={value}>
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  const context = useContext(LoaderContext);
  
  if (context === undefined) {
    throw new Error('useLoader debe ser usado dentro de un LoaderProvider');
  }
  
  return context;
}