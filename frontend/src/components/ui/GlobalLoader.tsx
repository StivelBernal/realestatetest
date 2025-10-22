'use client';

import { useLoader } from "../../contexts";
import { Loader } from ".";

/**
 * Componente GlobalLoader que renderiza el loader cuando está activo.
 * 
 * Este componente consume el contexto de LoaderContext para mostrar u ocultar
 * el loader global de la aplicación. Se debe colocar en el layout principal
 * para que esté disponible en toda la aplicación dentro del contexto correspondiente.
 */
export default function GlobalLoader() {
  const { isLoading, message } = useLoader();

  return (
    <Loader 
      show={isLoading} 
      message={message} 
      size="lg"
    />
  );
}
