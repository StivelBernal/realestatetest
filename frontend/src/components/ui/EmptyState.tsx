import Link from 'next/link';
import { ReactNode } from 'react';

/**
 * Props para el componente EmptyState.
 */
interface EmptyStateProps {
  /**
   * Ícono personalizado que se muestra en la parte superior.
   * Si no se proporciona, se usa un ícono por defecto.
   */
  icon?: ReactNode;
  
  /**
   * Título principal del estado vacío.
   */
  title: string;
  
  /**
   * Descripción opcional que proporciona más contexto.
   */
  description?: string;
  
  /**
   * Texto del botón de acción.
   * Si se proporciona, se renderiza un botón.
   */
  actionLabel?: string;
  
  /**
   * URL a la que navegar cuando se hace clic en el botón de acción.
   * Tiene prioridad sobre onAction si ambos están definidos.
   */
  actionHref?: string;
  
  /**
   * Función que se ejecuta cuando se hace clic en el botón de acción.
   * Solo se usa si actionHref no está definido.
   */
  onAction?: () => void;
}

/**
 * Componente EmptyState para mostrar cuando no hay contenido disponible.
 * 
 * Muestra un estado vacío con ícono, título, descripción opcional y
 * un botón de acción que puede navegar a otra página o ejecutar una función.
 * Útil para listas vacías, resultados de búsqueda sin coincidencias, etc.
 * 
 * @param props - Props del componente EmptyState
 * 
 * @example
 * ```tsx
 * // Estado vacío básico
 * <EmptyState 
 *   title="No hay propiedades" 
 *   description="No se encontraron propiedades que coincidan con tus criterios"
 * />
 * 
 * // Con botón de navegación
 * <EmptyState 
 *   title="Lista vacía" 
 *   description="Aún no tienes propiedades publicadas"
 *   actionLabel="Crear Primera Propiedad"
 *   actionHref="/properties/create"
 * />
 * 
 * // Con acción personalizada
 * <EmptyState 
 *   title="Error al cargar" 
 *   description="No se pudieron cargar los datos"
 *   actionLabel="Reintentar"
 *   onAction={() => refetch()}
 * />
 * 
 * // Con ícono personalizado
 * <EmptyState 
 *   icon={<CustomIcon />}
 *   title="Sin resultados"
 *   description="Prueba con otros filtros"
 * />
 * ```
 * 
 * @returns Elemento JSX del estado vacío
 */
export default function EmptyState({ 
  icon, 
  title, 
  description, 
  actionLabel, 
  actionHref, 
  onAction 
}: EmptyStateProps) {
  const defaultIcon = (
    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  );

  const ActionButton = () => {
    const buttonClass = "inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors";
    
    const buttonContent = (
      <>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        {actionLabel}
      </>
    );

    if (actionHref) {
      return (
        <Link href={actionHref} className={buttonClass}>
          {buttonContent}
        </Link>
      );
    }

    if (onAction) {
      return (
        <button onClick={onAction} className={buttonClass}>
          {buttonContent}
        </button>
      );
    }

    return null;
  };

  return (
    <div className="text-center py-20">
      {icon || defaultIcon}
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      {description && (
        <p className="text-gray-600 mb-4">{description}</p>
      )}
      {actionLabel && <ActionButton />}
    </div>
  );
}